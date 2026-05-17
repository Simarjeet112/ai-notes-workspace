'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(
  () => import('@components/effects/HeroScene').then((mod) => mod.default),
  { ssr: false }
);

/**
 * CINEMATIC HERO SECTION
 * 
 * Awwwards-level immersive experience with:
 * - Full-viewport cinematic 3D background
 * - Animated hero text with depth and parallax
 * - Floating glass cards with dynamic hover
 * - Premium motion design and micro-interactions
 * - Layered depth with glassmorphism
 * - Reactive lighting and glow effects
 */

interface MousePosition {
  x: number;
  y: number;
}

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track mouse position for cinematic parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-neutral-950"
    >
      {/* ===== 3D SCENE BACKGROUND ===== */}
      <div className="absolute inset-0 -z-20">
        <HeroScene />
      </div>

      {/* ===== ANIMATED GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Moving gradient fog */}
        <motion.div
          className="absolute w-[150%] h-[150%] bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
          }}
          transition={{ type: 'spring', damping: 30, mass: 1 }}
        />

        {/* Animated vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-950/30" />
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 pt-20"
      >
        {/* ===== CINEMATIC HERO TEXT SECTION ===== */}
        <motion.div
          className="max-w-4xl text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Main heading with depth effect */}
          <motion.div
            animate={{
              y: mousePosition.y * 15,
              x: mousePosition.x * 8,
            }}
            transition={{ type: 'spring', damping: 35, mass: 1 }}
            className="relative"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="relative inline-block">
                {/* Glowing text effect */}
                <motion.span
                  className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 blur-lg"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AI Notes
                </motion.span>

                {/* Main text */}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                  AI Notes
                </span>
              </span>
              <br />
              <motion.span
                className="text-white inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Reimagined
              </motion.span>
            </motion.h1>

            {/* Cinematic glow effect behind text */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-400/20 blur-3xl"
              animate={{
                opacity: isHovering ? 0.8 : 0.5,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Subheading with staggered reveal */}
          <motion.div
            animate={{
              y: mousePosition.y * 10,
              x: mousePosition.x * -5,
            }}
            transition={{ type: 'spring', damping: 40, mass: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the next-generation operating system for your thoughts.
              <br className="hidden sm:block" />
              <motion.span
                className="text-cyan-300 font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                Where AI amplifies your creativity.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons with premium hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 md:px-10 py-3 md:py-4 text-white font-semibold rounded-full overflow-hidden group"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 blur-lg transition-all duration-300"
                animate={{ opacity: isHovering ? 0.5 : 0 }}
              />

              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <motion.span
                  animate={{ x: isHovering ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 md:px-10 py-3 md:py-4 text-cyan-300 font-semibold rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            >
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ===== FLOATING BADGE ===== */}
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="px-6 py-3 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-md"
            whileHover={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(34, 211, 238, 0.5)',
            }}
          >
            <p className="text-sm text-neutral-300 font-medium">
              ✨ Trusted by 10,000+ creators & engineers
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">Scroll</p>
          <svg
            className="w-5 h-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      {/* ===== AMBIENT LIGHT EFFECTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orb glow (synced with 3D scene) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
