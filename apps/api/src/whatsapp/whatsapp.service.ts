import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { eq, and } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";
import { DatabaseService, schema } from "../database/database.service";
import { QueueService } from "../queue/queue.service";

/**
 * WhatsappService — CRUD nomor WA tenant + jembatan ke wa-gateway.
 * QR/pairing code diambil dari wa-gateway (service terpisah) via INTERNAL_API_URL.
 */
@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(
    private db: DatabaseService,
    private queueService: QueueService,
    private configService: ConfigService,
  ) {}

  async list(tenantId: string) {
    const rows = await this.db.db
      .select()
      .from(schema.waNumbers)
      .where(eq(schema.waNumbers.tenantId, tenantId));
    return rows.map((w) => this.format(w));
  }

  async create(tenantId: string, dto: { label: string; nomor: string }) {
    const [row] = await this.db.db
      .insert(schema.waNumbers)
      .values({ tenantId, label: dto.label, nomor: dto.nomor, status: "terputus" })
      .returning();
    await this.db.db.insert(schema.auditLog).values({
      tenantId,
      aktor: "tenant",
      aksi: "Tambah nomor WA",
      target: dto.nomor,
    });
    return this.format(row);
  }

  async remove(tenantId: string, id: string) {
    const existing = await this.findOwned(tenantId, id);
    // Minta wa-gateway logout sesi juga (best-effort)
    await this.callGateway(`/wa/${id}/logout`, "POST").catch(() => undefined);
    await this.db.db.delete(schema.waNumbers).where(eq(schema.waNumbers.id, id));
    return { success: true, id: existing.id };
  }

  /** Minta QR pairing ke wa-gateway untuk ditampilkan di dashboard. */
  async getQr(tenantId: string, id: string) {
    await this.findOwned(tenantId, id);
    const data = await this.callGateway(`/wa/${id}/qr`, "GET");
    return data;
  }

  async disconnect(tenantId: string, id: string) {
    const [row] = await this.db.db
      .update(schema.waNumbers)
      .set({ status: "terputus" })
      .where(and(eq(schema.waNumbers.id, id), eq(schema.waNumbers.tenantId, tenantId)))
      .returning();
    if (!row) throw new NotFoundException("Nomor tidak ditemukan");
    await this.callGateway(`/wa/${id}/logout`, "POST").catch(() => undefined);
    return this.format(row);
  }

  async toggleAuto(tenantId: string, id: string, dto: { autoChat?: boolean; autoIklan?: boolean }) {
    const [row] = await this.db.db
      .update(schema.waNumbers)
      .set({ ...(dto.autoChat !== undefined ? { autoChat: dto.autoChat } : {}), ...(dto.autoIklan !== undefined ? { autoIklan: dto.autoIklan } : {}) })
      .where(and(eq(schema.waNumbers.id, id), eq(schema.waNumbers.tenantId, tenantId)))
      .returning();
    if (!row) throw new NotFoundException("Nomor tidak ditemukan");
    return this.format(row);
  }

  private async findOwned(tenantId: string, id: string) {
    const row = await this.db.db.query.waNumbers.findFirst({
      where: and(eq(schema.waNumbers.id, id), eq(schema.waNumbers.tenantId, tenantId)),
    });
    if (!row) throw new NotFoundException("Nomor tidak ditemukan");
    return row;
  }

  private async callGateway(path: string, method: string) {
    const base = this.configService.get<string>("internalApiUrl") ?? "";
    // INTERNAL_API_URL menunjuk ke service api; gateway punya base sendiri:
    const gatewayBase = (process.env.WA_GATEWAY_URL || base.replace(":3000", ":3002")).replace(/\/api$/, "");
    const res = await fetch(`${gatewayBase}${path}`, {
      method,
      headers: { "x-internal-secret": process.env.INTERNAL_SECRET ?? "" },
    });
    if (!res.ok) throw new NotFoundException("wa-gateway tidak merespons");
    return res.json();
  }

  private format(w: any) {
    return {
      id: w.id,
      tenantId: w.tenantId,
      label: w.label,
      nomor: w.nomor,
      status: w.status,
      terakhirAktif: w.terakhirAktif?.toISOString() ?? "",
      autoChat: w.autoChat,
      autoIklan: w.autoIklan,
    };
  }
}
