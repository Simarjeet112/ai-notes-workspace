/**
 * Component: GlassCard
 * 
 * Reusable glassmorphism card component.
 * Foundation for all card-like UI elements.
 * 
 * Design approach:
 * - Subtle blur (8-12px) for glassmorphic effect
 * - Semi-transparent background (10-20% opacity)
 * - Thin border for definition
 * - Optional glow effect for emphasis
 * 
 * Why glassmorphism?
 * 1. Modern, premium aesthetic
 * 2. Implies depth/layering
 * 3. Suggests transparency/openness (AI is helpful, not hiding)
 * 4. Can be GPU-accelerated efficiently
 * 5. Works beautifully with dark mode
 * 
 * Performance note:
 * - Uses backdrop-filter (GPU accelerated)
 * - Border and shadow don't force layout recalculations
 * - Safe to animate opacity
 */

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { colors } from '@design/tokens';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated';
  glow?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: {
      bg: 'rgba(23, 23, 23, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      blur: 'backdrop-blur-md',
    },
    interactive: {
      bg: 'rgba(23, 23, 23, 0.5)',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      blur: 'backdrop-blur-lg',
    },
    elevated: {
      bg: 'rgba(23, 23, 23, 0.6)',
      border: '1px solid rgba(14, 165, 233, 0.3)',
      blur: 'backdrop-blur-xl',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      className={clsx(
        'rounded-xl p-6 transition-shadow duration-300',
        style.blur,
        glow && 'shadow-glow-md hover:shadow-glow-lg',
        className
      )}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        borderWidth: '1px',
      }}
      whileHover={glow ? { boxShadow: '0 0 24px rgba(14, 165, 233, 0.6)' } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};
