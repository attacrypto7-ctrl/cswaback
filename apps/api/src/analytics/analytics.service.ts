import { Injectable } from "@nestjs/common";
import { eq, sql, desc } from "drizzle-orm";
import { DatabaseService, schema } from "../database/database.service";

/** AnalyticsService — data halaman Analitik + ringkasan dashboard tenant. */
@Injectable()
export class AnalyticsService {
  constructor(private db: DatabaseService) {}

  /** Ringkasan utama dashboard: chat hari ini, kuota, status lisensi. */
  async overview(tenantId: string) {
    const [tenant] = await this.db.db
      .select()
      .from(schema.tenants)
      .where(eq(schema.tenants.id, tenantId));

    const chatHarian = await this.dailyChats(tenantId, 14);
    const [needHuman] = await this.db.db
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.chatLogs)
      .where(eq(schema.chatLogs.tenantId, tenantId));

    return {
      tenant: tenant
        ? {
            nama: tenant.nama, plan: tenant.plan, status: tenant.status,
            chatBulanIni: tenant.chatBulanIni, kuotaChat: tenant.kuotaChat,
            tokenBulanIni: tenant.tokenBulanIni,
            lisensiBerakhir: tenant.lisensiBerakhir?.toISOString() ?? null,
          }
        : null,
      perluManusia: needHuman?.n ?? 0,
      chatHarian,
    };
  }

  /** Data grafik halaman Analitik: chat harian, token, pertanyaan teratas. */
  async full(tenantId: string) {
    const chatHarian = await this.dailyChats(tenantId, 30);
    const pemakaianToken = await this.tokenUsage(tenantId);
    const pertanyaanTeratas = await this.topQuestions(tenantId);
    return { chatHarian, pemakaianToken, pertanyaanTeratas };
  }

  private async dailyChats(tenantId: string, days: number) {
    const rows: Array<{ hari: string; chat: number; gagal: number }> = await this.db.db.execute(
      sql`SELECT to_char(waktu, 'YYYY-MM-DD') AS hari,
                 count(*)::int AS chat,
                 count(*) FILTER (WHERE status = 'perlu_manusia')::int AS gagal
          FROM chat_logs WHERE tenant_id = ${tenantId}
            AND waktu >= now() - (${days} || ' days')::interval
          GROUP BY 1 ORDER BY 1`,
    ) as any;
    return Array.isArray(rows) ? rows : (rows as any)?.rows ?? [];
  }

  private async tokenUsage(tenantId: string) {
    const rows: Array<{ bulan: string; token: number }> = await this.db.db.execute(
      sql`SELECT to_char(created_at, 'YYYY-MM') AS bulan,
                 sum(tokens_input + tokens_output)::int AS token
          FROM usage_logs WHERE tenant_id = ${tenantId}
          GROUP BY 1 ORDER BY 1 LIMIT 12`,
    ) as any;
    return Array.isArray(rows) ? rows : (rows as any)?.rows ?? [];
  }

  private async topQuestions(tenantId: string) {
    const rows = await this.db.db
      .select({ pertanyaan: schema.chatLogs.pesanTerakhir, jumlah: sql<number>`count(*)::int` })
      .from(schema.chatLogs)
      .where(eq(schema.chatLogs.tenantId, tenantId))
      .groupBy(schema.chatLogs.pesanTerakhir)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
    return rows.map((r) => ({ pertanyaan: r.pertanyaan.slice(0, 80), jumlah: r.jumlah }));
  }
}
