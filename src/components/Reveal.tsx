import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease_out, motion_duration, motion_y } from '../utils/motion';

type Reveal_props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

const Reveal: React.FC<Reveal_props> = ({
  children,
  className = '',
  delay = 0,
  y = motion_y,
  amount = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const in_view = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={in_view ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: motion_duration.enter, delay, ease: ease_out }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
