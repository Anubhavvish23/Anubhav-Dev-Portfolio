import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ParallaxBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const background_y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const spring_background_y = useSpring(background_y, { stiffness: 40, damping: 15 });

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black"
        style={{
          y: spring_background_y,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
