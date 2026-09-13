import { Controller, Get, Post, Body } from "@nestjs/common";
import { LicenseService } from "./license.service";
import { Tenant } from "../common/decorators/tenant.decorator";

/** Prefix: /api/license/* — halaman Lisensi (sisi tenant) */
@Controller("license")
export class LicenseController {
  constructor(private readonly license: LicenseService) {}

  @Get("me")
  myLicenses(@Tenant("tenantId") tenantId: string) {
    return this.license.myLicenses(tenantId);
  }

  @Get("status")
  status(@Tenant("tenantId") tenantId: string) {
    return this.license.status(tenantId);
  }

  @Post("activate")
  activate(@Tenant("tenantId") tenantId: string, @Body() body: { kode: string }) {
    return this.license.activate(tenantId, body.kode);
  }
}
