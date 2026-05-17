'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated';
  glow?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-white/5 backdrop-blur-md border border-white/10',
  interactive: 'bg-white/8 backdrop-blur-lg border border-white/15 hover:border-white/20',
  elevated: 'bg-white/10 backdrop-blur-xl border border-cyan-400/20',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  return (
    <motion.div
      className={clsx(
        'rounded-2xl p-6 transition-all duration-300',
        variantClasses[variant],
        glow && 'shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40',
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
