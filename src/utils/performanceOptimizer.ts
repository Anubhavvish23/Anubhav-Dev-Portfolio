// Performance optimization utilities for magic mode animations

export const PERFORMANCE_CONFIG = {
  // Animation frequency controls
  MIN_ANIMATION_INTERVAL: 3000, // Minimum time between animations (ms)
  MAX_ANIMATION_INTERVAL: 8000, // Maximum time between animations (ms)
  
  // Movement range limits
  MAX_X_MOVEMENT: 50,
  MAX_Y_MOVEMENT: 25,
  MAX_ROTATION: 20,
  MAX_SCALE_CHANGE: 0.1,
  
  // Particle limits
  MAX_PARTICLES: 8,
  MAX_SPARKLES: 5,
  MAX_TRAIL_POINTS: 6,
  
  // Animation duration limits
  MIN_ANIMATION_DURATION: 1.2,
  MAX_ANIMATION_DURATION: 2.5,
  
  // Throttling
  MOUSE_THROTTLE_DELAY: 16, // ~60fps
  PARTICLE_CREATION_INTERVAL: 800,
};

export const getOptimizedRandom = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getOptimizedAnimationInterval = () => {
  return getOptimizedRandom(
    PERFORMANCE_CONFIG.MIN_ANIMATION_INTERVAL,
    PERFORMANCE_CONFIG.MAX_ANIMATION_INTERVAL
  );
};

export const getOptimizedMovement = () => ({
  x: getOptimizedRandom(-PERFORMANCE_CONFIG.MAX_X_MOVEMENT, PERFORMANCE_CONFIG.MAX_X_MOVEMENT),
  y: getOptimizedRandom(-PERFORMANCE_CONFIG.MAX_Y_MOVEMENT, PERFORMANCE_CONFIG.MAX_Y_MOVEMENT),
  rotate: getOptimizedRandom(-PERFORMANCE_CONFIG.MAX_ROTATION, PERFORMANCE_CONFIG.MAX_ROTATION),
  scale: 1 + getOptimizedRandom(-PERFORMANCE_CONFIG.MAX_SCALE_CHANGE, PERFORMANCE_CONFIG.MAX_SCALE_CHANGE)
});

export const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Check if device is low-end for additional optimizations
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const memory = (navigator as any).deviceMemory;
  const cores = (navigator as any).hardwareConcurrency;
  
  return memory < 4 || cores < 4;
};

// Get optimized settings based on device capabilities
export const getOptimizedSettings = () => {
  const isLowEnd = isLowEndDevice();
  
  return {
    particleCount: isLowEnd ? 4 : PERFORMANCE_CONFIG.MAX_PARTICLES,
    sparkleCount: isLowEnd ? 3 : PERFORMANCE_CONFIG.MAX_SPARKLES,
    trailPoints: isLowEnd ? 4 : PERFORMANCE_CONFIG.MAX_TRAIL_POINTS,
    animationInterval: isLowEnd ? 
      getOptimizedRandom(5000, 10000) : 
      getOptimizedRandom(PERFORMANCE_CONFIG.MIN_ANIMATION_INTERVAL, PERFORMANCE_CONFIG.MAX_ANIMATION_INTERVAL),
    movementRange: isLowEnd ? 0.5 : 1, // Reduce movement by 50% on low-end devices
  };
}; 