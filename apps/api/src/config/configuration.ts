/**
 * Environment-based configuration.
 * Semua nilai di-baca dari process.env (di-set di Railway Variables tab).
 */
export default () => ({
  port: parseInt(process.env.PORT ?? "3000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  encryptionKey: process.env.ENCRYPTION_KEY || "dev-encryption-key-32bytes!",
  groqApiKey: process.env.GROQ_API_KEY || "",
  internalApiUrl: process.env.INTERNAL_API_URL || "http://localhost:3000/api",
  waSessionVolumePath: process.env.WA_SESSION_VOLUME_PATH || "/tmp/wa-sessions",
  nodeEnv: process.env.NODE_ENV || "development",
});

export const configValidationSchema = undefined;
