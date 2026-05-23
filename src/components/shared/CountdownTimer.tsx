"use client";

import { Fragment } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";

interface CountdownTimerProps {
  targetDate: string | null;
  className?: string;
  compact?: boolean;
}

export function CountdownTimer({ targetDate, className, compact }: CountdownTimerProps) {
  const { t } = useTranslation();
  const { timeLeft, mounted } = useCountdown(targetDate);

  const separatorClass = cn(
    "font-mono font-bold leading-none text-muted-foreground",
    compact ? "h-10 text-sm" : "h-14 text-xl"
  );

  if (!mounted || !timeLeft) {
    return (
      <div className={cn("flex items-center gap-2", className)} dir="ltr">
        {[0, 0, 0, 0].map((_, i) => (
          <Fragment key={i}>
            {i > 0 && <span className={separatorClass}>:</span>}
            <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
          </Fragment>
        ))}
      </div>
    );
  }

  const units = [
    { label: t("countdown.days"), value: timeLeft.days },
    { label: t("countdown.hours"), value: timeLeft.hours },
    { label: t("countdown.minutes"), value: timeLeft.minutes },
    { label: t("countdown.seconds"), value: timeLeft.seconds },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)} dir="ltr">
      {units.map(({ label, value }, i) => (
        <Fragment key={label}>
          {i > 0 && (
            <span className={cn(separatorClass, "flex items-center justify-center")}>:</span>
          )}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "glass-card flex items-center justify-center font-mono font-bold text-foreground",
                compact ? "h-10 w-10 text-sm" : "h-14 w-14 text-xl"
              )}
            >
              {String(value).padStart(2, "0")}
            </div>
            {!compact && <span className="mt-1 text-xs text-muted-foreground">{label}</span>}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
