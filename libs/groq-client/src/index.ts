import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// =====================================================================
// Model mapping: "tingkat kepintaran" (dashboard choice) → Groq model
// Sesuai PLAN.md bagian 4.1
// =====================================================================
export const GROQ_MODELS: Record<string, string> = {
  hemat: "llama-3.1-8b-instant",       // $0.05 / $0.08 per 1M token
  seimbang: "llama-3.3-70b-versatile", // $0.59 / $0.79 per 1M token
  akurat: "kimi-k2",                    // $1.00 / $3.00 per 1M token
};

export const DEEPSEEK_MODELS: Record<string, string> = {
  hemat: "deepseek-chat",
  seimbang: "deepseek-chat",
  akurat: "deepseek-chat",
};

export interface GroqOptions {
  apiKey: string;
  baseURL?: string;
}

export interface GroqChatRequest {
  model: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  maxTokens?: number;
}

export interface GroqChatResponse {
  content: string | null;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// =====================================================================
// GroqClient — wrapper di sekitar OpenAI SDK (mendukung Groq & DeepSeek)
// =====================================================================
export class GroqClient {
  private client: OpenAI;
  private apiKey: string;
  private baseURL: string;

  constructor(options: GroqOptions) {
    this.apiKey = options.apiKey;
    const defaultBaseUrl = options.apiKey?.startsWith("gsk_")
      ? "https://api.groq.com/openai/v1"
      : "https://api.deepseek.com";

    this.baseURL = options.baseURL ?? process.env.AI_BASE_URL ?? defaultBaseUrl;
    this.client = new OpenAI({
      apiKey: options.apiKey,
      baseURL: this.baseURL,
    });
  }

  /**
   * Dapatkan model berdasarkan tingkat kepintaran (hemat/seimbang/akurat)
   * Menyesuaikan apakah provider adalah DeepSeek atau Groq.
   */
  getModelForLevel(level: string): string {
    if (process.env.AI_MODEL) {
      return process.env.AI_MODEL;
    }

    const isDeepSeek =
      this.baseURL.includes("deepseek") ||
      (!this.apiKey.startsWith("gsk_") && !this.baseURL.includes("groq"));

    if (isDeepSeek) {
      return DEEPSEEK_MODELS[level] || DEEPSEEK_MODELS.seimbang;
    }

    return GROQ_MODELS[level] || GROQ_MODELS.seimbang;
  }

  /**
   * Kirim chat completion ke provider AI (Groq / DeepSeek / Pateway)
   */
  async chat(request: GroqChatRequest): Promise<GroqChatResponse> {
    const payload: any = {
      model: request.model,
      messages: request.messages,
      max_tokens: request.maxTokens,
    };
    if (request.temperature !== undefined) {
      payload.temperature = request.temperature;
    }

    try {
      const response = await this.client.chat.completions.create(payload);
      const message = response.choices[0]?.message;
      return {
        content: message?.content ?? null,
        model: response.model,
        usage: response.usage
          ? {
              promptTokens: response.usage.prompt_tokens,
              completionTokens: response.usage.completion_tokens,
              totalTokens: response.usage.total_tokens,
            }
          : undefined,
      };
    } catch (err: any) {
      // Jika model tidak mendukung parameter temperature, retry tanpa temperature
      if (err?.message?.includes("temperature") && payload.temperature !== undefined) {
        delete payload.temperature;
        const response = await this.client.chat.completions.create(payload);
        const message = response.choices[0]?.message;
        return {
          content: message?.content ?? null,
          model: response.model,
          usage: response.usage
            ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens,
              }
            : undefined,
        };
      }
      throw err;
    }
  }

  /**
   * Chat sederhana dengan system prompt + user message
   */
  async simpleChat(
    model: string,
    systemPrompt: string,
    userMessage: string,
    options?: { temperature?: number; maxTokens?: number },
  ): Promise<GroqChatResponse> {
    return this.chat({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: options?.temperature,
      maxTokens: options?.maxTokens,
    });
  }

  /**
   * Generate embedding — NOTE: LLM API tidak sediakan endpoint embeddings bawaan!
   * Gunakan model embedding lokal di worker.
   */
  async embed(): Promise<never> {
    throw new Error(
      "Provider tidak menyediakan endpoint embeddings. " +
        "Gunakan EmbeddingService lokal di worker.",
    );
  }
}

/**
 * Factory function untuk membuat client dari env
 */
export function createGroqClient(env: { apiKey: string; baseURL?: string }): GroqClient {
  const key = env.apiKey || process.env.AI_API_KEY || process.env.GROQ_API_KEY;
  if (!key) {
    throw new Error("API Key AI tidak ditemukan di environment (AI_API_KEY atau GROQ_API_KEY)");
  }
  return new GroqClient({
    apiKey: key,
    baseURL: env.baseURL || process.env.AI_BASE_URL,
  });
}

export default GroqClient;
