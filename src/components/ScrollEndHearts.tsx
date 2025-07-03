import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollEndHearts: React.FC = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, direction: {x: number, y: number}, type: string}>>([]);

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
        setParticles(newParticles);
        
        // Remove particles after 6 seconds
        setTimeout(() => {
          setParticles([]);
          setShowCongrats(false);
        }, 3000);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slower light blue star on mouse hover
  useEffect(() => {
    let lastStarTime = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      // Only create star every 300ms to slow down the effect
      if (now - lastStarTime > 300) {
        const id = Date.now() + Math.random();
        setStars(prev => [...prev, {id, x: e.clientX, y: e.clientY}]);
        setTimeout(() => {
          setStars(prev => prev.filter(star => star.id !== id));
        }, 1500);
        lastStarTime = now;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Animate particles movement
  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: particle.x + particle.direction.x,
          y: particle.y + particle.direction.y
        })));
      }, 100); // Slower movement
      return () => clearInterval(interval);
    }
  }, [particles]);

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

      {/* Floating particles */}
      {particles.map(particle => (
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

      {/* Slower light blue star on mouse hover */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="fixed z-[9999] pointer-events-none select-none"
          style={{ 
            left: star.x, 
            top: star.y, 
            fontSize: 18, 
            color: '#1E90FF' // Hollow blue color (DodgerBlue)
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [1.2, 1, 0.3], opacity: [1, 0.8, 0] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          ⭐
        </motion.div>
      ))}
    </>
  );
};

export default ScrollEndHearts; 