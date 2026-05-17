/**
 * Component: Navbar
 * 
 * Fixed navigation bar with cinematic animations.
 * 
 * Design decisions:
 * - Fixed positioning (always accessible)
 * - Glassmorphism background
 * - Minimal interactive elements
 * - Smooth slide-down entrance animation
 * 
 * Why glassmorphism?
 * - Implies the navbar "floats" above content
 * - Premium, modern aesthetic
 * - Doesn't fully block content below
 */

import React from 'react';
import { motion } from 'framer-motion';
import { slideDown } from '@lib/animations';
import { GlassCard } from '@components/ui/GlassCard';
import { Button } from '@components/ui/Button';
import { clsx } from 'clsx';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <GlassCard variant="default" className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-neutral-100">Notes</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Docs'].map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Start Free
            </Button>
          </motion.div>
        </GlassCard>
      </div>
    </motion.nav>
  );
};
