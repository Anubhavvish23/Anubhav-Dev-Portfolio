import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChaosAnimation } from '../hooks/useChaosAnimation';

interface ChaosCardProps {
  children: React.ReactNode;
  magicMode: boolean;
  className?: string;
  id?: string;
  animationType?: 'text' | 'card' | 'progress';
}

const ChaosCard: React.FC<ChaosCardProps> = ({
  children,
  magicMode,
  className = '',
  id,
  animationType = 'card'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Memoize the elementId to prevent unnecessary re-renders
  const elementId = useMemo(() => id || `chaos-card-${Math.random().toString(36).substr(2, 9)}`, [id]);
  
  const {
    animationStates,
    startAnimation,
    stopAnimation
  } = useChaosAnimation(magicMode);

  const animationState = animationStates.get(elementId);

  // Memoize the animation handlers to prevent infinite re-renders
  const handleStartAnimation = useCallback(() => {
    if (magicMode) {
      startAnimation(elementId, animationType);
    }
  }, [magicMode, elementId, animationType, startAnimation]);

  const handleStopAnimation = useCallback(() => {
    stopAnimation(elementId);
  }, [elementId, stopAnimation]);

  useEffect(() => {
    if (magicMode) {
      handleStartAnimation();
    } else {
      handleStopAnimation();
    }

    return () => {
      handleStopAnimation();
    };
  }, [magicMode, handleStartAnimation, handleStopAnimation]);

  const baseClasses = className;
  const magicClasses = magicMode ? 'transition-all duration-2000 ease-out chaos-element magic-card' : '';

  return (
    <motion.div
      ref={cardRef}
      className={`${baseClasses} ${magicClasses}`}
      animate={magicMode && animationState ? {
        x: animationState.x,
        y: animationState.y,
        rotate: animationState.rotate,
        scale: animationState.scale,
        skewX: animationState.skewX,
        skewY: animationState.skewY,
        opacity: animationState.opacity || 1,
        filter: animationState.blur ? `blur(${animationState.blur}px)` : 'blur(0px)',
      } : {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: magicMode ? 4 : 1,
        ease: "easeInOut",
        type: "spring",
        stiffness: magicMode ? 20 : 100,
        damping: magicMode ? 6 : 20
      }}
      style={{
        transformOrigin: "center center",
        willChange: magicMode ? "transform, opacity, filter" : "auto",
        position: magicMode ? "relative" : "static",
        zIndex: magicMode ? 15 : "auto",
        perspective: magicMode ? "1000px" : "none"
      }}
      whileHover={magicMode ? {
        scale: (animationState?.scale || 1) * 1.15,
        rotate: (animationState?.rotate || 0) + 15,
        skewX: (animationState?.skewX || 0) + 5,
        filter: `blur(${Math.max(0, (animationState?.blur || 0) - 0.5)}px)`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        transition: { duration: 0.4 }
      } : {}}
      whileTap={magicMode ? {
        scale: (animationState?.scale || 1) * 0.95,
        rotate: (animationState?.rotate || 0) - 5,
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default ChaosCard; 