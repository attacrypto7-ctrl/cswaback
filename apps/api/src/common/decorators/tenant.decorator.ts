import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * @TenantId() — ekstrak tenant ID dari JWT payload.
 *  Digunakan di semua controller tenant-scoped untuk mengetahui
 *  tenant yang sedang terautentikasi.
 */
export const Tenant = createParamDecorator(
  (data: "tenantId" | "role" | "email" | "nama" | "sub" | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return null;

    if (!data) return user; // kembalikan seluruh payload

    if (data === "tenantId") return user.tenantId ?? user.sub;
    if (data === "role") return user.role;
    if (data === "email") return user.email;
    if (data === "nama") return user.nama;
    if (data === "sub") return user.sub;
    return null;
  },
);
