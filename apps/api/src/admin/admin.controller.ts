import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Public } from "../common/decorators/public.decorator";

/**
 * AdminController — endpoint API untuk panel admin.
 * Prefix: /api/admin/*
 *
 * Perlu role "admin" (JWT). Semua endpoint kecuali @Public
 * dilindungi JwtAuthGuard + role check.
 */
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ---- Tenants ----
  @Get("tenants")
  getAllTenants() {
    return this.adminService.getAllTenants();
  }

  @Get("tenants/:id")
  getTenant(@Param("id") id: string) {
    return this.adminService.getTenant(id);
  }

  @Put("tenants/:id")
  updateTenant(
    @Param("id") id: string,
    @Body() body: { status?: string; plan?: string; email?: string },
  ) {
    return this.adminService.updateTenant(id, body);
  }

  @Get("tenants/search")
  searchTenants(@Query("q") q: string) {
    return this.adminService.searchTenants(q);
  }

  // ---- Licenses ----
  @Get("licenses")
  getAllLicenses(@Query("tenantId") tenantId?: string) {
    return this.adminService.getAllLicenses(tenantId);
  }

  @Get("licenses/:id")
  getLicense(@Param("id") id: string) {
    return this.adminService.getLicense(id);
  }

  @Get("licenses/:id/status")
  getLicenseStatus(@Param("id") id: string) {
    return this.adminService.getLicenseStatus(id);
  }

  // ---- Audit ----
  @Get("audit")
  getAuditLog(
    @Query("limit") limit?: number,
    @Query("tenantId") tenantId?: string,
  ) {
    return this.adminService.getAuditLog(limit, tenantId);
  }
}
