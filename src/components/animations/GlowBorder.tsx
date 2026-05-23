"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function GlowBorder({ children, className, active = false }: GlowBorderProps) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0"
        animate={active ? { opacity: 1 } : { opacity: [0, 0.6, 0] }}
        transition={active ? undefined : { duration: 2.5, repeat: Infinity }}
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(68% 0.21 22 / 0.5), oklch(65% 0.2 5 / 0.5), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
      {children}
    </div>
  );
}
