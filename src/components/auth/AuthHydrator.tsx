"use client";

import { useEffect } from "react";
import { authUserToUser } from "@/lib/auth/map-auth-user";
import type { AuthUser } from "@/lib/auth/types";
import { useUserStore } from "@/lib/store/user-store";

interface AuthHydratorProps {
  authUser: AuthUser;
}

export function AuthHydrator({ authUser }: AuthHydratorProps) {
  const setUser = useUserStore((s) => s.setUser);
  const currentPoints = useUserStore((s) => s.user.totalPoints);

  useEffect(() => {
    setUser(authUserToUser(authUser, currentPoints));
  }, [authUser, currentPoints, setUser]);

  return null;
}
