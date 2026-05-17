/**
 * Component: StaggerContainer
 * 
 * Container that automatically staggeres children animations.
 * Children should be wrapped in motion.div or use MotionDiv.
 * 
 * Why separate component?
 * 1. Cleaner code (no need to repeat container setup)
 * 2. Configurable stagger timing
 * 3. Optional delay before stagger starts
 * 
 * Architecture note:
 * Uses Framer Motion's staggerChildren feature.
 * This is efficient because it doesn't create extra elements.
 * 
 * Fixed in this version:
 * - Removed deprecated Variants type for children
 * - Proper React children typing
 * - Safe variant passing to children
 */

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { staggerContainer as staggerVariants } from '@lib/animations';

interface StaggerContainerProps extends React.ComponentProps<typeof motion.div> {
  staggerDelay?: number;
  delayChildren?: number;
  children: React.ReactNode;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  staggerDelay = 0.1,
  delayChildren = 0.2,
  children,
  ...props
}) => {
  const customVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};
