import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators/public.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("auth")
@UseGuards(JwtAuthGuard) // default guard, dioverride di endpoint @Public
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  async login(
    @Body() body: { email: string; password?: string },
  ) {
    return this.authService.login(body.email, body.password ?? "");
  }

  @Post("register")
  @Public()
  async register(
    @Body() body: { nama: string; industri: string; email: string; plan: string },
  ) {
    return this.authService.register(body);
  }

  @Post("activate-license")
  async activateLicense(
    @Request() req: any,
    @Body() body: { kode: string },
  ) {
    const tenantId = req.user.tenantId ?? req.user.sub;
    return { success: await this.authService.activateLicense(tenantId, body.kode) };
  }
}
