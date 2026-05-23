"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CountUpNumberProps {
  value: number;
  className?: string;
  duration?: number;
  suffix?: string;
}

export function CountUpNumber({ value, className, duration = 1.2, suffix }: CountUpNumberProps) {
  const reduced = useReducedMotion();
  const springValue = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(springValue, (v) => Math.round(v).toLocaleString());
  const [text, setText] = useState(reduced ? String(value) : "0");
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setText(String(value));
      return;
    }
    springValue.set(value);
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [value, springValue, display, reduced]);

  return (
    <motion.span
      className={cn("tabular-nums", className)}
      key={value}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 0.35 }}
    >
      {text}
      {suffix}
    </motion.span>
  );
}
