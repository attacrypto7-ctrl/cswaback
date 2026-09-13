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
// GroqClient — wrapper di sekitar OpenAI SDK yang men-target Groq API
// =====================================================================
export class GroqClient {
  private client: OpenAI;
  private apiKey: string;

  constructor(options: GroqOptions) {
    this.apiKey = options.apiKey;
    this.client = new OpenAI({
      apiKey: options.apiKey,
      baseURL: options.baseURL ?? "https://api.groq.com/openai/v1",
    });
  }

  /**
   * Dapatkan model berdasarkan tingkat kepintaran (hemat/seimbang/akurat)
   */
  getModelForLevel(level: string): string {
    return GROQ_MODELS[level] || GROQ_MODELS.seimbang;
  }

  /**
   * Kirim chat completion ke Groq
   */
  async chat(request: GroqChatRequest): Promise<GroqChatResponse> {
    const response = await this.client.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens,
    });

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
   * Generate embedding — NOTE: Groq tidak sediakan endpoint embeddings!
   * Gunakan model embedding lokal (lihat @xenova/transformers di worker).
   * Method ini dificated / throw sehingga pemanggil tahu.
   */
  async embed(): Promise<never> {
    throw new Error(
      "Groq tidak menyediakan endpoint embeddings. " +
        "Gunakan EmbeddingService lokal (@xenova/transformers) di worker.",
    );
  }
}

/**
 * Factory function untuk membuat client dari env
 */
export function createGroqClient(env: { apiKey: string; baseURL?: string }): GroqClient {
  if (!env.apiKey) {
    throw new Error("GROQ_API_KEY tidak ditemukan di environment");
  }
  return new GroqClient({
    apiKey: env.apiKey,
    baseURL: env.baseURL,
  });
}

export default GroqClient;
