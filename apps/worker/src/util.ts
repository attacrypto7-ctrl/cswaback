import { initDb, getDb } from "@cs-ai/database";
import { GroqClient } from "@cs-ai/groq-client";

// Klien DB singleton untuk worker
export function initWorkerDb(): void {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL wajib diisi untuk worker");
  initDb(url);
}

export function db() {
  return getDb();
}

// Klien Groq (satu key untuk seluruh platform — rate-limit per tenant di api)
let groqClient: GroqClient | null = null;
export function groq(): GroqClient | null {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  if (!groqClient) groqClient = new GroqClient({ apiKey: key });
  return groqClient;
}

const internalBase = () => (process.env.INTERNAL_API_URL || "http://localhost:3000/api").replace(/\/$/, "");
const internalHeaders = () => ({
  "Content-Type": "application/json",
  "x-internal-secret": process.env.INTERNAL_SECRET ?? "",
});

/** Laporkan hasil balasan ke api (disimpan + diantrekan ke wa-gateway). */
export async function reportReply(data: {
  tenantId: string; waNumberId: string; nomor: string; kontak?: string;
  pesanAsli: string; balasan: string; keyakinan: number; status: string; kanal: "Chat" | "Iklan";
}): Promise<void> {
  await fetch(`${internalBase()}/internal/reply-result`, {
    method: "POST", headers: internalHeaders(), body: JSON.stringify(data),
  });
}

/** Catat pemakaian token untuk rate-limit & analitik. */
export async function reportUsage(data: {
  tenantId: string; model: string; tokensInput: number; tokensOutput: number; costCents?: number;
}): Promise<void> {
  await fetch(`${internalBase()}/internal/usage`, {
    method: "POST", headers: internalHeaders(), body: JSON.stringify(data),
  }).catch(() => undefined);
}

/** Laporkan hasil indexing dokumen. */
export async function reportIndex(docId: string, ok: boolean, chunks: number): Promise<void> {
  await fetch(`${internalBase()}/internal/index-done`, {
    method: "POST", headers: internalHeaders(), body: JSON.stringify({ docId, ok, chunks }),
  }).catch(() => undefined);
}
