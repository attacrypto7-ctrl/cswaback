import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "@cs-ai/shared-types";

/**
 * JwtStrategy — memvalidasi token JWT dan mengembalikan payload user.
 * Payload berisi: sub (id), email, role, nama, tenantId.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwtSecret") || "dev-secret-change-me",
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload & { tenantId?: string }> {
    const result: JwtPayload & { tenantId?: string } = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      nama: payload.nama,
    };

    // Untuk tenant, sub = tenant ID; untuk admin, sub = user ID
    if (payload.role === "tenant") {
      result.tenantId = payload.sub;
    }

    return result;
  }
}
