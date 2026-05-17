/**
 * Component: MotionDiv
 * 
 * Wrapper component for common motion.div usage patterns.
 * Applies animation variants with sensible defaults.
 * 
 * Why this wrapper?
 * 1. DRY principle - don't repeat animation setup
 * 2. Consistent animation timing
 * 3. Easy to modify defaults globally
 * 4. Type-safe variant selection
 * 
 * Usage:
 * <MotionDiv variant="slideUp">
 *   Content here
 * </MotionDiv>
 */

import React from 'react';
import { motion, Variants } from 'framer-motion';
import * as animations from '@lib/animations';

type AnimationVariant = keyof typeof animations;

interface MotionDivProps extends React.ComponentProps<typeof motion.div> {
  variant?: AnimationVariant;
  delay?: number;
}

export const MotionDiv: React.FC<MotionDivProps> = ({
  variant = 'fadeIn',
  delay = 0,
  children,
  initial = 'hidden',
  animate = 'visible',
  ...props
}) => {
  const animationVariants = animations[variant] as Variants;

  return (
    <motion.div
      initial={initial}
      animate={animate}
      variants={animationVariants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};
