import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  
  const colors = useRef(['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']);
  const lastMouseMove = useRef(0);
  const throttleDelay = 16; // ~60fps

  // Memoize sparkle creation
  const createSparkle = useCallback((x: number, y: number): Sparkle => ({
    id: Date.now() + Math.random(),
    x: x + (Math.random() - 0.5) * 30,
    y: y + (Math.random() - 0.5) * 30,
    size: Math.random() * 4 + 2,
    color: colors.current[Math.floor(Math.random() * colors.current.length)],
    delay: Math.random() * 0.2
  }), []);

  // Memoize sparkle removal
  const removeSparkle = useCallback((id: number) => {
    setSparkles(prev => prev.filter(s => s.id !== id));
  }, []);

  useEffect(() => {
    if (!magicMode) {
      setSparkles([]);
      setTrail([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle mouse movement updates
      if (now - lastMouseMove.current < throttleDelay) {
        return;
      }
      lastMouseMove.current = now;

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
      
      // Add to trail (keep fewer positions for better performance)
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-6); // Keep last 6 positions instead of 8
      });

      // Create sparkles less frequently (reduced from 0.15 to 0.08)
      if (Math.random() < 0.08 && sparkles.length < 5) {
        const newSparkle = createSparkle(e.clientX, e.clientY);
        setSparkles(prev => [...prev, newSparkle]);
        
        // Remove sparkle after animation
        setTimeout(() => {
          removeSparkle(newSparkle.id);
        }, 1200); // Reduced from 1500ms
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [magicMode, createSparkle, removeSparkle, sparkles.length]);

  if (!magicMode) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 600, // Reduced from 800
          damping: 40,    // Increased from 35
          mass: 0.6       // Increased from 0.5
        }}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-md" />
      </motion.div>

      {/* Cursor trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[9998] mix-blend-difference"
            initial={{ 
              x: point.x - 4, 
              y: point.y - 4,
              opacity: 0.8,
              scale: 1
            }}
            animate={{ 
              opacity: 0,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            <div 
              className="w-2 h-2 bg-white rounded-full"
              style={{
                opacity: 1 - (index / trail.length)
              }}
            />
          </motion.div>
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
              y: sparkle.y - 40,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 180
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 1.2,
              delay: sparkle.delay,
              ease: "easeOut"
            }}
            style={{
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              borderRadius: '50%',
              filter: `blur(0.3px) drop-shadow(0 0 2px ${sparkle.color})`,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default ChaosCursor; 