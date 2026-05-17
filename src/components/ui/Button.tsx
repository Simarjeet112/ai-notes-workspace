/**
 * Component: Button
 * 
 * Premium button component with premium interactions.
 * 
 * Design philosophy:
 * - Minimalist (no heavy shadows, simple shapes)
 * - Magnetic (scales on hover, glow effect)
 * - Responsive (proper padding for touch targets)
 * - Accessible (clear focus states)
 * 
 * Why this approach?
 * 1. Smooth, 60fps animations
 * 2. Proper hover states (scale + glow)
 * 3. Pressing feedback (scale down)
 * 4. Dark mode optimized
 * 5. Type-safe sizing and variants
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { buttonTap } from '@lib/animations';
import { motion as motionTokens } from '@design/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: {
    bg: 'bg-gradient-to-r from-primary-500 to-primary-600',
    text: 'text-white',
    hover: 'hover:shadow-glow-md',
  },
  secondary: {
    bg: 'bg-neutral-800 border border-neutral-700',
    text: 'text-neutral-100',
    hover: 'hover:border-neutral-600',
  },
  ghost: {
    bg: 'bg-transparent',
    text: 'text-neutral-200 hover:text-white',
    hover: 'hover:bg-neutral-800/50',
  },
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-medium',
  lg: 'px-8 py-4 text-lg font-semibold',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const style = variantStyles[variant];

  return (
    <motion.button
      variants={buttonTap}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      disabled={disabled || isLoading}
      className={clsx(
        'relative rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        style.bg,
        style.text,
        style.hover,
        className
      )}
      {...props}
    >
      {isLoading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full" />
        </motion.span>
      )}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </motion.button>
  );
};
