'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { slideDown } from '@lib/animations';
import { GlassCard } from '@components/ui/GlassCard';
import { Button } from '@components/ui/Button';

export const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
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
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-neutral-100 text-base hidden sm:inline">
              AI Notes
            </span>
          </motion.div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#docs" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">
              Docs
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Start Free
            </Button>
          </div>
        </GlassCard>
      </div>
    </motion.nav>
  );
};
