import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { eq, desc, like, and, gte, lte } from "drizzle-orm";
import { DatabaseService, schema } from "../database/database.service";

/**
 * AdminService — bisnis logika untuk panel admin.
 * Semua query selalu include filter tenant_id untuk isolasi data.
 */
@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private db: DatabaseService) {}

  // ---- Tenants ----
  async getAllTenants() {
    const rows = await this.db.db
      .select()
      .from(schema.tenants)
      .orderBy(desc(schema.tenants.createdAt));

    return rows.map((t) => this.formatTenant(t));
  }

  async getTenant(id: string) {
    const tenant = await this.db.db.query.tenants.findFirst({
      where: eq(schema.tenants.id, id),
    });

    if (!tenant) throw new NotFoundException(`Tenant ${id} tidak ditemukan`);
    return this.formatTenant(tenant);
  }

  async updateTenant(id: string, data: { status?: string; plan?: string; email?: string }) {
    const existing = await this.db.db.query.tenants.findFirst({
      where: eq(schema.tenants.id, id),
    });
    if (!existing) throw new NotFoundException(`Tenant ${id} tidak ditemukan`);

    const updates: Record<string, any> = {};
    if (data.status) updates.status = data.status;
    if (data.plan) updates.plan = data.plan;
    if (data.email) updates.email = data.email;

    const [updated] = await this.db.db
      .update(schema.tenants)
      .set(updates)
      .where(eq(schema.tenants.id, id))
      .returning();

    // Audit log
    await this.db.db.insert(schema.auditLog).values({
      tenantId: id,
      aktor: "admin",
      aksi: "Update tenant",
      target: `${id} — ${JSON.stringify(updates)}`,
    });

    return this.formatTenant(updated);
  }

  async searchTenants(q: string) {
    if (!q) return this.getAllTenants();
    const pattern = `%${q}%`;
    const rows = await this.db.db
      .select()
      .from(schema.tenants)
      .where(like(schema.tenants.nama, pattern))
      .orderBy(desc(schema.tenants.createdAt));

    return rows.map((t) => this.formatTenant(t));
  }

  // ---- Licenses ----
  async getAllLicenses(tenantId?: string) {
    const conditions: any[] = [];
    if (tenantId) conditions.push(eq(schema.licenses.tenantId, tenantId));

    const rows = await this.db.db
      .select()
      .from(schema.licenses)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(schema.licenses.createdAt));

    return rows.map((l) => this.formatLicense(l));
  }

  async getLicense(id: string) {
    const license = await this.db.db.query.licenses.findFirst({
      where: eq(schema.licenses.id, id),
      with: { tenants: true },
    });
    if (!license) throw new NotFoundException(`License ${id} tidak ditemukan`);
    return this.formatLicense(license);
  }

  async getLicenseStatus(id: string) {
    const license = await this.db.db.query.licenses.findFirst({
      where: eq(schema.licenses.id, id),
    });
    if (!license) throw new NotFoundException(`License ${id} tidak ditemukan`);
    return { status: license.status };
  }

  // ---- Audit ----
  async getAuditLog(limit?: number, tenantId?: string) {
    const conditions: any[] = [];
    if (tenantId) conditions.push(eq(schema.auditLog.tenantId, tenantId));

    const rows = await this.db.db
      .select()
      .from(schema.auditLog)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(schema.auditLog.waktu))
      .limit(limit || 100);

    return rows.map((a) => ({
      id: a.id,
      aktor: a.aktor,
      aksi: a.aksi,
      target: a.target,
      waktu: a.waktu.toISOString(),
      tenantId: a.tenantId,
    }));
  }

  // ---- Formatters (DB → frontend shape) ----
  private formatTenant(t: any) {
    return {
      id: t.id,
      nama: t.nama,
      industri: t.industri,
      plan: t.plan,
      email: t.email,
      bergabung: t.bergabung.toISOString().split("T")[0],
      status: t.status,
      nomorWa: t.nomorWa,
      chatBulanIni: t.chatBulanIni,
      kuotaChat: t.kuotaChat,
      tokenBulanIni: t.tokenBulanIni,
      lisensiBerakhir: t.lisensiBerakhir?.toISOString().split("T")[0] ?? "",
    };
  }

  private formatLicense(l: any) {
    return {
      id: l.id,
      kode: l.kode,
      tenantId: l.tenantId,
      tenantNama: l.tenantNama ?? l.tenants?.nama ?? "",
      plan: l.plan,
      status: l.status,
      dibuat: l.dibuat.toISOString().split("T")[0],
      berakhir: l.berakhir.toISOString().split("T")[0],
      kuotaChat: l.kuotaChat,
    };
  }
}
