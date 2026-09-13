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
    const databaseUrl = this.configService.get<string>("databaseUrl");

    if (!databaseUrl) {
      this.logger.error("DATABASE_URL environment variable is not set!");
      throw new Error("DATABASE_URL is required");
    }

    try {
      initDb(databaseUrl);
      this.logger.log("Database connection established");
    } catch (err) {
      this.logger.error("Failed to connect to database", err instanceof Error ? err.stack : String(err));
      throw err;
    }
  }

  get db(): NodePgDatabase<typeof schema> {
    return getDb();
  }
}

// Re-export for injection
export { getDb } from "@cs-ai/database";
export { schema } from "@cs-ai/database";
