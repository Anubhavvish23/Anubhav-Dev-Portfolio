import { useState, useEffect, useCallback, useMemo } from 'react';

interface AnimationState {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  skewX: number;
  skewY: number;
  opacity?: number;
  blur?: number;
}

interface ChaosAnimationConfig {
  textRange: { x: number; y: number; rotate: number; scale: number };
  cardRange: { x: number; y: number; rotate: number; scale: number; skew: number };
  progressRange: { x: number; y: number; scale: number };
  animationSpeed: { min: number; max: number };
  viewportMovement: boolean;
  extremeMode: boolean;
}

const defaultConfig: ChaosAnimationConfig = {
  textRange: { x: 50, y: 30, rotate: 25, scale: 0.2 },
  cardRange: { x: 100, y: 60, rotate: 45, scale: 0.3, skew: 20 },
  progressRange: { x: 40, y: 20, scale: 0.4 },
  animationSpeed: { min: 2000, max: 6000 },
  viewportMovement: true,
  extremeMode: true
};

export const useChaosAnimation = (magicMode: boolean, config: Partial<ChaosAnimationConfig> = {}) => {
  const [animationStates, setAnimationStates] = useState<Map<string, AnimationState>>(new Map());
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });
  
  // Memoize the final config to prevent unnecessary re-renders
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const getRandomValue = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const getRandomDelay = useCallback(() => {
    return getRandomValue(0, 3000);
  }, [getRandomValue]);

  const getRandomDuration = useCallback(() => {
    return getRandomValue(finalConfig.animationSpeed.min, finalConfig.animationSpeed.max);
  }, [getRandomValue, finalConfig.animationSpeed.min, finalConfig.animationSpeed.max]);

  const getRandomViewportPosition = useCallback(() => {
    if (!finalConfig.viewportMovement) return { x: 0, y: 0 };
    
    const margin = 100; // Keep elements within viewport with margin
    return {
      x: getRandomValue(-viewportSize.width / 2 + margin, viewportSize.width / 2 - margin),
      y: getRandomValue(-viewportSize.height / 2 + margin, viewportSize.height / 2 - margin)
    };
  }, [finalConfig.viewportMovement, viewportSize.width, viewportSize.height, getRandomValue]);

  const generateTextAnimation = useCallback((id: string) => {
    const { x, y, rotate, scale } = finalConfig.textRange;
    const viewportPos = getRandomViewportPosition();
    
    return {
      x: viewportPos.x + getRandomValue(-x, x),
      y: viewportPos.y + getRandomValue(-y, y),
      rotate: getRandomValue(-rotate, rotate),
      scale: getRandomValue(1 - scale, 1 + scale),
      skewX: getRandomValue(-10, 10),
      skewY: getRandomValue(-10, 10),
      opacity: finalConfig.extremeMode ? getRandomValue(0.7, 1) : 1,
      blur: finalConfig.extremeMode ? getRandomValue(0, 2) : 0
    };
  }, [finalConfig.textRange, finalConfig.extremeMode, getRandomViewportPosition, getRandomValue]);

  const generateCardAnimation = useCallback((id: string) => {
    const { x, y, rotate, scale, skew } = finalConfig.cardRange;
    const viewportPos = getRandomViewportPosition();
    
    return {
      x: viewportPos.x + getRandomValue(-x, x),
      y: viewportPos.y + getRandomValue(-y, y),
      rotate: getRandomValue(-rotate, rotate),
      scale: getRandomValue(1 - scale, 1 + scale),
      skewX: getRandomValue(-skew, skew),
      skewY: getRandomValue(-skew, skew),
      opacity: finalConfig.extremeMode ? getRandomValue(0.8, 1) : 1,
      blur: finalConfig.extremeMode ? getRandomValue(0, 1) : 0
    };
  }, [finalConfig.cardRange, finalConfig.extremeMode, getRandomViewportPosition, getRandomValue]);

  const generateProgressAnimation = useCallback((id: string) => {
    const { x, y, scale } = finalConfig.progressRange;
    const viewportPos = getRandomViewportPosition();
    
    return {
      x: viewportPos.x + getRandomValue(-x, x),
      y: viewportPos.y + getRandomValue(-y, y),
      rotate: getRandomValue(-20, 20),
      scale: getRandomValue(0.7, 1.3),
      skewX: getRandomValue(-25, 25),
      skewY: getRandomValue(-25, 25),
      opacity: finalConfig.extremeMode ? getRandomValue(0.6, 1) : 1,
      blur: finalConfig.extremeMode ? getRandomValue(0, 3) : 0
    };
  }, [finalConfig.progressRange, finalConfig.extremeMode, getRandomViewportPosition, getRandomValue]);

  // Store animation timers to prevent memory leaks
  const animationTimers = useMemo(() => new Map<string, NodeJS.Timeout>(), []);

  const startAnimation = useCallback((id: string, type: 'text' | 'card' | 'progress') => {
    if (!magicMode) return;

    // Clear any existing animation for this id
    const existingTimer = animationTimers.get(id);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const generateAnimation = type === 'text' ? generateTextAnimation : 
                            type === 'card' ? generateCardAnimation : 
                            generateProgressAnimation;

    const animate = () => {
      const newState = generateAnimation(id);
      setAnimationStates(prev => new Map(prev).set(id, newState));
      
      const duration = getRandomDuration();
      const timer = setTimeout(() => {
        if (magicMode) {
          animate();
        }
      }, duration);
      animationTimers.set(id, timer);
    };

    const delay = getRandomDelay();
    const initialTimer = setTimeout(animate, delay);
    animationTimers.set(id, initialTimer);
  }, [magicMode, generateTextAnimation, generateCardAnimation, generateProgressAnimation, getRandomDuration, getRandomDelay, animationTimers]);

  const stopAnimation = useCallback((id: string) => {
    // Clear the timer
    const timer = animationTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      animationTimers.delete(id);
    }
    
    // Remove from animation states
    setAnimationStates(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, [animationTimers]);

  const resetAllAnimations = useCallback(() => {
    // Clear all timers
    animationTimers.forEach(timer => clearTimeout(timer));
    animationTimers.clear();
    
    // Reset animation states
    setAnimationStates(new Map());
  }, [animationTimers]);

  // Update viewport size on resize
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  // Reset animations when magic mode changes
  useEffect(() => {
    if (!magicMode) {
      resetAllAnimations();
    }
  }, [magicMode, resetAllAnimations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationTimers.forEach(timer => clearTimeout(timer));
      animationTimers.clear();
    };
  }, [animationTimers]);

  return {
    animationStates,
    startAnimation,
    stopAnimation,
    resetAllAnimations,
    getRandomDelay,
    getRandomDuration,
    generateTextAnimation,
    generateCardAnimation,
    generateProgressAnimation,
    viewportSize
  };
}; 