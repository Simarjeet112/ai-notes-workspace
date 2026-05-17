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
