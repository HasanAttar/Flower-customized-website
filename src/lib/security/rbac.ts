import type { Role } from "@/types/shop";

export function canAccessAdmin(role?: string | null) { return role === "SUPER_ADMIN" || role === "STAFF"; }
export function canManageSettings(role?: Role | string | null) { return role === "SUPER_ADMIN"; }
