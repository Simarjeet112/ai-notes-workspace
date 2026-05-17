'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@components/layout/Navbar';
import { GradientBackground } from '@components/effects/GradientBackground';
import { Spotlight } from '@components/effects/Spotlight';
import { GlassCard } from '@components/ui/GlassCard';
import { Button } from '@components/ui/Button';
import { StaggerContainer } from '@components/animations/StaggerContainer';
import { staggerItem } from '@lib/animations';

const features = [
  {
    icon: '✨',
    title: 'AI-Powered Writing',
    description: 'Generate summaries, extract insights, write faster with intelligent assistance',
  },
  {
    icon: '⚡',
    title: 'Instant Search',
    description: 'Find anything in milliseconds with fuzzy matching and smart indexing',
  },
  {
    icon: '🧠',
    title: 'Smart Organization',
    description: 'Auto-categorize notes with intelligent tagging and structure',
  },
  {
    icon: '🔗',
    title: 'Share & Collaborate',
    description: 'Beautiful public pages and real-time sharing with comments',
  },
];

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-neutral-950">
      {/* Background Effects */}
      <GradientBackground />
      <Spotlight color="#0ea5e9" intensity={0.5} />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 pt-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="w-full h-full opacity-5" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
              AI Notes
            </span>
            <br />
            <span className="text-white">Reimagined</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the next-generation operating system for your thoughts.
            <br className="hidden sm:block" />
            Where AI doesn't just assist—it amplifies your creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              View Demo
            </Button>
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GlassCard variant="interactive" className="inline-block">
              <p className="text-sm text-neutral-300 font-medium">✨ Trusted by 10,000+ creators & engineers</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Supercharged by AI</h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
              Tools that understand you. Features that scale with your needs.
            </p>
          </motion.div>

          <StaggerContainer delayChildren={0.1} staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={staggerItem}>
                  <GlassCard variant="interactive" className="h-full flex flex-col">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed flex-grow">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard variant="elevated" glow className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your note-taking?</h2>
              <p className="text-neutral-300 mb-10 text-lg">
                Join thousands of creators using AI Notes to capture and organize their best ideas.
                Start free, no credit card required.
              </p>
              <Button variant="primary" size="lg">
                Start Your Free Trial →
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-12" />
    </main>
  );
}
