import { Controller, Get } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { Tenant } from "../common/decorators/tenant.decorator";

/** Prefix: /api/analytics/* */
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get("overview")
  overview(@Tenant("tenantId") tenantId: string) {
    return this.analytics.overview(tenantId);
  }

  @Get()
  full(@Tenant("tenantId") tenantId: string) {
    return this.analytics.full(tenantId);
  }
}
