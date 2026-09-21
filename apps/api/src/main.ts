import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

import { AppModule } from "./app.module";

process.on("unhandledRejection", (reason: any) => {
  if (
    reason?.code === "ECONNREFUSED" ||
    reason?.message?.includes("ECONNREFUSED") ||
    reason?.name === "AggregateError"
  ) {
    return;
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS — di produksi hanya izinkan FRONTEND_URL, di dev terima semua
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
  const isProduction = process.env.NODE_ENV === "production";
  app.enableCors({
    origin: isProduction ? frontendUrl : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Security headers
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  // Global validation pipe — otomatis validate DTOs dengan class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`[API] Server running on port ${port}`);
  console.log(`[API] Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`[API] CORS allowed origin: ${isProduction ? frontendUrl : "all (dev mode)"}`);
}
void bootstrap();
