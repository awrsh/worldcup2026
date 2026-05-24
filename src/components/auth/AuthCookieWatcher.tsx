"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { hasAuthIdentity, logAuthDebug } from "@/lib/auth/log-auth-debug";
import { parseAuthUser } from "@/lib/auth/parse-auth-user";
import { readAuthUserCookieClient } from "@/lib/auth/read-auth-cookie";

/**
 * After Gradian SSO sets auth_user in the browser, refresh the RSC tree
 * so server components see the cookie (avoids stale "Sign in" UI).
 */
export function AuthCookieWatcher() {
  const router = useRouter();
  const hadAuthRef = useRef(false);

  useEffect(() => {
    const inspect = (trigger: string) => {
      const raw = readAuthUserCookieClient();
      const parsed = parseAuthUser(raw);
      const hasAuth = hasAuthIdentity(parsed);
      const cookieNames = typeof document !== "undefined" ? document.cookie.split(";").map((c) => c.trim().split("=")[0]) : [];

      logAuthDebug(`client:${trigger}`, {
        raw,
        parsed,
        cookieNames,
        extra: { hasAuth, hadAuthBefore: hadAuthRef.current },
      });

      if (hasAuth && !hadAuthRef.current) {
        hadAuthRef.current = true;
        logAuthDebug("client:refresh", { extra: { reason: "auth_user detected" } });
        router.refresh();
        return;
      }

      if (!hasAuth) {
        hadAuthRef.current = false;
      }
    };

    const onFocus = () => inspect("focus");

    inspect("mount");
    const interval = setInterval(() => inspect("poll"), 2000);
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [router]);

  return null;
}
