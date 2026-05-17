/**
 * Component: Button
 * 
 * Premium button component with cinematic interactions.
 * 
 * Fixed in this version:
 * - Proper gradient rendering
 * - Visible hover effects
 * - Better visual hierarchy
 * - Improved loading state animation
 * - Responsive sizing
 * - Premium styling
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { buttonTap } from '@lib/animations';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: {
    base: 'bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/50',
    hover: 'hover:shadow-xl hover:shadow-blue-500/60',
  },
  secondary: {
    base: 'bg-neutral-800/50 border border-neutral-700 text-neutral-100 backdrop-blur-sm',
    hover: 'hover:bg-neutral-700/50 hover:border-neutral-600',
  },
  ghost: {
    base: 'text-neutral-300 hover:text-white',
    hover: 'hover:bg-neutral-800/30',
  },
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-6 py-2.5 text-base font-medium rounded-lg',
  lg: 'px-8 py-3.5 text-lg font-semibold rounded-xl',
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
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <motion.button
      variants={buttonTap}
      initial="rest"
      whileHover={disabled ? {} : 'hover'}
      whileTap={disabled ? {} : 'tap'}
      disabled={disabled || isLoading}
      className={clsx(
        'relative font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-neutral-950',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyle,
        variantStyle.base,
        !disabled && variantStyle.hover,
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
      <span className={isLoading ? 'invisible' : 'visible'}>{children}</span>
    </motion.button>
  );
};
