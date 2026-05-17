/**
 * Component: Navbar
 * 
 * Fixed in this version:
 * - Proper layout and alignment
 * - Better visual hierarchy
 * - Improved responsive behavior
 * - Premium styling
 * - Visible interactive elements
 */

'use client';

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
      className={clsx('fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4', className)}
    >
      <div className="max-w-7xl mx-auto">
        <GlassCard variant="default" className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-neutral-100 text-base hidden sm:inline">AI Notes</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Docs'].map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
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
