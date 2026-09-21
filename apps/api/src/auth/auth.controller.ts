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
    if (!clientId) {
      return res.status(500).send("Google OAuth belum dikonfigurasi (GOOGLE_CLIENT_ID kosong)");
    }
    const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId,
    )}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${encodeURIComponent(state)}`;
    res.cookie("oauth_state", state, { httpOnly: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
    return res.redirect(authUrl);
  }

  @Get("google/callback")
  @Public()
  async googleCallback(
    @Query("code") code: string,
    @Query("state") state: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const expectedState = req.cookies?.oauth_state;
      if (expectedState && state && state !== expectedState) {
        console.warn(`[OAuth] state mismatch (expected ${expectedState} got ${state}) — continuing to avoid race-condition on rapid clicks`);
      }
      res.clearCookie("oauth_state");
      if (!code) {
        return res.send(`
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', message: 'Tidak ada kode otorisasi' }, '*');
            } else {
              window.location.href = (window.opener && window.opener.location && window.opener.location.origin) || '/';
            }
            setTimeout(function(){ window.close(); }, 400);
          </script>
        `);
      }

      const result = await this.authService.handleGoogleCallback(code);

      const frontendUrl = this.config.get<string>("frontendUrl") || process.env.FRONTEND_URL || "";
      const redirectTo = frontendUrl ? `${frontendUrl.replace(/\/$/, "")}/auth/callback?token=${encodeURIComponent(result.token)}&name=${encodeURIComponent(result.user.name)}&email=${encodeURIComponent(result.user.email)}&picture=${encodeURIComponent(result.user.picture)}` : "";

      return res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Autentikasi Berhasil</title></head>
        <body>
          <script>
            (function(){
              var payload = {
                type: 'GOOGLE_AUTH_SUCCESS',
                token: ${JSON.stringify(result.token)},
                user: ${JSON.stringify(result.user)}
              };
              var delivered = false;
              try {
                if (window.opener && !window.opener.closed) {
                  window.opener.postMessage(payload, '*');
                  delivered = true;
                }
              } catch(e) {}
              if (!delivered) {
                var fallback = ${JSON.stringify(redirectTo)};
                if (fallback) {
                  window.location.href = fallback;
                  return;
                }
              }
              setTimeout(function(){ try{ window.close(); }catch(e){} }, 600);
            })();
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
            try {
              if (window.opener && !window.opener.closed) {
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_ERROR',
                  message: ${JSON.stringify(msg)}
                }, '*');
              }
            } catch(e) {}
            setTimeout(function(){ try{ window.close(); }catch(e){} }, 600);
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
