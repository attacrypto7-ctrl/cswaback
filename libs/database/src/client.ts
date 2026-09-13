import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let dbInstance: NodePgDatabase<typeof schema> | null = null;
let poolInstance: Pool | null = null;

/**
 * Returns a singleton DrizzleORM database instance.
 * Call initDb() first from the bootstrap module.
 */
export function getDb(): NodePgDatabase<typeof schema> {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return dbInstance;
}

export function getPool(): Pool {
  if (!poolInstance) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return poolInstance;
}

export function initDb(databaseUrl: string): NodePgDatabase<typeof schema> {
  if (dbInstance) return dbInstance;

  poolInstance = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  dbInstance = drizzle(poolInstance, { schema });
  return dbInstance;
}

export { schema };
export type { NodePgDatabase } from "drizzle-orm/node-postgres";
