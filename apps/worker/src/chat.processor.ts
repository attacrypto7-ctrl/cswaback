import { eq } from "drizzle-orm";
import { schema } from "@cs-ai/database";
import { db, groq, reportReply, reportUsage } from "./util";
import { embed, cosine } from "./embedding";

export interface ChatJob {
  tenantId: string;
  waNumberId: string;
  nomor: string;
  kontak?: string;
  pesan: string;
  kanal: "Chat" | "Iklan";
}

/**
 * Proses chat biasa: FAQ match → RAG chunks → Groq → lapor ke api.
 * Kalau keyakinan di bawah ambang tenant → status perlu_manusia.
 */
export async function processChat(job: ChatJob): Promise<void> {
  const database = db();
  const { tenantId, pesan } = job;

  const [settings] = await database
    .select()
    .from(schema.botSettings)
    .where(eq(schema.botSettings.tenantId, tenantId));
  const ambang = (settings?.ambangAlih ?? 60) / 100;
  const level = settings?.tingkatKepintaran ?? "seimbang";

  // 1. Coba FAQ dulu (gratis, presisi tinggi)
  const faqs = await database
    .select()
    .from(schema.faqItems)
    .where(eq(schema.faqItems.tenantId, tenantId));
  const kata = pesan.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const faqHit = faqs.find((f) =>
    kata.some((w) => `${f.pertanyaan} ${f.jawaban}`.toLowerCase().includes(w)),
  );
  if (faqHit) {
    await reportReply({
      ...baseOf(job), pesanAsli: pesan, balasan: faqHit.jawaban,
      keyakinan: 0.9, status: "terjawab", kanal: "Chat",
    });
    return;
  }

  // 2. RAG: cari chunk paling mirip via embedding lokal
  const chunks = await database
    .select()
    .from(schema.knowledgeChunks)
    .where(eq(schema.knowledgeChunks.tenantId, tenantId));
  const qVec = embed(pesan);
  const scored = chunks
    .map((c) => ({
      content: c.content,
      score: cosine(qVec, parseEmbedding(c.embedding)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const konteks = scored.filter((s) => s.score > 0.05).map((s) => s.content).join("\n---\n");
  const keyakinanKonteks = scored[0]?.score ?? 0;

  // 3. Panggil Groq (atau fallback statis kalau tanpa key)
  const client = groq();
  let balasan: string;
  if (client && konteks) {
    const model = client.getModelForLevel(level);
    const gaya = settings?.gayaBahasa ?? "Bahasa Indonesia santai tapi sopan, maksimal 3 kalimat";
    const res = await client.simpleChat(
      model,
      `Kamu asisten toko. Gaya: ${gaya}. Jawab HANYA dari konteks berikut, dilarang mengarang. Jika konteks tidak memuat jawaban, balas persis: TIDAK_TAHU.\n\nKonteks:\n${konteks}`,
      pesan,
      { maxTokens: 400 },
    );
    balasan = res.content?.trim() ?? "TIDAK_TAHU";
    await reportUsage({
      tenantId, model,
      tokensInput: res.usage?.promptTokens ?? 0,
      tokensOutput: res.usage?.completionTokens ?? 0,
    });
  } else if (konteks) {
    balasan = scored[0].content;
  } else {
    balasan = "Maaf Kak, saya belum menemukan informasinya. Saya sambungkan ke admin ya.";
  }

  const tidakTahu = balasan.includes("TIDAK_TAHU");
  if (tidakTahu) balasan = "Maaf Kak, saya belum menemukan informasinya. Saya sambungkan ke admin ya.";
  const keyakinan = konteks ? Math.min(0.95, 0.45 + keyakinanKonteks) : 0.28;
  const status = tidakTahu || keyakinan < ambang ? "perlu_manusia" : "terjawab";

  // Hormati fallowUnknown: kalau tenant melarang jawab tanpa sumber, selalu alihkan
  await reportReply({
    ...baseOf(job), pesanAsli: pesan, balasan,
    keyakinan, status, kanal: "Chat",
  });
}

function baseOf(job: ChatJob) {
  return {
    tenantId: job.tenantId, waNumberId: job.waNumberId,
    nomor: job.nomor, kontak: job.kontak,
  };
}

function parseEmbedding(raw: unknown): number[] {
  if (Array.isArray(raw)) return raw as number[];
  if (typeof raw === "string") {
    try {
      const v = JSON.parse(raw);
      if (Array.isArray(v)) return v;
    } catch { /* abaikan */ }
  }
  return [];
}
