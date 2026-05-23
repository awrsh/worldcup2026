"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, staggerContainer, transition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  stagger?: number;
  delay?: number;
  once?: boolean;
}

export function AnimatedSection({
  children,
  className,
  stagger = 0.08,
  delay = 0.1,
  once = true,
  ...props
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainer(stagger, delay)}
      transition={transition.premium}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUp}
      transition={transition.premium}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeading({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.04, 0)}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={fadeUp}
          transition={{ ...transition.premium, delay: i * 0.04 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
