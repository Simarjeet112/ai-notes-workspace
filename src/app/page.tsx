'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@components/layout/Navbar';
import dynamic from 'next/dynamic';

// Lazy load heavy 3D component
const HeroSection = dynamic(
  () => import('@components/layout/HeroSection'),
  { ssr: false }
);

/**
 * CINEMATIC BENTO SECTION
 * Premium interactive grid with animated cards
 */
interface BentoCardProps {
  index: number;
  title: string;
  description: string;
  icon: string;
  className?: string;
  isLarge?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  index,
  title,
  description,
  icon,
  className = '',
  isLarge = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotationX = ((y - centerY) / rect.height) * 8;
    const rotationY = ((centerX - x) / rect.width) * 8;

    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative group h-full overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Transform Container */}
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          z: isHovered ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
        className="w-full h-full"
      >
        {/* Card Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/5 to-white/2 backdrop-blur-lg border border-white/10 rounded-2xl" />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? '0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)'
              : '0 0 20px rgba(6, 182, 212, 0.1), inset 0 0 10px rgba(34, 211, 238, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated accent border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-transparent"
          animate={{
            borderColor: isHovered ? 'rgba(34, 211, 238, 0.4)' : 'rgba(34, 211, 238, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
          <div>
            <motion.div
              className="text-4xl md:text-5xl mb-4"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-3"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
          </div>

          <motion.p
            className="text-neutral-400 text-sm md:text-base leading-relaxed"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + Math.cos((i / 3) * Math.PI * 2) * 30}%`,
                  y: `${50 + Math.sin((i / 3) * Math.PI * 2) * 30}%`,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

/**
 * CINEMATIC SECTION HEADER
 */
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: '-100px' }}
    className="text-center mb-16 md:mb-20"
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
      {title}
      <motion.span
        className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {subtitle}
      </motion.span>
    </h2>
  </motion.div>
);

/**
 * FEATURES WITH ANIMATED BENTO GRID
 */
const FeaturesSection: React.FC = () => {
  const features: BentoCardProps[] = [
    {
      index: 0,
      icon: '✨',
      title: 'AI-Powered Writing',
      description: 'Generate summaries, extract insights, write faster with intelligent assistance',
      className: 'md:col-span-2',
      isLarge: true,
    },
    {
      index: 1,
      icon: '⚡',
      title: 'Instant Search',
      description: 'Find anything in milliseconds with fuzzy matching and smart indexing',
      className: 'md:col-span-1',
    },
    {
      index: 2,
      icon: '🧠',
      title: 'Smart Organization',
      description: 'Auto-categorize notes with intelligent tagging and structure',
      className: 'md:col-span-1',
    },
    {
      index: 3,
      icon: '🔗',
      title: 'Share & Collaborate',
      description: 'Beautiful public pages and real-time sharing with comments',
      className: 'md:col-span-2',
      isLarge: true,
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 px-4 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(800px at 0% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 80%)',
            'radial-gradient(800px at 100% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 80%)',
            'radial-gradient(800px at 0% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 80%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Supercharged" subtitle="by AI" />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <BentoCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * PREMIUM CTA SECTION
 */
const CTASection: React.FC = () => (
  <section className="relative w-full py-24 md:py-32 px-4 overflow-hidden">
    {/* Animated background glow */}
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{
        background: [
          'radial-gradient(1200px at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 80%)',
          'radial-gradient(1200px at 60% 40%, rgba(14, 165, 233, 0.2) 0%, transparent 80%)',
          'radial-gradient(1200px at 40% 60%, rgba(168, 85, 247, 0.15) 0%, transparent 80%)',
        ],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />

    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Premium card */}
      <motion.div
        className="relative group"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/5 to-white/2 backdrop-blur-lg rounded-3xl" />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: [
              '0 0 40px rgba(14, 165, 233, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.05)',
              '0 0 60px rgba(14, 165, 233, 0.3), inset 0 0 30px rgba(34, 211, 238, 0.1)',
              '0 0 40px rgba(14, 165, 233, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.05)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to transform your note-taking?
          </motion.h2>

          <motion.p
            className="text-neutral-300 mb-10 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of creators using AI Notes to capture and organize their best ideas.
            Start free, no credit card required.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-10 py-4 text-white font-semibold rounded-full overflow-hidden group"
          >
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" />

            {/* Glow on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 blur-lg"
              whileHover={{ opacity: 0.5 }}
            />

            <span className="relative z-10">Start Your Free Trial →</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

/**
 * MAIN PAGE COMPONENT
 */
export default function Home() {
  return (
    <main className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Cinematic Hero Section */}
      <HeroSection />

      {/* Features Section with Bento Grid */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer spacing */}
      <div className="h-12" />
    </main>
  );
}
