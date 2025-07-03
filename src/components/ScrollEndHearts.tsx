import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ScrollEndHearts: React.FC = () => {
  const { isDark } = useTheme();
  const [showCongrats, setShowCongrats] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rings, setRings] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [endParticles, setEndParticles] = useState<Array<{id: number, x: number, y: number, direction: {x: number, y: number}, type: string}>>([]);

  // Show particles and message when scrolled to end
  useEffect(() => {
    const onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        setShowCongrats(true);
        // Create random floating particles
        const particleTypes = ['✨', '🌟', '💫', '⭐', '🎉'];
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          direction: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          },
          type: particleTypes[Math.floor(Math.random() * particleTypes.length)]
        }));
        setEndParticles(newParticles);
        
        // Remove particles after 6 seconds
        setTimeout(() => {
          setEndParticles([]);
          setShowCongrats(false);
        }, 3000); // Faster - reduced from 6000ms to 3000ms
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Modern mouse hover effects
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create expanding rings
      if (Math.random() < 0.4) {
        const id = Date.now() + Math.random();
        const size = Math.random() * 100 + 50;
        setRings(prev => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY, size }]);
        setTimeout(() => {
          setRings(prev => prev.filter(ring => ring.id !== id));
        }, 1500);
      }
      
      // Create sparkles
      if (Math.random() < 0.6) {
        const id = Date.now() + Math.random();
        const delay = Math.random() * 0.5;
        setSparkles(prev => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY, delay }]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
        }, 1000);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Animate end particles movement
  useEffect(() => {
    if (endParticles.length > 0) {
      const interval = setInterval(() => {
        setEndParticles(prev => prev.map(particle => ({
          ...particle,
          x: particle.x + particle.direction.x,
          y: particle.y + particle.direction.y
        })));
      }, 100); // Slower movement
      return () => clearInterval(interval);
    }
  }, [endParticles]);

  return (
    <>
      {/* Particles and Congratulations at end of scroll */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-4xl font-bold text-pink-500 mb-4 drop-shadow-lg">Congratulations!</div>
            <div className="text-lg text-slate-800 dark:text-white mb-2">You have reached the end 🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic cursor effect */}
      <motion.div
        className="fixed z-[9998] pointer-events-none"
        style={{ left: mousePosition.x, top: mousePosition.y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-2 h-2 rounded-full ${
          isDark ? 'bg-white/30' : 'bg-black/30'
        }`} />
      </motion.div>

      {/* Expanding rings */}
      {rings.map((ring) => (
        <motion.div
          key={ring.id}
          className="fixed z-[9997] pointer-events-none"
          style={{ 
            left: ring.x - ring.size / 2, 
            top: ring.y - ring.size / 2,
            width: ring.size,
            height: ring.size
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: 1, 
            opacity: 0,
            rotate: 360
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className={`w-full h-full rounded-full border-2 ${
            isDark ? 'border-white/40' : 'border-black/40'
          }`} />
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed z-[9999] pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -20, -40],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
          }}
          transition={{ 
            duration: 1, 
            delay: sparkle.delay,
            ease: 'easeOut'
          }}
        >
          <div className={`w-1 h-1 rounded-full ${
            isDark ? 'bg-white' : 'bg-black'
          }`} />
        </motion.div>
      ))}

      {/* Floating particles for end of page */}
      {endParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed z-[9998] pointer-events-none text-2xl"
          style={{ 
            left: particle.x, 
            top: particle.y
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0.8], 
            opacity: [0, 1, 0.7],
            rotate: [0, 360]
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {particle.type}
        </motion.div>
      ))}
    </>
  );
};

export default ScrollEndHearts; 