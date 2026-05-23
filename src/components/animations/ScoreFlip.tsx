"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { spring } from "@/lib/motion";

interface ScoreFlipProps {
  value: number;
  className?: string;
}

export function ScoreFlip({ value, className }: ScoreFlipProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={cn("relative inline-flex h-8 w-8 overflow-hidden", className)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -20, opacity: 0, rotateX: 90 }}
          transition={spring.snappy}
          className="absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface ScoreSelectorProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export function ScoreSelector({ value, onChange, min = 0, max = 20, label }: ScoreSelectorProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileTap={reduced ? undefined : { scale: 0.9 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary/50 text-lg font-bold hover:bg-secondary"
        >
          −
        </motion.button>
        <ScoreFlip value={value} className="h-10 w-12 text-2xl" />
        <motion.button
          type="button"
          whileTap={reduced ? undefined : { scale: 0.9 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary/50 text-lg font-bold hover:bg-secondary"
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
