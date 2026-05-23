"use client";

import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";

interface PointsBadgeProps {
  points: number;
  className?: string;
}

export function PointsBadge({ points, className }: PointsBadgeProps) {
  const { t } = useTranslation();

  return (
    <Badge variant="gold" className={cn("gap-1", className)}>
      <Trophy className="h-3 w-3" />
      {t("common.pointsShort", { points })}
    </Badge>
  );
}
