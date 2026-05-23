"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SaveState = "idle" | "loading" | "success";

interface MorphSaveButtonProps {
  onSave: () => Promise<void> | void;
  idleLabel: string;
  loadingLabel?: string;
  successLabel?: string;
  className?: string;
}

export function MorphSaveButton({
  onSave,
  idleLabel,
  loadingLabel = "...",
  successLabel = "✓",
  className,
}: MorphSaveButtonProps) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<SaveState>("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("loading");
    try {
      await onSave();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  useEffect(() => {
    if (state === "success" && !reduced) {
      const t = setTimeout(() => setState("idle"), 2000);
      return () => clearTimeout(t);
    }
  }, [state, reduced]);

  const icons = {
    idle: Save,
    loading: Loader2,
    success: Check,
  };
  const Icon = icons[state];

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={state === "loading"}
      layout
      whileHover={reduced || state !== "idle" ? undefined : { scale: 1.02 }}
      whileTap={reduced || state !== "idle" ? undefined : { scale: 0.98 }}
      animate={
        state === "success"
          ? { boxShadow: "0 0 30px oklch(52% 0.16 155 / 0.4)" }
          : { boxShadow: "0 0 0px transparent" }
      }
      transition={spring.soft}
      className={cn(
        "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
        state === "success" && "bg-success text-success-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <Icon className={cn("h-4 w-4", state === "loading" && "animate-spin")} />
          {state === "idle" && idleLabel}
          {state === "loading" && loadingLabel}
          {state === "success" && successLabel}
        </motion.span>
      </AnimatePresence>
      {state === "success" && !reduced && <ConfettiBurst />}
    </motion.button>
  );
}

function ConfettiBurst() {
  const pieces = Array.from({ length: 12 }, (_, i) => i);

  return (
    <span className="pointer-events-none absolute inset-0">
      {pieces.map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i / pieces.length) * Math.PI * 2) * 60,
            y: Math.sin((i / pieces.length) * Math.PI * 2) * 40 - 20,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}
