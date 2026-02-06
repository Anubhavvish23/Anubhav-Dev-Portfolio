import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.3, // Reduced default speed
  className = '',
  direction = 'up',
  offset = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset - 100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [offset, offset - 100 * speed]);
  
  const springY = useSpring(y, { stiffness: 80, damping: 25 }); // Reduced stiffness and damping
  const springX = useSpring(x, { stiffness: 80, damping: 25 });

  const transform = direction === 'up' || direction === 'down' ? springY : springX;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'up' || direction === 'down' ? transform : 0,
        x: direction === 'left' || direction === 'right' ? transform : 0,
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax Background Component
export const ParallaxBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Reduced movement
  const springBackgroundY = useSpring(backgroundY, { stiffness: 40, damping: 15 }); // Reduced stiffness

  return (
    <div ref={ref} className="relative overflow-x-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black"
        style={{ 
          y: springBackgroundY,
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Optimized Floating Elements Component
export const FloatingElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle mouse movement updates
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Reduced floating circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-15"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1,
          }}
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
      ))}
    </div>
  );
};

// Parallax Text Component
export const ParallaxText: React.FC<{ text: string; className?: string }> = ({ 
  text, 
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        opacity,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      {text}
    </motion.div>
  );
};

// Optimized Parallax Card Component
export const ParallaxCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  speed?: number;
}> = ({ children, className = "", speed = 0.2 }) => { // Reduced default speed
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30 * speed]); // Reduced movement
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        scale,
        opacity,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
};

// Optimized Parallax Image Component
export const ParallaxImage: React.FC<{ 
  src: string; 
  alt: string;
  className?: string;
  speed?: number;
}> = ({ src, alt, className = "", speed = 0.3 }) => { // Reduced default speed
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40 * speed]); // Reduced movement
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        scale,
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

export default ParallaxSection; 