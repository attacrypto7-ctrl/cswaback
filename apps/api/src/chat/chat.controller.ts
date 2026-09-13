import { Controller, Get, Post, Param, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Tenant } from "../common/decorators/tenant.decorator";

/** Prefix: /api/chat/* — halaman Percakapan */
@Controller("chat")
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Get("logs")
  logs(
    @Tenant("tenantId") tenantId: string,
    @Query("kanal") kanal?: string,
    @Query("status") status?: string,
    @Query("limit") limit?: string,
  ) {
    return this.chat.logs(tenantId, {
      kanal, status, limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get("stats")
  stats(@Tenant("tenantId") tenantId: string) {
    return this.chat.stats(tenantId);
  }

  @Get("logs/:id")
  detail(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.chat.detail(tenantId, id);
  }

  @Post("logs/:id/takeover")
  takeover(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.chat.takeover(tenantId, id);
  }

  @Post("logs/:id/release")
  release(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.chat.release(tenantId, id);
  }
}
