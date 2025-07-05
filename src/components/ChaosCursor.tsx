import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChaosCursorProps {
  magicMode: boolean;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const ChaosCursor: React.FC<ChaosCursorProps> = ({ magicMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

  useEffect(() => {
    if (!magicMode) {
      setSparkles([]);
      setTrail([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
      
      // Add to trail (throttled for performance)
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-8); // Keep last 8 positions for better performance
      });

      // Randomly create sparkles (reduced frequency for better performance)
      if (Math.random() < 0.15) {
        const newSparkle: Sparkle = {
          id: Date.now(),
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.3
        };
        
        setSparkles(prev => [...prev, newSparkle]);
        
        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 1500);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [magicMode]);

  if (!magicMode) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35,
          mass: 0.5
        }}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
      </motion.div>

      {/* Cursor trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ 
              x: point.x - 5, 
              y: point.y - 5,
              opacity: 0.8,
              scale: 1
            }}
            animate={{ 
              opacity: 0,
              scale: 0.5
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{
              width: 10 - index * 0.5,
              height: 10 - index * 0.5,
              backgroundColor: colors[index % colors.length],
              borderRadius: '50%',
              filter: 'blur(1px)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="fixed pointer-events-none z-[9997]"
            initial={{ 
              x: sparkle.x,
              y: sparkle.y,
              opacity: 0,
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              rotate: 360,
              y: sparkle.y - 50
            }}
            exit={{ 
              opacity: 0,
              scale: 0,
              rotate: 720
            }}
            transition={{ 
              duration: 2,
              delay: sparkle.delay,
              ease: "easeOut"
            }}
            style={{
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              filter: 'blur(0.5px) drop-shadow(0 0 4px currentColor)'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default ChaosCursor; 