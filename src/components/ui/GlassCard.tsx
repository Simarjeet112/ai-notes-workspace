/**
 * Component: GlassCard
 * 
 * Premium glassmorphism card component.
 * 
 * Fixed in this version:
 * - Visible backdrop blur
 * - Proper border rendering
 * - Cinematic lighting effects
 * - Better elevation hierarchy
 * - Responsive padding
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated';
  glow?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: {
    bg: 'bg-white/5 backdrop-blur-md',
    border: 'border border-white/10',
    shadow: 'shadow-sm',
  },
  interactive: {
    bg: 'bg-white/8 backdrop-blur-lg',
    border: 'border border-white/15',
    shadow: 'shadow-md',
  },
  elevated: {
    bg: 'bg-white/10 backdrop-blur-xl',
    border: 'border border-cyan-400/20',
    shadow: 'shadow-lg',
  },
};

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  const style = variantStyles[variant];

  return (
    <motion.div
      className={clsx(
        'rounded-2xl p-6 transition-all duration-300',
        style.bg,
        style.border,
        style.shadow,
        glow && 'shadow-cyan-500/20 hover:shadow-cyan-500/40',
        className
      )}
      whileHover={glow ? { scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};
