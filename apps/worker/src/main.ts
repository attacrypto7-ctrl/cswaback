import "dotenv/config";
import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import { initWorkerDb } from "./util";
import { processChat, type ChatJob } from "./chat.processor";
import { processAd } from "./ad.processor";
import { processIndex, type IndexJob } from "./index.processor";
import { runLicenseCron } from "./license.cron";

// =====================================================================
// Worker — proses antrian Redis (BullMQ). Jalan sebagai service terpisah
// di Railway supaya Groq yang lambat tidak mengganggu dashboard.
// Queues: chat, ad, index, outgoing (outgoing dikonsumsi wa-gateway).
// =====================================================================

async function main() {
  initWorkerDb();

  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

  const commonOpts = { connection, concurrency: 5 };

  new Worker("chat", async (job) => processChat(job.data as ChatJob), commonOpts);
  new Worker("ad", async (job) => processAd(job.data as ChatJob), commonOpts);
  new Worker("index", async (job) => processIndex(job.data as IndexJob), {
    ...commonOpts,
    concurrency: 2,
  });

  // Cron lisensi: job scheduler tiap jam (BullMQ v6 API)
  const cronQueue = new Queue("cron", { connection: connection.duplicate() });
  await cronQueue.upsertJobScheduler("license-check", { pattern: "0 * * * *" }, {
    name: "license-check",
    data: {},
  });
  new Worker("cron", async () => runLicenseCron(), { connection });

  console.log("[worker] queues aktif: chat, ad, index, cron");
}

main().catch((err) => {
  console.error("[worker] fatal:", err);
  process.exit(1);
});
