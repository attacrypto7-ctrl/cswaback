import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

/**
 * AdminGuard — hanya JWT dengan role "admin" yang boleh lewat.
 * Dipasang di AdminController (JwtAuthGuard global sudah jalan duluan).
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user?.role !== "admin") {
      throw new ForbiddenException("Hanya admin yang boleh mengakses");
    }
    return true;
  }
}
