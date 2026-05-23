"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { spring } from "@/lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  float?: boolean;
}

export function TiltCard({ children, className, glow = true, float = false }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, spring.gentle);
  const springRotateY = useSpring(rotateY, spring.gentle);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 6);
    rotateX.set(-y * 6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
      whileHover={{ y: -4, transition: spring.soft }}
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
      className={cn("group relative isolate overflow-hidden rounded-2xl", className)}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export function MotionCard({
  children,
  className,
  index = 0,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  tilt?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {tilt && !reduced ? (
        <TiltCard className={className}>{children}</TiltCard>
      ) : (
        <div className={className}>{children}</div>
      )}
    </motion.div>
  );
}
