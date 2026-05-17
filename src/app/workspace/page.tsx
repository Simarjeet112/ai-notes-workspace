'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorkspaceSidebar from '@components/workspace/Sidebar';

/**
 * WORKSPACE LAYOUT
 * Main productivity interface
 */

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
}

const WorkspaceLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sample note data
  const currentNote: Note = {
    id: '1',
    title: 'Project Kickoff Notes',
    content: 'Key discussion points:\n\n• Define project scope\n• Set timeline\n• Assign responsibilities\n• Plan first sprint',
    createdAt: '2026-05-10',
    updatedAt: '2026-05-17',
    tags: ['work', 'important'],
    isPinned: true,
    isFavorite: true,
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="relative w-full h-screen bg-neutral-950 flex overflow-hidden">
      {/* Sidebar */}
      <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.header
          className="h-16 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-between px-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            {/* Toggle sidebar button */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </motion.button>

            {/* Search bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search notes..."
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 w-64"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">🔍</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Autosave indicator */}
            <motion.div
              className="flex items-center gap-2 text-xs text-neutral-400"
              animate={{ opacity: isSaving ? 1 : 0.6 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: isSaving ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 1, repeat: isSaving ? Infinity : 0 }}
              />
              {isSaving ? 'Saving...' : 'All changes saved'}
            </motion.div>

            {/* User menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold hover:shadow-glow-lg transition-all duration-300"
            >
              JD
            </motion.button>
          </div>
        </motion.header>

        {/* Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Notes List (hidden on mobile) */}
          <motion.div
            className="hidden lg:flex flex-col w-80 border-r border-white/10 bg-neutral-900/50 overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-4 border-b border-white/10">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Notes</h2>
            </div>

            {/* Note items */}
            <div className="p-3 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 cursor-pointer transition-all duration-300"
                >
                  <p className="text-sm font-medium text-white truncate">Note Title {i}</p>
                  <p className="text-xs text-neutral-400 truncate mt-1">Preview text...</p>
                  <p className="text-xs text-neutral-500 mt-2">May {17 - i}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Editor */}
          <motion.div
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Editor Header */}
            <div className="p-6 border-b border-white/10 bg-neutral-950/50">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-3xl font-bold text-white bg-transparent focus:outline-none mb-4 w-full"
                  placeholder="Note title..."
                />
              ) : (
                <h1 className="text-3xl font-bold text-white mb-4">{currentNote.title}</h1>
              )}

              {/* Meta info */}
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span>Created: {currentNote.createdAt}</span>
                <span>Modified: {currentNote.updatedAt}</span>
                <div className="flex gap-2">
                  {currentNote.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full bg-transparent text-neutral-300 text-base leading-relaxed focus:outline-none resize-none"
                  placeholder="Start typing..."
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                    {currentNote.content}
                  </p>
                </div>
              )}
            </div>

            {/* Editor Footer */}
            <motion.div
              className="p-6 border-t border-white/10 bg-neutral-950/50 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    currentNote.isFavorite
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'hover:bg-white/5 text-neutral-400'
                  }`}
                >
                  {currentNote.isFavorite ? '⭐' : '☆'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 transition-all duration-300"
                >
                  📌
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 transition-all duration-300"
                >
                  🔗
                </motion.button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditTitle(currentNote.title);
                      setEditContent(currentNote.content);
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium hover:shadow-glow-lg transition-all duration-300"
                  >
                    Edit
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
