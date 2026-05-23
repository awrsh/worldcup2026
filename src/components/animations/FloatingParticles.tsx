"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({ count = 12, className }: FloatingParticlesProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${8 + ((i * 17) % 84)}%`,
    y: `${10 + ((i * 23) % 80)}%`,
    size: 2 + (i % 3),
    delay: i * 0.4,
    duration: 4 + (i % 4),
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/30 blur-[1px]"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function StadiumLights({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-primary/15 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-0 h-full w-1/2 bg-gradient-to-l from-accent/15 to-transparent"
        animate={{ opacity: [0.4, 0.7, 0.4], x: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

export function AmbientGlow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]",
        className
      )}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
