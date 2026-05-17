'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(
  () => import('@components/effects/HeroScene').then((mod) => mod.default),
  { ssr: false }
);

/**
 * FLOATING HOLOGRAPHIC PANEL
 * Premium UI element orbiting the core
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

  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-400/10',
    purple: 'from-purple-500/20 to-purple-400/10',
    blue: 'from-blue-500/20 to-blue-400/10',
  };

  const glowMap = {
    cyan: 'shadow-glow-cyan',
    purple: 'shadow-glow-purple',
    blue: 'shadow-glow-lg',
  };

  const borderMap = {
    cyan: 'border-cyan-400/40',
    purple: 'border-purple-400/40',
    blue: 'border-blue-400/40',
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;

      const rect = panelRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate orbit position
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance * 0.6;

  return (
    <motion.div
      ref={panelRef}
      className="absolute"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
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
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4 + delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Holographic Panel */}
        <div
          className={`relative w-56 p-5 rounded-xl border backdrop-blur-lg overflow-hidden group cursor-pointer transition-all duration-300 ${borderMap[color]} ${glowMap[color]}`}
          style={{
            background: `linear-gradient(135deg, ${color === 'cyan' ? 'rgba(6, 182, 212, 0.08)' : color === 'purple' ? 'rgba(168, 85, 247, 0.08)' : 'rgba(59, 130, 246, 0.08)'}, rgba(30, 30, 46, 0.4))`,
          }}
        >
          {/* Hologram flicker effect */}
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{
              opacity: [0, 0.05, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              background: `linear-gradient(180deg, ${color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : color === 'purple' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`,
            }}
          />

          {/* Scanlines - premium glass effect */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
            }}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              boxShadow: [
                `inset 0 0 20px rgba(${color === 'cyan' ? '6, 182, 212' : color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.2)`,
                `inset 0 0 30px rgba(${color === 'cyan' ? '6, 182, 212' : color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.4)`,
                `inset 0 0 20px rgba(${color === 'cyan' ? '6, 182, 212' : color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.2)`,
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />

          {/* Content */}
          <div className="relative z-10 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="text-2xl">{icon}</div>
              <motion.div
                className={`w-2 h-2 rounded-full ${color === 'cyan' ? 'bg-cyan-400' : color === 'purple' ? 'bg-purple-400' : 'bg-blue-400'}`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Label */}
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-widest">{label}</p>
            </div>

            {/* Value with animated data stream */}
            <div className="font-mono text-lg font-bold text-white">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              >
                {value}
              </motion.span>
            </div>

            {/* Data stream indicator */}
            <div className="flex gap-1 pt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${color === 'cyan' ? 'bg-cyan-500/40' : color === 'purple' ? 'bg-purple-500/40' : 'bg-blue-500/40'}`}
                  animate={{
                    scaleY: [1, 2, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hover effect - light rays */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)',
                `radial-gradient(circle at ${50 + mousePosition.x * 0.01}% ${50 + mousePosition.y * 0.01}%, ${color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : color === 'purple' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 80%)`,
              ],
            }}
            transition={{
              duration: 0.3,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * FLOATING ATMOSPHERIC FOG LAYERS
 * Cinematic depth and realism
 */
const AtmosphericFog: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base fog layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950/40"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Volumetric light rays */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '400px',
            height: '800px',
            background: `conic-gradient(from ${i * 120}deg, transparent 0deg, ${i % 2 === 0 ? 'rgba(6, 182, 212, 0.05)' : 'rgba(168, 85, 247, 0.05)'} 60deg, transparent 120deg)`,
            filter: 'blur(80px)',
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-neutral-950/50" />
    </div>
  );
};

/**
 * CINEMATIC HERO SECTION
 * Premium immersive experience with holographic UI
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
      distance: 280,
      delay: 0,
      label: 'Processing',
      value: '99.8%',
      icon: '⚡',
      color: 'cyan',
    },
    {
      angle: 120,
      distance: 280,
      delay: 0.2,
      label: 'Intelligence',
      value: 'Active',
      icon: '🧠',
      color: 'purple',
    },
    {
      angle: 240,
      distance: 280,
      delay: 0.4,
      label: 'Connections',
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

      {/* ===== ATMOSPHERIC EFFECTS ===== */}
      <AtmosphericFog />

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
      </div>

      {/* ===== FLOATING HOLOGRAPHIC PANELS ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {holographicPanels.map((panel, i) => (
          <div key={i} className="pointer-events-auto">
            <HolographicPanel {...panel} />
          </div>
        ))}
      </div>

      {/* ===== MAIN HERO CONTENT ===== */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* ===== CINEMATIC HERO TEXT ===== */}
        <motion.div
          className="max-w-4xl text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Main heading with cinematic depth */}
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

            {/* Cinematic glow effect */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-400/20 blur-3xl"
              animate={{
                opacity: isHovering ? 0.8 : 0.5,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Subheading */}
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

          {/* CTA Buttons */}
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" />
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
        {/* Main orb glow sync */}
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
