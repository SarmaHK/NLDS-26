export type AdminRole = "SUPER_ADMIN" | "OC_ADMIN";

export interface AdminUser {
  id: string;
  role: AdminRole;
  permissions: string[];
}

export class AuthorizationError extends Error {
  constructor() {
    super("403 Forbidden: Insufficient clearance for this operation.");
    this.name = "AuthorizationError";
  }
}

export class AuthorizationService {
  static requirePermission(
    admin: AdminUser,
    requiredPermission: string,
  ): boolean {
    if (admin.role === "SUPER_ADMIN") return true;

    if (
      admin.role === "OC_ADMIN" &&
      admin.permissions.includes(requiredPermission)
    ) {
      return true;
    }

    throw new AuthorizationError();
  }
}
