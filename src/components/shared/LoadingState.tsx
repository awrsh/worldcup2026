"use client";

import { ShimmerSkeleton } from "@/components/animations";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  rows?: number;
  className?: string;
  variant?: "card" | "scoreboard" | "bracket";
}

export function LoadingState({ rows = 3, className, variant = "card" }: LoadingStateProps) {
  if (variant !== "card") {
    return <ShimmerSkeleton variant={variant} className={className} />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <ShimmerSkeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
