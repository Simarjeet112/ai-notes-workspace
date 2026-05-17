'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * PUBLIC SHARE PAGE
 * Beautiful read-only note presentation
 */

interface SharedNote {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  tags: string[];
  viewCount: number;
  shareLink: string;
}

const PublicSharePage: React.FC = () => {
  const sharedNote: SharedNote = {
    id: 'share-abc123',
    title: 'The Future of AI in Creative Work',
    content: `## Introduction

Artificial Intelligence is fundamentally transforming how we approach creative work. From writing to design, music to code, AI tools are becoming increasingly sophisticated and accessible.

## Key Insights

### 1. Augmentation, Not Replacement
The most successful AI implementations in creative fields are those that augment human creativity rather than replace it. The best results come from human-AI collaboration.

### 2. Speed and Iteration
AI enables creators to iterate faster, explore more ideas, and refine their work with unprecedented speed. This democratizes creativity and lowers barriers to entry.

### 3. New Possibilities
We're seeing entirely new forms of creative expression emerge. Generative art, AI-assisted music, and collaborative storytelling are just the beginning.

## The Path Forward

The future belongs to those who can effectively collaborate with AI tools while maintaining their unique creative voice. The human element—intuition, emotion, originality—remains irreplaceable.

---

*This note was created on May 17, 2026 as part of ongoing research into AI and creative industries.*`,
    author: 'John Doe',
    authorAvatar: 'JD',
    createdAt: '2026-05-17',
    tags: ['AI', 'creativity', 'technology', 'future'],
    viewCount: 2847,
    shareLink: 'https://ainotes.app/share/abc123',
  };

  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedNote.shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative w-full min-h-screen bg-neutral-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-white font-semibold">AI Notes</span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium hover:shadow-glow-lg transition-all duration-300"
          >
            Create Your Own
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Note Container */}
        <motion.article
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {sharedNote.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                  {sharedNote.authorAvatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{sharedNote.author}</p>
                  <p className="text-xs text-neutral-500">{sharedNote.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:ml-auto text-sm text-neutral-400">
                <motion.span
                  className="flex items-center gap-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👁️ {sharedNote.viewCount.toLocaleString()} views
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {sharedNote.tags.map((tag, index) => (
              <motion.a
                key={tag}
                href={`#tag-${tag}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
              >
                #{tag}
              </motion.a>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              {sharedNote.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-cyan-300 mt-6 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return (
                    <div key={i} className="my-8 border-t border-white/10" />
                  );
                }
                if (paragraph.startsWith('*')) {
                  return (
                    <p key={i} className="text-neutral-400 italic">
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p key={i}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Share this note</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Copy link */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                {copied ? '✓ Link copied!' : '🔗 Copy link'}
              </motion.button>

              {/* Share buttons */}
              {['Twitter', 'LinkedIn', 'Email'].map((platform) => (
                <motion.button
                  key={platform}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  {platform === 'Twitter' ? '𝕏' : platform === 'LinkedIn' ? 'in' : '✉️'} {platform}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            className="text-center py-12 border-t border-white/10 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Create your own beautiful notes</h3>
            <p className="text-neutral-400 mb-6 max-w-md mx-auto">
              Join thousands of creators using AI Notes to capture, organize, and share their ideas.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:shadow-glow-lg transition-all duration-300"
            >
              Start Free Trial →
            </motion.button>
          </motion.div>
        </motion.article>
      </div>

      {/* Footer */}
      <motion.footer
        className="border-t border-white/10 bg-neutral-950/80 backdrop-blur-xl mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>by AI Notes</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </main>
  );
};

export default PublicSharePage;
