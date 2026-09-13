import { Controller, Get, Put, Post, Body } from "@nestjs/common";
import { BotService } from "./bot.service";
import { Tenant } from "../common/decorators/tenant.decorator";
import type { UpdateBotSettingsDto, TrialRequestDto } from "@cs-ai/shared-types";

/** Prefix: /api/bot/* — pengaturan Balas Chat + Uji Coba Bot */
@Controller("bot")
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get("settings")
  getSettings(@Tenant("tenantId") tenantId: string) {
    return this.botService.getSettings(tenantId);
  }

  @Put("settings")
  updateSettings(
    @Tenant("tenantId") tenantId: string,
    @Body() dto: UpdateBotSettingsDto,
  ) {
    return this.botService.updateSettings(tenantId, dto);
  }

  @Post("trial")
  trial(@Tenant("tenantId") tenantId: string, @Body() dto: TrialRequestDto) {
    return this.botService.trial(tenantId, dto);
  }
}
