import { eq } from "drizzle-orm";
import { schema } from "@cs-ai/database";
import { db, groq, reportReply, reportUsage } from "./util";
import type { ChatJob } from "./chat.processor";

/**
 * Proses chat dari iklan — PLAN.md bagian 4.4:
 * 1. Cocokkan template dulu (sama_persis / boleh_mirip) TANPA panggil AI.
 * 2. Groq hanya sebagai cadangan, dengan instruksi ketat:
 *    "hanya boleh pilih dari daftar balasan ini, dilarang mengarang."
 */
export async function processAd(job: ChatJob): Promise<void> {
  const database = db();
  const { tenantId, pesan } = job;

  const templates = await database
    .select()
    .from(schema.adTemplates)
    .where(eq(schema.adTemplates.tenantId, tenantId));
  const aktif = templates.filter((t) => t.aktif);
  const teks = pesan.toLowerCase().trim();
  const kata = teks.split(/\s+/).filter((w) => w.length > 3);

  // 1a. sama persis
  let hit = aktif.find(
    (t) => t.caraMencocokkan === "sama_persis" && t.pertanyaan.toLowerCase().trim() === teks,
  );
  let keyakinan = 1;

  // 1b. boleh mirip (fuzzy kata kunci — ganti fuse.js bila perlu skor lebih baik)
  if (!hit) {
    hit = aktif.find((t) => {
      if (t.caraMencocokkan !== "boleh_mirip") return false;
      const target = t.pertanyaan.toLowerCase();
      return kata.some((w) => target.includes(w));
    });
    keyakinan = 0.88;
  }

  if (hit) {
    const balasan = await stepsText(hit.id, hit.pertanyaan);
    await bumpDipakai(hit.id, hit.dipakai ?? 0);
    await reportReply({
      tenantId: job.tenantId, waNumberId: job.waNumberId, nomor: job.nomor, kontak: job.kontak,
      pesanAsli: pesan, balasan, keyakinan, status: "terjawab", kanal: "Iklan",
    });
    return;
  }

  // 2. Fallback Groq — hanya boleh memilih dari daftar balasan template
  const client = groq();
  if (client && aktif.length > 0) {
    const daftar = aktif.map((t) => `- [${t.id}] ${t.pertanyaan}`).join("\n");
    const [settings] = await database
      .select()
      .from(schema.botSettings)
      .where(eq(schema.botSettings.tenantId, tenantId));
    const model = client.getModelForLevel(settings?.tingkatKepintaran ?? "seimbang");
    const res = await client.simpleChat(
      model,
      `Kamu asisten toko. Pelanggan bertanya dari iklan. Daftar pertanyaan yang BOLEH dijawab:\n${daftar}\n\nBalas HANYA dengan ID baris yang paling cocok, format: ID:<id>. Jika tidak ada yang cocok, balas persis: TIDAK_COCON. Dilarang mengarang jawaban.`,
      pesan,
      { maxTokens: 60, temperature: 0 },
    );
    await reportUsage({
      tenantId, model,
      tokensInput: res.usage?.promptTokens ?? 0,
      tokensOutput: res.usage?.completionTokens ?? 0,
    });
    const m = (res.content ?? "").match(/ID:([0-9a-f-]{8,})/i);
    const chosen = m ? aktif.find((t) => t.id === m[1]) : undefined;
    if (chosen) {
      const balasan = await stepsText(chosen.id, chosen.pertanyaan);
      await bumpDipakai(chosen.id, chosen.dipakai ?? 0);
      await reportReply({
        tenantId: job.tenantId, waNumberId: job.waNumberId, nomor: job.nomor, kontak: job.kontak,
        pesanAsli: pesan, balasan, keyakinan: 0.7, status: "terjawab", kanal: "Iklan",
      });
      return;
    }
  }

  await reportReply({
    tenantId: job.tenantId, waNumberId: job.waNumberId, nomor: job.nomor, kontak: job.kontak,
    pesanAsli: pesan,
    balasan: "Belum ada template yang cocok. Chat ini akan dialihkan ke admin agar tidak salah jawab.",
    keyakinan: 0.2, status: "perlu_manusia", kanal: "Iklan",
  });
}

async function stepsText(templateId: string, fallback: string): Promise<string> {
  const steps = await db()
    .select()
    .from(schema.adTemplateSteps)
    .where(eq(schema.adTemplateSteps.templateId, templateId));
  const teks = steps
    .sort((a, b) => a.urutan - b.urutan)
    .filter((s) => s.tipe === "teks" && s.isiTeks)
    .map((s) => s.isiTeks as string)
    .join("\n");
  return teks || fallback;
}

async function bumpDipakai(id: string, dipakai: number): Promise<void> {
  await db()
    .update(schema.adTemplates)
    .set({ dipakai: dipakai + 1 })
    .where(eq(schema.adTemplates.id, id));
}
