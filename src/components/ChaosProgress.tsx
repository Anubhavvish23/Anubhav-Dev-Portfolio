import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChaosAnimation } from '../hooks/useChaosAnimation';

interface ChaosProgressProps {
  children: React.ReactNode;
  magicMode: boolean;
  className?: string;
  id?: string;
  animationType?: 'text' | 'card' | 'progress';
}

const ChaosProgress: React.FC<ChaosProgressProps> = ({
  children,
  magicMode,
  className = '',
  id,
  animationType = 'progress'
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Memoize the elementId to prevent unnecessary re-renders
  const elementId = useMemo(() => id || `chaos-progress-${Math.random().toString(36).substr(2, 9)}`, [id]);
  
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
  const magicClasses = magicMode ? 'transition-all duration-2500 ease-out chaos-element magic-progress' : '';

  return (
    <motion.div
      ref={progressRef}
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
        duration: magicMode ? 5 : 1.2,
        ease: "easeInOut",
        type: "spring",
        stiffness: magicMode ? 15 : 100,
        damping: magicMode ? 5 : 20
      }}
      style={{
        transformOrigin: "center center",
        willChange: magicMode ? "transform, opacity, filter" : "auto",
        position: magicMode ? "relative" : "static",
        zIndex: magicMode ? 20 : "auto",
        overflow: "visible"
      }}
      whileHover={magicMode ? {
        scale: (animationState?.scale || 1) * 1.2,
        rotate: (animationState?.rotate || 0) + 25,
        skewX: (animationState?.skewX || 0) + 10,
        filter: `blur(${Math.max(0, (animationState?.blur || 0) - 1)}px)`,
        transition: { duration: 0.5 }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default ChaosProgress; 