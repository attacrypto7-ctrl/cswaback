import { Injectable, OnModuleInit, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Queue, QueueEvents } from "bullmq";
import IORedis from "ioredis";

/**
 * QueueService — manajemen Redis/BullMQ queues.
 * Menyediakan:
 *  - chatQueue         (untuk proses balas chat via Groq + RAG)
 *  - adQueue           (untuk proses balas iklan via template matching)
 *  - indexQueue        (untuk proses indexing dokumen → embedding)
 *  - outgoingQueue     (untuk kirim pesan ke WhatsApp via wa-gateway)
 */
@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name);

  chatQueue!: Queue;
  adQueue!: Queue;
  indexQueue!: Queue;
  outgoingQueue!: Queue;
  scheduler!: QueueEvents;

  private redisUrl: string;
  private connection!: IORedis;

  constructor(private configService: ConfigService) {
    this.redisUrl = configService.get<string>("redisUrl") || "redis://localhost:6379";
  }

  async onModuleInit() {
    // BullMQ v6: connection harus instance IORedis / ConnectionOptions (bukan string URL)
    this.connection = new IORedis(this.redisUrl, { maxRetriesPerRequest: null });
    const opts = { connection: this.connection };

    this.chatQueue = new Queue("chat", opts);
    this.adQueue = new Queue("ad", opts);
    this.indexQueue = new Queue("index", opts);
    this.outgoingQueue = new Queue("outgoing", opts);

    // QueueEvents untuk menangani peristiwa sistem (retry, stalled, dsb)
    this.scheduler = new QueueEvents("csai-scheduler", opts);

    this.logger.log("Redis/BullMQ queues initialized");
  }

  async onModuleDestroy() {
    await this.scheduler?.close().catch(() => undefined);
    await this.chatQueue?.close().catch(() => undefined);
    await this.adQueue?.close().catch(() => undefined);
    await this.indexQueue?.close().catch(() => undefined);
    await this.outgoingQueue?.close().catch(() => undefined);
    this.connection?.disconnect();
  }

  // Convenience: enqueue incoming WhatsApp message
  async enqueueIncomingMessage(data: IncomingMessageData) {
    if (data.kanal === "Iklan") {
      await this.adQueue.add("process-ad", data, { attempts: 3, backoff: { type: "exponential", delay: 5000 } });
    } else {
      await this.chatQueue.add("process-chat", data, { attempts: 3, backoff: { type: "exponential", delay: 5000 } });
    }
  }

  // Convenience: enqueue outgoing message
  async enqueueOutgoingMessage(data: OutgoingMessageData) {
    await this.outgoingQueue.add("send-wa", data, { attempts: 3, backoff: { type: "exponential", delay: 5000 } });
  }

  // Convenience: enqueue document indexing
  async enqueueIndexing(data: IndexingData) {
    await this.indexQueue.add("index-doc", data, { attempts: 2, backoff: { type: "exponential", delay: 10000 } });
  }
}

export interface IncomingMessageData {
  tenantId: string;
  waNumberId: string;
  nomor: string;
  kontak?: string;
  pesan: string;
  kanal: "Chat" | "Iklan";
}

export interface OutgoingMessageData {
  tenantId: string;
  waNumberId: string;
  nomor: string;
  pesan: string;
}

export interface IndexingData {
  tenantId: string;
  docId: string;
  content: string;
  tipe: "PDF" | "Teks" | "FAQ Manual";
}
