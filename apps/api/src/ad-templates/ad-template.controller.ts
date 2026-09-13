import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { AdTemplateService } from "./ad-template.service";
import { Tenant } from "../common/decorators/tenant.decorator";
import type { CreateAdTemplateDto, UpdateAdTemplateDto } from "@cs-ai/shared-types";

/** Prefix: /api/ad-templates/* — halaman Auto Bales Iklan */
@Controller("ad-templates")
export class AdTemplateController {
  constructor(private readonly ads: AdTemplateService) {}

  @Get()
  list(@Tenant("tenantId") tenantId: string) {
    return this.ads.list(tenantId);
  }

  @Post()
  create(@Tenant("tenantId") tenantId: string, @Body() dto: CreateAdTemplateDto) {
    return this.ads.create(tenantId, dto);
  }

  @Put(":id")
  update(
    @Tenant("tenantId") tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateAdTemplateDto,
  ) {
    return this.ads.update(tenantId, id, dto);
  }

  @Delete(":id")
  remove(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.ads.remove(tenantId, id);
  }
}
