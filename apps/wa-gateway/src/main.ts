import "dotenv/config";
import express from "express";
import { Worker } from "bullmq";
import { Redis as IORedis } from "ioredis";
import { connect, disconnect, getQr, sendText } from "./sessions.js";

process.on("unhandledRejection", (reason: any) => {
  if (reason?.code === "ECONNREFUSED" || reason?.message?.includes("ECONNREFUSED") || reason?.name === "AggregateError") return;
});

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

  const isDev = (process.env.NODE_ENV || "development") !== "production";
  let lastRedisWarn = 0;
  const throttledWarn = (msg: string) => {
    const now = Date.now();
    if (now - lastRedisWarn > 30000) {
      lastRedisWarn = now;
      console.warn(msg);
    }
  };
  const isConnRefused = (err: unknown) => {
    const m = err instanceof Error ? err.message : String(err);
    const c = (err as NodeJS.ErrnoException)?.code ?? "";
    const n = (err as any)?.name ?? "";
    return n === "AggregateError" || c === "ECONNREFUSED" || c === "ECONNRESET" || m.includes("ECONNREFUSED") || m.includes("ECONNRESET");
  };

  // Konsumsi balasan dari worker → kirim ke WhatsApp
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  const connection = new IORedis(redisUrl, {
    host: "127.0.0.1",
    family: 4,
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
    retryStrategy: () => {
      throttledWarn("[wa-gateway] Redis offline (127.0.0.1) - retrying in 30s...");
      return 30000;
    },
    reconnectOnError: () => false,
    lazyConnect: true,
    enableReadyCheck: false,
  });
  connection.on("error", (err) => {
    if (isConnRefused(err)) {
      throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s...");
      return;
    }
    throttledWarn(`[wa-gateway] Redis error: ${(err as Error).message}`);
  });
  connection.on("close", () => throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s..."));
  const outgoingWorker = new Worker(
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
  outgoingWorker.on("error", (err) => {
    if (isConnRefused(err)) {
      throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s...");
      return;
    }
    throttledWarn(`[wa-gateway] outgoing error: ${(err as Error).message}`);
  });

  if (isDev) {
    process.on("unhandledRejection", (reason) => {
      if (isConnRefused(reason)) {
        throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s...");
        return;
      }
      const msg = reason instanceof Error ? reason.message : String(reason);
      if (msg.includes("Connection is closed")) {
        throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s...");
        return;
      }
    });
    process.on("uncaughtException", (err) => {
      if (isConnRefused(err)) {
        throttledWarn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - retrying in 30s...");
        return;
      }
      console.error("[wa-gateway] uncaughtException:", (err as Error).message);
    });
  }

  const port = parseInt(process.env.PORT ?? "3002", 10);
  app.listen(port, () => console.log(`[wa-gateway] listening on ${port}`));
}

main().catch((err) => {
  const isDev = (process.env.NODE_ENV || "development") !== "production";
  if (
    isDev &&
    ((err as NodeJS.ErrnoException)?.code === "ECONNREFUSED" ||
      (err instanceof Error && err.message.includes("ECONNREFUSED")))
  ) {
    console.warn("[wa-gateway] Redis connection failed (127.0.0.1:6379) - gateway tetap berjalan (retry in 30s)");
    return;
  }
  console.error("[wa-gateway] fatal:", err instanceof Error ? err.message : String(err));
  if (!isDev) process.exit(1);
  console.warn("[wa-gateway] dev mode — not exiting");
});
