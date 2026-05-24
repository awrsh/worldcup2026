import type { User } from "@/lib/api/types";
import type { AuthUser } from "./types";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function authUserToUser(auth: AuthUser, existingPoints = 0): User {
  const label = auth.displayName.trim() || auth.username || "User";

  return {
    id: auth.username ?? auth.id,
    username: label,
    avatarInitials: initialsFromName(label),
    avatarUrl: auth.avatar,
    countryCode: auth.countryCode ?? "US",
    totalPoints: existingPoints,
  };
}
