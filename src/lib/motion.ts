import type { Transition, Variants } from "framer-motion";

/** Premium easing curves — Apple / SaaS inspired */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutCubic: [0.65, 0, 0.35, 1] as const,
  springSnappy: [0.34, 1.56, 0.64, 1] as const,
};

export const duration = {
  fast: 0.2,
  normal: 0.45,
  slow: 0.7,
  cinematic: 1.1,
};

export const spring = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 28 },
  soft: { type: "spring" as const, stiffness: 260, damping: 24 },
  bouncy: { type: "spring" as const, stiffness: 320, damping: 18 },
  gentle: { type: "spring" as const, stiffness: 180, damping: 22 },
};

export const transition = {
  premium: { duration: duration.normal, ease: ease.outExpo } satisfies Transition,
  cinematic: { duration: duration.cinematic, ease: ease.outExpo } satisfies Transition,
  spring: spring.soft satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerFast = staggerContainer(0.05, 0.05);

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.015, transition: spring.soft },
  tap: { scale: 0.98, transition: spring.snappy },
};

export const livePulse: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.85, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatIdle: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export const shineSweep: Variants = {
  animate: {
    x: ["-100%", "200%"],
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.06, duration: 0.55, ease: ease.outExpo },
  }),
};

export const rowSlideIn = (index: number): Variants => ({
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.06, duration: 0.4, ease: ease.outExpo },
  },
});

export const podiumFloat = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, ...spring.soft },
  },
});

export const reducedMotionVariants = (variants: Variants): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  ...variants,
});
