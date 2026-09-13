import { eq } from "drizzle-orm";
import { schema } from "@cs-ai/database";
import { db, reportIndex } from "./util";
import { chunkText, embed } from "./embedding";

export interface IndexJob {
  tenantId: string;
  docId: string;
  content: string;
  tipe: "PDF" | "Teks" | "FAQ Manual";
}

/** Indexing dokumen: pecah jadi chunk + hitung embedding lokal + simpan. */
export async function processIndex(job: IndexJob): Promise<void> {
  const database = db();
  try {
    const chunks = chunkText(job.content);
    // Hapus chunk lama (re-index / versi baru)
    await database.delete(schema.knowledgeChunks).where(eq(schema.knowledgeChunks.docId, job.docId));
    for (const content of chunks) {
      await database.insert(schema.knowledgeChunks).values({
        docId: job.docId,
        tenantId: job.tenantId,
        content,
        embedding: JSON.stringify(embed(content)),
      });
    }
    await reportIndex(job.docId, true, chunks.length);
    console.log(`[worker][index] doc ${job.docId}: ${chunks.length} chunks`);
  } catch (err) {
    console.error(`[worker][index] gagal doc ${job.docId}:`, (err as Error).message);
    await reportIndex(job.docId, false, 0);
    throw err;
  }
}
