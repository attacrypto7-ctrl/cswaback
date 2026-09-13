import express from "express";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { connect, disconnect, getQr, sendText } from "./sessions";

// =====================================================================
// wa-gateway — service Baileys terpisah (PLAN.md bagian 3).
// - HTTP privat: GET /wa/:id/qr, POST /wa/:id/connect|logout, GET /health
// - Konsumsi queue "outgoing" dari Redis → kirim via socket aktif.
// - Pesan masuk diteruskan ke api (/internal/incoming) — lihat sessions.ts.
// =====================================================================

function checkSecret(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.path === "/health") return next();
  const expected = process.env.INTERNAL_SECRET ?? "";
  if (!expected || req.headers["x-internal-secret"] !== expected) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  next();
}

async function main() {
  const app = express();
  app.use(express.json());
  app.use(checkSecret);

  app.get("/health", (_req, res) => res.json({ ok: true, service: "wa-gateway" }));

  app.get("/wa/:id/qr", async (req, res) => {
    // Pastikan sesi berjalan supaya QR tersedia
    await connect(req.params.id).catch(() => undefined);
    res.json(getQr(req.params.id));
  });

  app.post("/wa/:id/connect", async (req, res) => {
    await connect(req.params.id);
    res.json({ ok: true, ...getQr(req.params.id) });
  });

  app.post("/wa/:id/logout", async (req, res) => {
    await disconnect(req.params.id);
    res.json({ ok: true });
  });

  // Konsumsi balasan dari worker → kirim ke WhatsApp
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });
  new Worker(
    "outgoing",
    async (job) => {
      const { waNumberId, nomor, pesan } = job.data as {
        waNumberId: string; nomor: string; pesan: string;
      };
      await sendText(waNumberId, nomor, pesan);
      console.log(`[wa] terkirim → ${nomor} (${waNumberId})`);
    },
    { connection, concurrency: 10 },
  );

  const port = parseInt(process.env.PORT ?? "3002", 10);
  app.listen(port, () => console.log(`[wa-gateway] listening on ${port}`));
}

main().catch((err) => {
  console.error("[wa-gateway] fatal:", err);
  process.exit(1);
});
