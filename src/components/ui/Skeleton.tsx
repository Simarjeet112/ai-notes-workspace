import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LOADING SKELETON COMPONENT
 * Reusable skeleton loader for content placeholders
 */

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  count = 1,
  circle = false,
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {skeletons.map((i) => (
        <motion.div
          key={i}
          className={`bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}
          style={{ width, height }}
          animate={{
            backgroundPosition: ['0px', '1000px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;
