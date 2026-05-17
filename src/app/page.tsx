/**
 * Page: Landing / Homepage
 * 
 * This is the hero landing page - the first cinematic experience.
 * 
 * Architecture:
 * 1. Background: Gradient + Spotlight + Particles
 * 2. Navigation: Fixed navbar with glass effect
 * 3. Hero Section: Large typography + CTA
 * 4. Features Preview: Cards showing key capabilities
 * 5. Workspace Preview: 3D representation of the app
 * 
 * Why this structure?
 * - Immediate visual impact (background + hero)
 * - Clear value proposition (features)
 * - Social proof (preview)
 * - Simple CTA (single action focus)
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@components/layout/Navbar';
import { GradientBackground } from '@components/effects/GradientBackground';
import { Spotlight } from '@components/effects/Spotlight';
import { GlassCard } from '@components/ui/GlassCard';
import { Button } from '@components/ui/Button';
import { StaggerContainer } from '@components/animations/StaggerContainer';
import { staggerItem, slideUp } from '@lib/animations';

const features = [
  {
    icon: '✨',
    title: 'AI-Powered Writing',
    description: 'Generate summaries, extract insights, write faster',
  },
  {
    icon: '⚡',
    title: 'Instant Search',
    description: 'Find anything in milliseconds with fuzzy matching',
  },
  {
    icon: '🎯',
    title: 'Smart Organization',
    description: 'Auto-categorize notes with intelligent tagging',
  },
  {
    icon: '🔗',
    title: 'Share & Collaborate',
    description: 'Beautiful public pages, real-time sharing',
  },
];

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background System */}
      <GradientBackground />
      <Spotlight color="#0ea5e9" intensity={0.4} />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Animated grid background */}
          <svg className="w-full h-full" style={{ opacity: 0.1 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                AI Notes
              </span>
              <br />
              Reimagined
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the next-generation operating system for your thoughts. 
            Where AI doesn't just assist—it amplifies your creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button variant="primary" size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" className="px-8">
              View Demo
            </Button>
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-12"
          >
            <GlassCard variant="interactive" className="inline-block">
              <p className="text-sm text-neutral-300">
                ✨ Trusted by 10,000+ creators & engineers
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Supercharged by AI
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Tools that understand you. Features that scale with your needs.
            </p>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={staggerItem}>
                  <GlassCard
                    variant="interactive"
                    className="h-full hover:border-primary-500/50 transition-colors"
                  >
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-neutral-400">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <GlassCard variant="elevated" glow className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your note-taking?
              </h2>
              <p className="text-neutral-300 mb-8 text-lg">
                Join thousands of creators using AI Notes to capture and
                organize their best ideas.
              </p>
              <Button variant="primary" size="lg">
                Start Your Free Trial →
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
