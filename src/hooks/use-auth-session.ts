"use client";

import { useEffect, useMemo, useState } from "react";
import { hasAuthIdentity } from "@/lib/auth/log-auth-debug";
import { parseAuthUser } from "@/lib/auth/parse-auth-user";
import { readAuthUserCookieClient } from "@/lib/auth/read-auth-cookie";
import type { ParsedAuthUser } from "@/lib/auth/types";

export function useAuthSession(serverAuthenticated = false) {
  const [rawCookie, setRawCookie] = useState<string | undefined>(undefined);

  useEffect(() => {
    const syncCookie = () => setRawCookie(readAuthUserCookieClient());
    syncCookie();

    const interval = setInterval(syncCookie, 1000);
    window.addEventListener("focus", syncCookie);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", syncCookie);
    };
  }, []);

  const parsed = useMemo(() => parseAuthUser(rawCookie), [rawCookie]);
  const clientAuthenticated = hasAuthIdentity(parsed);
  const isAuthenticated = serverAuthenticated || clientAuthenticated;

  return { isAuthenticated, parsed, clientAuthenticated, serverAuthenticated };
}

export function useParsedAuthUser(authUser?: string | null): ParsedAuthUser {
  return useMemo(() => parseAuthUser(authUser ?? readAuthUserCookieClient()), [authUser]);
}
