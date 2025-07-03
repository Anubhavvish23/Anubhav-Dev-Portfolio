import React, { useRef, useEffect, useState } from 'react';
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
  speed = 0.5,
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
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  const transform = direction === 'up' || direction === 'down' ? springY : springX;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'up' || direction === 'down' ? transform : 0,
        x: direction === 'left' || direction === 'right' ? transform : 0,
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const springBackgroundY = useSpring(backgroundY, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900"
        style={{ y: springBackgroundY }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Floating Elements Component
export const FloatingElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      {/* Mouse-following element */}
      <motion.div
        className="absolute w-4 h-4 bg-purple-400 rounded-full opacity-30 blur-sm"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      style={{ y, opacity, scale }}
    >
      <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {text}
      </h2>
    </motion.div>
  );
};

// Parallax Card Component
export const ParallaxCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  speed?: number;
}> = ({ children, className = "", speed = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * speed]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-2xl p-6 ${className}`}
      style={{ 
        y, 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 0, 
        rotateY: 0,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax Image Component
export const ParallaxImage: React.FC<{ 
  src: string; 
  alt: string;
  className?: string;
  speed?: number;
}> = ({ src, alt, className = "", speed = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{ y, scale }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default ParallaxSection; 