import type { Variants } from 'framer-motion';

// ─── FRAMER MOTION VARIANTS ─────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const } },
};
