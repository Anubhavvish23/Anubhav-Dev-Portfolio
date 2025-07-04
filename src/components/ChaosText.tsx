import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChaosAnimation } from '../hooks/useChaosAnimation';

interface ChaosTextProps {
  children: React.ReactNode;
  magicMode: boolean;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  id?: string;
  animationType?: 'text' | 'card' | 'progress';
}

const ChaosText: React.FC<ChaosTextProps> = ({
  children,
  magicMode,
  element = 'div',
  className = '',
  id,
  animationType = 'text'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Memoize the elementId to prevent unnecessary re-renders
  const elementId = useMemo(() => id || `chaos-text-${Math.random().toString(36).substr(2, 9)}`, [id]);
  
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

  const MotionComponent = motion[element as keyof typeof motion] as any;

  const baseClasses = className;
  const magicClasses = magicMode ? 'transition-all duration-1500 ease-out chaos-element' : '';

  return (
    <MotionComponent
      ref={elementRef}
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
        duration: magicMode ? 3 : 0.8,
        ease: "easeInOut",
        type: "spring",
        stiffness: magicMode ? 30 : 100,
        damping: magicMode ? 8 : 20
      }}
      style={{
        transformOrigin: "center center",
        willChange: magicMode ? "transform, opacity, filter" : "auto",
        position: magicMode ? "relative" : "static",
        zIndex: magicMode ? 10 : "auto"
      }}
      whileHover={magicMode ? {
        scale: (animationState?.scale || 1) * 1.1,
        rotate: (animationState?.rotate || 0) + 10,
        filter: `blur(${Math.max(0, (animationState?.blur || 0) - 1)}px)`,
        transition: { duration: 0.3 }
      } : {}}
    >
      {children}
    </MotionComponent>
  );
};

export default ChaosText; 