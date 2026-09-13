import { Injectable, NotFoundException } from "@nestjs/common";
import { eq, and, desc, sql } from "drizzle-orm";
import { DatabaseService, schema } from "../database/database.service";

/** ChatService — riwayat percakapan + ambil-alih manual oleh admin tenant. */
@Injectable()
export class ChatService {
  constructor(private db: DatabaseService) {}

  async logs(tenantId: string, query: { kanal?: string; status?: string; limit?: number }) {
    const conditions: any[] = [eq(schema.chatLogs.tenantId, tenantId)];
    if (query.kanal) conditions.push(eq(schema.chatLogs.kanal, query.kanal));
    if (query.status) conditions.push(eq(schema.chatLogs.status, query.status));
    const rows = await this.db.db
      .select()
      .from(schema.chatLogs)
      .where(and(...conditions))
      .orderBy(desc(schema.chatLogs.waktu))
      .limit(query.limit ?? 100);
    return rows.map((c) => this.format(c));
  }

  async detail(tenantId: string, id: string) {
    const row = await this.db.db.query.chatLogs.findFirst({
      where: and(eq(schema.chatLogs.id, id), eq(schema.chatLogs.tenantId, tenantId)),
    });
    if (!row) throw new NotFoundException("Chat tidak ditemukan");
    return this.format(row);
  }

  /** Tandai chat diambil alih manusia — worker berhenti membalas otomatis. */
  async takeover(tenantId: string, id: string) {
    const [row] = await this.db.db
      .update(schema.chatLogs)
      .set({ status: "diambil_alih" })
      .where(and(eq(schema.chatLogs.id, id), eq(schema.chatLogs.tenantId, tenantId)))
      .returning();
    if (!row) throw new NotFoundException("Chat tidak ditemukan");
    await this.db.db.insert(schema.auditLog).values({
      tenantId, aktor: "tenant", aksi: "Ambil alih chat", target: id,
    });
    return this.format(row);
  }

  /** Kembalikan ke bot. */
  async release(tenantId: string, id: string) {
    const [row] = await this.db.db
      .update(schema.chatLogs)
      .set({ status: "terjawab" })
      .where(and(eq(schema.chatLogs.id, id), eq(schema.chatLogs.tenantId, tenantId)))
      .returning();
    if (!row) throw new NotFoundException("Chat tidak ditemukan");
    return this.format(row);
  }

  async stats(tenantId: string) {
    const [total] = await this.db.db
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.chatLogs)
      .where(eq(schema.chatLogs.tenantId, tenantId));
    const [needHuman] = await this.db.db
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.chatLogs)
      .where(and(eq(schema.chatLogs.tenantId, tenantId), eq(schema.chatLogs.status, "perlu_manusia")));
    return { total: total?.n ?? 0, perluManusia: needHuman?.n ?? 0 };
  }

  private format(c: any) {
    return {
      id: c.id,
      tenantId: c.tenantId,
      waNumberId: c.waNumberId ?? "",
      kontak: c.kontak,
      nomor: c.nomor,
      kanal: c.kanal,
      pesanTerakhir: c.pesanTerakhir,
      balasan: c.balasan ?? "",
      waktu: c.waktu?.toISOString() ?? "",
      keyakinan: c.keyakinan,
      status: c.status,
    };
  }
}
