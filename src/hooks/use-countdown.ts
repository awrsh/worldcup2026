"use client";

import { useEffect, useState } from "react";
import { intervalToDuration, isPast, parseISO } from "date-fns";

export function useCountdown(targetDate: string | null) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!targetDate || !mounted) return;

    const tick = () => {
      const target = parseISO(targetDate);
      if (isPast(target)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const duration = intervalToDuration({ start: new Date(), end: target });
      setTimeLeft({
        days: duration.days ?? 0,
        hours: duration.hours ?? 0,
        minutes: duration.minutes ?? 0,
        seconds: duration.seconds ?? 0,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, mounted]);

  return { timeLeft, mounted };
}
