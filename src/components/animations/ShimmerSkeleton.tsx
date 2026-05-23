"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ShimmerSkeletonProps {
  className?: string;
  variant?: "card" | "scoreboard" | "bracket";
}

export function ShimmerSkeleton({ className, variant = "card" }: ShimmerSkeletonProps) {
  const reduced = useReducedMotion();

  if (variant === "scoreboard") {
    return (
      <div className={cn("overflow-hidden rounded-2xl border border-border bg-card", className)}>
        <div className="motion-shimmer h-10 border-b border-border" />
        <div className="space-y-3 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="motion-shimmer h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="motion-shimmer h-3 w-2/3 rounded" />
                <div className="motion-shimmer h-2 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "bracket") {
    return (
      <div className={cn("flex gap-4 overflow-hidden", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-52 shrink-0 space-y-3">
            <div className="motion-shimmer mx-auto h-4 w-24 rounded" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="motion-shimmer h-20 rounded-xl"
                style={{ animationDelay: `${(i + j) * 0.1}s` }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("motion-shimmer relative overflow-hidden rounded-2xl bg-muted/40", className)}
      animate={reduced ? undefined : { opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={reduced ? undefined : { x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function FootballLoader({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <motion.span
        className="text-4xl"
        animate={reduced ? undefined : { rotate: [0, 360], y: [0, -12, 0] }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          y: { duration: 1, repeat: Infinity },
        }}
      >
        ⚽
      </motion.span>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full w-1/3 rounded-full bg-primary"
          animate={reduced ? undefined : { x: ["-100%", "300%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
