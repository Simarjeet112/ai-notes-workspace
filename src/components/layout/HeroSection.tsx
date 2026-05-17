'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(
  () => import('@components/effects/HeroScene').then((mod) => mod.default),
  { ssr: false }
);

/**
 * PREMIUM HOLOGRAPHIC PANEL
 * Elegant floating UI element with realistic hologram behavior
 */
interface HolographicPanelProps {
  angle: number;
  distance: number;
  delay: number;
  label: string;
  value: string;
  icon: string;
  color: 'cyan' | 'purple' | 'blue';
}

const HolographicPanel: React.FC<HolographicPanelProps> = ({
  angle,
  distance,
  delay,
  label,
  value,
  icon,
  color,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const colorConfig = {
    cyan: {
      bg: 'rgba(6, 182, 212, 0.06)',
      border: 'border-cyan-500/30',
      glow: 'shadow-glow-cyan',
      light: 'rgba(6, 182, 212, 0.2)',
      accent: 'bg-cyan-500/50',
      dot: 'bg-cyan-400',
    },
    purple: {
      bg: 'rgba(168, 85, 247, 0.06)',
      border: 'border-purple-500/30',
      glow: 'shadow-glow-purple',
      light: 'rgba(168, 85, 247, 0.2)',
      accent: 'bg-purple-500/50',
      dot: 'bg-purple-400',
    },
    blue: {
      bg: 'rgba(59, 130, 246, 0.06)',
      border: 'border-blue-500/30',
      glow: 'shadow-glow-lg',
      light: 'rgba(59, 130, 246, 0.2)',
      accent: 'bg-blue-500/50',
      dot: 'bg-blue-400',
    },
  };

  const config = colorConfig[color];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setMousePosition({ x: x / 50, y: y / 50 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate orbit position with cinematic spacing
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance * 0.5;

  return (
    <motion.div
      ref={panelRef}
      className="absolute"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5 + delay * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Premium Holographic Container */}
        <div
          className={`relative w-48 sm:w-56 p-4 sm:p-5 rounded-xl border backdrop-blur-xl overflow-hidden group cursor-pointer transition-all duration-500 ${config.border} ${config.glow} hover:scale-105`}
          style={{
            background: config.bg,
            boxShadow: `0 0 30px ${config.light}, inset 0 0 20px ${config.light}40`,
          }}
        >
          {/* Premium scanlines - subtle glass effect */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.1) 1px, rgba(255, 255, 255, 0.1) 2px)',
            }}
          />

          {/* Holographic flicker effect - subtle */}
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{
              opacity: [0, 0.03, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 4,
            }}
            style={{
              background: `linear-gradient(180deg, ${config.light}, transparent)`,
            }}
          />

          {/* Dynamic border glow animation */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: [
                `inset 0 0 15px ${config.light}20, inset 0 1px 0 ${config.light}40`,
                `inset 0 0 25px ${config.light}40, inset 0 1px 0 ${config.light}60`,
                `inset 0 0 15px ${config.light}20, inset 0 1px 0 ${config.light}40`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Realistic hologram depth layer */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 4 + delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, ${config.light}40, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3">
            {/* Header with indicator */}
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl">{icon}</div>
              <motion.div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${config.dot}`}
                animate={{ 
                  boxShadow: [`0 0 6px currentColor`, `0 0 12px currentColor`, `0 0 6px currentColor`]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Label */}
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
                {label}
              </p>
            </div>

            {/* Value - Premium typography */}
            <div className="font-mono text-base sm:text-lg font-bold text-white">
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.3, duration: 0.6 }}
              >
                {value}
              </motion.span>
            </div>

            {/* Data stream bars - elegant */}
            <div className="flex gap-1.5 pt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-0.5 sm:h-1 flex-1 rounded-full ${config.accent}`}
                  animate={{
                    scaleY: [0.4, 1, 0.4],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * CINEMATIC ATMOSPHERIC LAYERS
 * Realistic depth and environmental particles
 */
const CinematicAtmosphere: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary atmosphere layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-950/0 via-neutral-950/10 to-neutral-900/30"
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Volumetric light rays - cinematic */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-1/3 left-1/2 -translate-x-1/2"
          style={{
            width: '600px',
            height: '800px',
            background: `conic-gradient(from ${i * 120}deg, transparent 0deg, ${i % 2 === 0 ? 'rgba(6, 182, 212, 0.04)' : 'rgba(168, 85, 247, 0.04)'} 90deg, transparent 180deg)`,
            filter: 'blur(100px)',
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 25 + i * 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Cinematic vignette - subtle */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-950/40" />

      {/* Depth fog layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

/**
 * PREMIUM CINEMATIC HERO SECTION
 * Luxury sci-fi movie UI experience
 */
const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const holographicPanels: HolographicPanelProps[] = [
    {
      angle: 0,
      distance: 320,
      delay: 0.1,
      label: 'Intelligence',
      value: '99.8%',
      icon: '⚡',
      color: 'cyan',
    },
    {
      angle: 120,
      distance: 320,
      delay: 0.3,
      label: 'Status',
      value: 'Active',
      icon: '🧠',
      color: 'purple',
    },
    {
      angle: 240,
      distance: 320,
      delay: 0.5,
      label: 'Network',
      value: '10K+',
      icon: '🔗',
      color: 'blue',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-neutral-950"
    >
      {/* ===== 3D SCENE BACKGROUND ===== */}
      <div className="absolute inset-0 -z-20">
        <HeroScene />
      </div>

      {/* ===== CINEMATIC ATMOSPHERIC EFFECTS ===== */}
      <CinematicAtmosphere />

      {/* ===== ANIMATED GRADIENT BACKDROP ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 60% 40%, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
              'radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mouse-reactive gradient shift */}
        <motion.div
          className="absolute w-[150%] h-[150%] bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: 'spring', damping: 30, mass: 1.5 }}
        />
      </div>

      {/* ===== FLOATING HOLOGRAPHIC PANELS ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        {holographicPanels.map((panel, i) => (
          <div key={i} className="pointer-events-auto">
            <HolographicPanel {...panel} />
          </div>
        ))}
      </div>

      {/* ===== MAIN HERO CONTENT ===== */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-16 md:pt-20">
        {/* ===== HERO TEXT SECTION ===== */}
        <motion.div
          className="max-w-4xl text-center space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Main heading with cinematic parallax */}
          <motion.div
            animate={{
              y: mousePosition.y * 12,
              x: mousePosition.x * 6,
            }}
            transition={{ type: 'spring', damping: 35, mass: 1 }}
            className="relative"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="relative inline-block">
                {/* Subtle glow layer */}
                <motion.span
                  className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 blur-lg opacity-0 md:opacity-100"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
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
                className="text-white inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Reimagined
              </motion.span>
            </motion.h1>

            {/* Cinematic glow backdrop */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-blue-400/15 blur-3xl rounded-full"
              animate={{
                opacity: isHovering ? 0.8 : 0.5,
                scale: isHovering ? 1.15 : 1,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Subheading with controlled spacing */}
          <motion.div
            animate={{
              y: mousePosition.y * 8,
              x: mousePosition.x * -4,
            }}
            transition={{ type: 'spring', damping: 40, mass: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the next-generation operating system for your thoughts.
              <br className="hidden sm:block" />
              <motion.span
                className="text-cyan-300 font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }}
              >
                Where AI amplifies your creativity.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Premium styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 sm:px-8 md:px-10 py-3 md:py-4 text-white font-semibold rounded-full overflow-hidden group w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 blur-lg"
                animate={{ opacity: isHovering ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial
                <motion.span
                  animate={{ x: isHovering ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden sm:inline"
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 sm:px-8 md:px-10 py-3 md:py-4 text-cyan-300 font-semibold rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ===== FLOATING BADGE ===== */}
        <motion.div
          className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-md"
            whileHover={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(34, 211, 238, 0.5)',
              scale: 1.05,
            }}
          >
            <p className="text-xs sm:text-sm text-neutral-300 font-medium whitespace-nowrap">
              ✨ Trusted by 10,000+ creators
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Scroll</p>
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

      {/* ===== AMBIENT LIGHT GLOW ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-radial from-blue-500/15 via-cyan-400/8 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
