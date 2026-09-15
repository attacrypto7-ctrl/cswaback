import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initDb, getDb, schema } from "@cs-ai/database";
import type { NodePgDatabase } from "@cs-ai/database";

/**
 * DatabaseService — singleton DrizzleORM PostgreSQL client.
 * Initialized once at startup, di-inject ke semua service yang butuh DB.
 */
@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const defaultUrl = "postgresql://postgres:postgres@localhost:5432/chatbot_db?schema=public";
    let databaseUrl = this.configService.get<string>("databaseUrl") || process.env.DATABASE_URL || defaultUrl;

    if (!this.configService.get<string>("databaseUrl") && !process.env.DATABASE_URL) {
      this.logger.warn(`DATABASE_URL not set — using default fallback: ${defaultUrl}`);
    }

    try {
      initDb(databaseUrl);
      this.logger.log("Database connection established");
    } catch (err) {
      const isDev = (process.env.NODE_ENV || "development") !== "production";
      this.logger.error("Failed to connect to database", err instanceof Error ? err.stack : String(err));
      if (!isDev) throw err;
      this.logger.warn("Running in dev mode — continuing without DB (API will return errors on DB queries)");
    }
  }

  get db(): NodePgDatabase<typeof schema> {
    return getDb();
  }
}

// Re-export for injection
export { getDb } from "@cs-ai/database";
export { schema } from "@cs-ai/database";
