import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Move these outside the component to avoid re-creation on every render
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
  '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
  '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24'
];
const particleTypes = ['sparkle', 'star', 'circle', 'triangle'];

interface MagicParticlesProps {
  magicMode: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'sparkle' | 'star' | 'circle' | 'triangle';
  delay: number;
  duration: number;
}

const MagicParticles: React.FC<MagicParticlesProps> = ({ magicMode }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!magicMode) {
      setParticles([]);
      return;
    }

    const createParticle = (): Particle => ({
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 30, // slightly less for subtler effect
      size: Math.random() * 5 + 3, // smaller size
      color: colors[Math.floor(Math.random() * colors.length)],
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)] as any,
      delay: Math.random() * 1.5, // less delay
      duration: Math.random() * 2.5 + 3 // shorter duration
    });

    const addParticle = () => {
      if (magicMode) {
        const newParticle = createParticle();
        setParticles(prev => [...prev, newParticle]);
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, newParticle.duration * 1000);
      }
    };

    // Create particles periodically (less frequent)
    const interval = setInterval(addParticle, 500);
    // Initial burst of particles (fewer)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addParticle(), i * 120);
    }

    return () => {
      clearInterval(interval);
    };
  }, [magicMode]); // Only depend on magicMode

  const renderParticle = (particle: Particle) => {
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
        y: -80, // less travel for subtler effect
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: 360,
        x: particle.x + (Math.random() - 0.5) * 60 // less spread
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
        filter: `blur(0.5px) drop-shadow(0 0 4px ${particle.color})`
      }
    };

    switch (particle.type) {
      case 'sparkle':
        return (
          <motion.div
            {...baseProps}
            style={{
              ...baseProps.style,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      case 'star':
        return (
          <motion.div
            {...baseProps}
            style={{
              ...baseProps.style,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            {...baseProps}
            style={{
              ...baseProps.style,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        );
      default:
        return <motion.div {...baseProps} style={{ ...baseProps.style, borderRadius: '50%' }} />;
    }
  };

  if (!magicMode) return null;

  return (
    <>
      {/* Background sparkles (fewer, smaller) */}
      <div className="fixed inset-0 pointer-events-none z-[9995]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating orbs (fewer, smaller) */}
      <div className="fixed inset-0 pointer-events-none z-[9994]">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              width: 60 + Math.random() * 80,
              height: 60 + Math.random() * 80,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${colors[i % colors.length]}20, transparent)`
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main animated particles */}
      <AnimatePresence>
        {particles.map(renderParticle)}
      </AnimatePresence>
    </>
  );
};

export default MagicParticles; 