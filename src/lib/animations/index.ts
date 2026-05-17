/**
 * Animation Primitives - Reusable Motion System
 * 
 * Architecture Decision:
 * We create a centralized animation system that defines how things move.
 * This ensures consistency, makes tweaking easier, and keeps bundle size reasonable.
 * 
 * Why this approach?
 * 1. Single source of truth for motion
 * 2. Easy to adjust timing globally
 * 3. Prevents animation inconsistencies
 * 4. Helps maintain 60fps (GPU-accelerated properties only)
 * 5. Makes the codebase more maintainable
 * 
 * Key principle:
 * ONLY animate these GPU-accelerated properties:
 * - transform (translate, rotate, scale)
 * - opacity
 * Avoid animating: width, height, left, right, padding, margin, etc.
 */

import { Variants } from 'framer-motion';
import { motion } from '@design/tokens';

/**
 * Fade In Animation
 * Used for elements appearing on screen
 * Simple, elegant, performant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motion.duration.normal,
      ease: motion.easing.out,
    },
  },
};

/**
 * Slide Up Animation
 * Elements enter from bottom with fade
 * Creates sense of emergence/appearance
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motion.duration.normal,
      ease: motion.easing.out,
    },
  },
};

/**
 * Slide Down Animation
 * Elements enter from top with fade
 * Used for navbar, headers
 */
export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motion.duration.normal,
      ease: motion.easing.out,
    },
  },
};

/**
 * Scale In Animation
 * Elements grow from center
 * Creates emphasis and presence
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motion.duration.normal,
      ease: motion.easing.out,
    },
  },
};

/**
 * Stagger Container
 * Container for staggered children animations
 * Each child appears after the previous one
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger Item
 * Individual item in staggered sequence
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motion.duration.normal,
      ease: motion.easing.out,
    },
  },
};

/**
 * Float Animation
 * Gentle up-and-down bobbing motion
 * Used for floating UI elements
 */
export const float: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Pulse Animation
 * Gentle opacity pulse
 * Used for loading states, attention
 */
export const pulse: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/**
 * Glow Animation
 * Animated shadow/glow effect
 * Used for CTAs, interactive elements
 */
export const glow: Variants = {
  rest: {
    boxShadow: '0 0 8px rgba(14, 165, 233, 0.3)',
  },
  hover: {
    boxShadow: '0 0 24px rgba(14, 165, 233, 0.6)',
    transition: {
      duration: motion.duration.fast,
      ease: motion.easing.out,
    },
  },
};

/**
 * Page Transition
 * For route changes
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motion.duration.slow,
      ease: motion.easing.out,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: motion.duration.fast,
      ease: motion.easing.in,
    },
  },
};

/**
 * Button Tap Animation
 * For button press feedback
 */
export const buttonTap: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: motion.duration.fast,
      ease: motion.easing.out,
    },
  },
  tap: {
    scale: 0.98,
  },
};
