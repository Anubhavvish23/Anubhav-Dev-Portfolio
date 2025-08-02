import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Move these outside the component to avoid re-creation on every render
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
  '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
];
const particleTypes = ['sparkle', 'star', 'circle'];

interface MagicParticlesProps {
  magicMode: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'sparkle' | 'star' | 'circle';
  delay: number;
  duration: number;
}

const MagicParticles: React.FC<MagicParticlesProps> = ({ magicMode }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Memoize particle creation function
  const createParticle = useCallback((): Particle => ({
    id: Date.now() + Math.random(),
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 20,
    size: Math.random() * 3 + 2, // Smaller size for better performance
    color: colors[Math.floor(Math.random() * colors.length)],
    type: particleTypes[Math.floor(Math.random() * particleTypes.length)] as any,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1.5 + 2 // Shorter duration
  }), []);

  // Memoize particle removal function
  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    if (!magicMode) {
      setParticles([]);
      return;
    }

    const addParticle = () => {
      if (magicMode && particles.length < 8) { // Limit particle count
        const newParticle = createParticle();
        setParticles(prev => [...prev, newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          removeParticle(newParticle.id);
        }, newParticle.duration * 1000);
      }
    };

    // Create particles less frequently
    const interval = setInterval(addParticle, 800);
    
    // Initial burst of fewer particles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addParticle(), i * 200);
    }

    return () => {
      clearInterval(interval);
    };
  }, [magicMode, createParticle, removeParticle, particles.length]);

  // Memoize particle rendering
  const renderParticle = useCallback((particle: Particle) => {
    const baseProps = {
      key: particle.id,
      className: "fixed pointer-events-none z-[9996]",
      initial: { 
        x: particle.x,
        y: particle.y,
        opacity: 0,
        scale: 0,
        rotate: 0
      },
      animate: { 
        y: -60, // Less travel distance
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        rotate: 180, // Reduced rotation
        x: particle.x + (Math.random() - 0.5) * 40 // Less spread
      },
      exit: { 
        opacity: 0,
        scale: 0
      },
      transition: { 
        duration: particle.duration,
        delay: particle.delay,
        ease: "easeOut"
      },
      style: {
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        filter: `blur(0.3px) drop-shadow(0 0 2px ${particle.color})`
      }
    };

    switch (particle.type) {
      case 'sparkle':
        return (
          <motion.div
            {...baseProps}
            className={`${baseProps.className} rounded-full`}
          />
        );
      case 'star':
        return (
          <motion.div
            {...baseProps}
            className={`${baseProps.className} transform rotate-45`}
            style={{
              ...baseProps.style,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      case 'circle':
        return (
          <motion.div
            {...baseProps}
            className={`${baseProps.className} rounded-full`}
          />
        );
      default:
        return (
          <motion.div
            {...baseProps}
            className={`${baseProps.className} rounded-full`}
          />
        );
    }
  }, []);

  // Don't render if no particles
  if (!magicMode || particles.length === 0) return null;

  return (
    <AnimatePresence>
      {particles.map(renderParticle)}
    </AnimatePresence>
  );
};

export default MagicParticles; 