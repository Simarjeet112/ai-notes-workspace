/**
 * Design Token: Motion/Animation System
 * 
 * Architecture Decision:
 * We define motion as reusable timing functions and durations.
 * This ensures consistency across all animations and helps maintain 60fps.
 * 
 * Easing functions:
 * - easeOut: for elements entering screen (natural deceleration)
 * - easeInOut: for transitions between states
 * - easeIn: for elements leaving screen (natural acceleration)
 * - spring: for playful, energetic interactions
 * 
 * Durations:
 * - fast: 200ms (micro-interactions, hovers)
 * - normal: 300-400ms (standard transitions)
 * - slow: 600-800ms (cinematic, immersive transitions)
 * - verySlow: 1000ms+ (page transitions, large animations)
 * 
 * Why this structure?
 * 1. Prevents excessive animations (max duration = 1200ms)
 * 2. Ensures perceived performance (fast interactions feel responsive)
 * 3. Maintains 60fps (GPU acceleration for transform/opacity only)
 * 4. Creates rhythm and pacing (faster for small things, slower for big things)
 */

export const motion = {
  // Easing functions (Framer Motion array format)
  easing: {
    // Out: slow start, fast end (natural deceleration)
    out: [0.16, 1, 0.3, 1] as const,
    
    // In: fast start, slow end (natural acceleration)  
    in: [0.7, 0, 0.84, 0] as const,
    
    // InOut: slow start and end, fast middle
    inOut: [0.4, 0, 0.2, 1] as const,
    
    // Spring: bouncy, energetic
    spring: [0.175, 0.885, 0.32, 1.275] as const,
  },

  // Duration presets (milliseconds)
  duration: {
    // Fast: for micro-interactions
    fast: 0.2,
    
    // Normal: for most transitions
    normal: 0.3,
    normalSlow: 0.4,
    
    // Slow: for cinematic transitions
    slow: 0.6,
    slower: 0.8,
    
    // Very slow: for page transitions
    verySlow: 1,
    verySlowest: 1.2,
  },

  // Preset combinations for common use cases
  preset: {
    // Quick hover response
    quickHover: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
    
    // Standard transition
    smooth: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
    
    // Cinematic transition
    cinematic: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
    
    // Page navigation
    pageTransition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
    
    // Playful interaction
    playful: {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};

export type MotionPreset = keyof typeof motion.preset;
