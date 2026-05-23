"use client";

import * as FlagIcons from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";
import type { Team } from "@/lib/api/types";

interface FlagAvatarProps {
  /** ISO code for country-flag-icons (e.g. MX, GB_ENG, GB_SCT) */
  code?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-12 w-24",
  lg: "h-20 w-20",
};

function getFlagComponent(code: string) {
  return FlagIcons[code as keyof typeof FlagIcons];
}

export function FlagAvatar({ code, fallback, size = "md", className }: FlagAvatarProps) {
  const Flag = code ? getFlagComponent(code) : undefined;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden  ",
        sizes[size],
        className
      )}
      aria-hidden={Flag ? true : undefined}
      role={Flag ? "img" : undefined}
      aria-label={Flag ? `${fallback ?? code} flag` : undefined}
    >
      {Flag ? (
        <Flag title={fallback ?? code} className="h-full w-full object-contain" />
      ) : (
        <span className="text-xs font-bold text-muted-foreground">{fallback?.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}

export function teamFlagCode(team?: Team): string | undefined {
  return team?.flagCode;
}
