import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from '../lib/variants';
import type { Variants } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export default function RevealSection({
  children,
  className = '',
  variants = fadeUp,
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
