"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransition, transition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={transition.premium}
        className="min-h-0 flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
