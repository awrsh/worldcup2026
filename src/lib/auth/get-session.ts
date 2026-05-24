import { cookies } from "next/headers";
import { logAuthDebug } from "./log-auth-debug";
import { parseAuthUser, parseAuthUserCookie } from "./parse-auth-user";
import type { AuthUser } from "./types";

export const AUTH_USER_COOKIE = "auth_user";

export async function getAuthUser(context = "server"): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_USER_COOKIE)?.value;
  const allNames = cookieStore.getAll().map((c) => c.name);
  const parsedStep = parseAuthUser(raw);
  const authUser = parseAuthUserCookie(raw);

  logAuthDebug(`getAuthUser:${context}`, {
    raw,
    parsed: parsedStep,
    cookieNames: allNames,
    extra: {
      authenticated: Boolean(authUser),
      authUser,
    },
  });

  return authUser;
}
