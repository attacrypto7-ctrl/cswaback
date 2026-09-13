import { Injectable, NotFoundException } from "@nestjs/common";
import { eq, and, desc } from "drizzle-orm";
import { DatabaseService, schema } from "../database/database.service";
import { AuthService } from "../auth/auth.service";

/** LicenseService — sisi tenant: lihat lisensi sendiri + aktivasi kode. */
@Injectable()
export class LicenseService {
  constructor(
    private db: DatabaseService,
    private authService: AuthService,
  ) {}

  async myLicenses(tenantId: string) {
    const rows = await this.db.db
      .select()
      .from(schema.licenses)
      .where(eq(schema.licenses.tenantId, tenantId))
      .orderBy(desc(schema.licenses.createdAt));
    const [tenant] = await this.db.db
      .select()
      .from(schema.tenants)
      .where(eq(schema.tenants.id, tenantId));
    return rows.map((l) => ({
      id: l.id, kode: l.kode, tenantId: l.tenantId,
      tenantNama: tenant?.nama ?? "",
      plan: l.plan, status: l.status,
      dibuat: l.dibuat.toISOString().split("T")[0],
      berakhir: l.berakhir.toISOString().split("T")[0],
      kuotaChat: l.kuotaChat,
    }));
  }

  async activate(tenantId: string, kode: string) {
    const ok = await this.authService.activateLicense(tenantId, kode);
    return { success: ok };
  }

  async status(tenantId: string) {
    const tenant = await this.db.db.query.tenants.findFirst({
      where: eq(schema.tenants.id, tenantId),
    });
    if (!tenant) throw new NotFoundException("Tenant tidak ditemukan");
    const expired = tenant.lisensiBerakhir ? tenant.lisensiBerakhir.getTime() < Date.now() : false;
    return {
      plan: tenant.plan,
      status: expired ? "expired" : tenant.status,
      kuotaChat: tenant.kuotaChat,
      chatBulanIni: tenant.chatBulanIni,
      sisaKuota: Math.max(0, tenant.kuotaChat - tenant.chatBulanIni),
      lisensiBerakhir: tenant.lisensiBerakhir?.toISOString() ?? null,
    };
  }
}
