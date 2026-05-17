'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * WORKSPACE SIDEBAR
 * Premium navigation for notes workspace
 */

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const WorkspaceSidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('recent');

  const navItems: NavItem[] = [
    { id: 'new-note', label: 'New Note', icon: '✨', href: '/workspace/new' },
    { id: 'search', label: 'Search', icon: '🔍', href: '/workspace/search' },
  ];

  const sections = [
    {
      id: 'recent',
      title: 'Recent',
      icon: '⏱️',
      items: [
        { id: 'note-1', label: 'Project Kickoff Notes', icon: '📝', href: '/workspace/notes/1' },
        { id: 'note-2', label: 'AI Integration Ideas', icon: '💡', href: '/workspace/notes/2' },
        { id: 'note-3', label: 'Team Meeting Notes', icon: '👥', href: '/workspace/notes/3' },
      ],
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: '📚',
      items: [
        { id: 'cat-1', label: 'Work', icon: '💼', href: '/workspace/category/work' },
        { id: 'cat-2', label: 'Personal', icon: '🎯', href: '/workspace/category/personal' },
        { id: 'cat-3', label: 'Ideas', icon: '🚀', href: '/workspace/category/ideas' },
      ],
    },
    {
      id: 'tags',
      title: 'Tags',
      icon: '🏷️',
      items: [
        { id: 'tag-1', label: 'Important', icon: '⭐', href: '/workspace/tag/important' },
        { id: 'tag-2', label: 'In Progress', icon: '🔄', href: '/workspace/tag/inprogress' },
        { id: 'tag-3', label: 'Archived', icon: '📦', href: '/workspace/tag/archived' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      x: -280,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-r border-white/10 backdrop-blur-xl z-40 flex flex-col overflow-y-auto scrollbar-hide"
          >
            {/* Header */}
            <motion.div
              className="sticky top-0 p-6 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">AI Notes</p>
                    <p className="text-xs text-neutral-400">Workspace</p>
                  </div>
                </div>
                {/* Close button for mobile */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>

            {/* Main Navigation */}
            <div className="p-4 space-y-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <motion.span
                          className="ml-auto bg-cyan-500/30 text-cyan-300 text-xs px-2 py-1 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Sections */}
            <div className="flex-1 px-4 py-2 space-y-2">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="space-y-1"
                >
                  {/* Section header */}
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )
                    }
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="text-base">{section.icon}</span>
                    <span className="text-sm font-semibold flex-1 text-left">
                      {section.title}
                    </span>
                    <motion.span
                      animate={{
                        rotate: expandedSection === section.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  </motion.button>

                  {/* Section items */}
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-1 overflow-hidden"
                      >
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.id}
                            custom={itemIndex}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link href={item.href}>
                              <motion.div
                                whileHover={{
                                  x: 4,
                                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer text-sm ml-2"
                              >
                                <span className="text-base">{item.icon}</span>
                                <span className="truncate">{item.label}</span>
                              </motion.div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              className="sticky bottom-0 p-4 border-t border-white/10 bg-neutral-950/80 backdrop-blur-xl space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Settings */}
              <motion.button
                whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-medium">Settings</span>
              </motion.button>

              {/* User profile */}
              <motion.button
                whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
                <div className="text-left flex-1">
                  <p className="text-xs font-medium text-white">John Doe</p>
                  <p className="text-xs text-neutral-500">Premium</p>
                </div>
              </motion.button>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default WorkspaceSidebar;
