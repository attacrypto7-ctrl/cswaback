import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
    };
  }

  getInfo() {
    return {
      service: "cs-ai-api",
      version: "1.0.0",
      description: "REST API for Balasin CS AI WhatsApp multi-tenant platform",
      endpoints: {
        auth: "/api/auth",
        admin: "/api/admin/*",
        tenants: "/api/tenants",
        waNumbers: "/api/wa-numbers",
        knowledge: "/api/knowledge/*",
        bot: "/api/bot/*",
        chat: "/api/chat/*",
        analytics: "/api/analytics",
        license: "/api/license",
        internal: "/api/internal/*",
      },
    };
  }
}
