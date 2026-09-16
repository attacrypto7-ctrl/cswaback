import { Controller, Post, Body, UseGuards, Request, Get, Query, Res, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators/public.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Controller("auth")
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService, private config: ConfigService) {}

  @Get("google")
  @Public()
  async googleAuth(@Res() res: Response) {
    const clientId = this.config.get<string>("googleClientId") || process.env.GOOGLE_CLIENT_ID || "";
    const redirectUri =
      this.config.get<string>("googleRedirectUri") ||
      process.env.GOOGLE_REDIRECT_URI ||
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:3000/api/auth/google/callback";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId,
    )}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;

    return res.redirect(authUrl);
  }

  @Get("google/callback")
  @Public()
  async googleCallback(@Query("code") code: string, @Res() res: Response) {
    try {
      if (!code) {
        return res.send(`
          <script>
            window.opener && window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', message: 'Tidak ada kode otorisasi' }, '*');
            window.close();
          </script>
        `);
      }

      const result = await this.authService.handleGoogleCallback(code);

      // Kirim hasil lewat postMessage ke window opener lalu tutup popup
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Autentikasi Berhasil</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_SUCCESS',
                token: ${JSON.stringify(result.token)},
                user: ${JSON.stringify(result.user)}
              }, '*');
            }
            window.close();
          </script>
          <p>Login berhasil. Jendela ini akan otomatis tertutup...</p>
        </body>
        </html>
      `);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Autentikasi Google gagal";
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Autentikasi Gagal</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_ERROR',
                message: ${JSON.stringify(msg)}
              }, '*');
            }
            window.close();
          </script>
          <p>Login gagal: ${msg}. Jendela ini akan otomatis tertutup...</p>
        </body>
        </html>
      `);
    }
  }

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
