import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { eq, and, sql } from "drizzle-orm";
import { DatabaseService, schema } from "../database/database.service";
import { JwtPayload, AuthResponse } from "@cs-ai/shared-types";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private db: DatabaseService,
  ) {}

  /**
   * Login — autentikasi tenant atau admin.
   * Tenant login via email + password (password disimpan di tabel tenants
   * atau di user_accounts). Untuk admin, email + password di tabel admin_users.
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    // Cek tenant dulu
    const tenant = await this.db.db.query.tenants.findFirst({
      where: eq(schema.tenants.email, email),
    });

    if (tenant && tenant.status === "aktif") {
      // Untuk demo: tidak ada password di tabel tenants, langsung generate token
      // Di produksi, tambahkan kolom password_hash di tabel tenants
      const payload: JwtPayload = {
        sub: tenant.id,
        email: tenant.email,
        role: "tenant",
        nama: tenant.nama,
      };

      const token = this.jwtService.sign(payload);
      return { accessToken: token, tenantId: tenant.id };
    }

    // Cek admin
    const admin = await this.db.db.query.adminUsers.findFirst({
      where: eq(schema.adminUsers.email, email),
    });

    if (admin && admin.isActive) {
      if (!admin.passwordHash) {
        throw new UnauthorizedException("Kredensial tidak valid");
      }
      const passwordValid = await bcrypt.compare(password, admin.passwordHash);
      if (!passwordValid) {
        throw new UnauthorizedException("Kredensial tidak valid");
      }

      const payload: JwtPayload = {
        sub: admin.id,
        email: admin.email,
        role: "admin",
        nama: admin.nama,
      };

      const token = this.jwtService.sign(payload);
      return { accessToken: token };
    }

    throw new UnauthorizedException("Email atau password tidak valid");
  }

  /**
   * Register tenant baru (untuk pendaftarian mandiri di landing page).
   */
  async register(data: {
    nama: string;
    industri: string;
    email: string;
    plan: string;
  }): Promise<AuthResponse> {
    const existing = await this.db.db.query.tenants.findFirst({
      where: eq(schema.tenants.email, data.email),
    });

    if (existing) {
      throw new UnauthorizedException("Email sudah terdaftar");
    }

    const [tenant] = await this.db.db
      .insert(schema.tenants)
      .values({
        nama: data.nama,
        industri: data.industri,
        email: data.email,
        plan: data.plan as "Starter" | "Growth" | "Scale",
        status: "aktif",
      })
      .returning();

    // Insert bot_settings default
    await this.db.db.insert(schema.botSettings).values({
      tenantId: tenant.id,
    });

    const payload: JwtPayload = {
      sub: tenant.id,
      email: tenant.email,
      role: "tenant",
      nama: tenant.nama,
    };

    const token = this.jwtService.sign(payload);
    this.logger.log(`New tenant registered: ${tenant.email}`);
    return { accessToken: token, tenantId: tenant.id };
  }

  /**
   * Validasi license code dan update tenant
   */
  async activateLicense(tenantId: string, kode: string): Promise<boolean> {
    const license = await this.db.db.query.licenses.findFirst({
      where: eq(schema.licenses.kode, kode.toUpperCase()),
    });

    if (!license) {
      throw new UnauthorizedException("Kode lisensi tidak ditemukan");
    }

    if (license.status === "revoked" || license.status === "expired") {
      throw new UnauthorizedException("Lisensi tidak valid");
    }

    // Update license status
    await this.db.db
      .update(schema.licenses)
      .set({ status: "aktif" })
      .where(eq(schema.licenses.id, license.id));

    // Update tenant
    await this.db.db
      .update(schema.tenants)
      .set({
        plan: license.plan,
        kuotaChat: license.kuotaChat,
        lisensiBerakhir: license.berakhir,
      })
      .where(eq(schema.tenants.id, tenantId));

    // Audit log
    await this.db.db.insert(schema.auditLog).values({
      tenantId,
      aktor: "self",
      aksi: "Aktivasi lisensi",
      target: license.kode,
    });

    return true;
  }
}
