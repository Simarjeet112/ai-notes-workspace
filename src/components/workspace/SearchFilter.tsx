'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SEARCH & FILTER COMPONENT
 * Advanced note discovery with instant search and filtering
 */

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  category: string | null;
  tags: string[];
  sortBy: 'recent' | 'oldest' | 'alphabetical' | 'favorite';
  favoritesOnly: boolean;
}

const SearchFilterComponent: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    category: null,
    tags: [],
    sortBy: 'recent',
    favoritesOnly: false,
  });

  const categories = ['Work', 'Personal', 'Ideas', 'Research', 'Archive'];
  const availableTags = [
    'important',
    'urgent',
    'todo',
    'review',
    'completed',
    'ai',
    'brainstorm',
  ];

  // Sample notes
  const allNotes: Note[] = [
    {
      id: '1',
      title: 'Q2 Strategic Planning',
      content: 'Discuss quarterly goals and objectives...',
      tags: ['work', 'important'],
      category: 'Work',
      createdAt: '2026-05-17',
      updatedAt: '2026-05-17',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'AI Integration Ideas',
      content: 'Brainstorm new AI features...',
      tags: ['ideas', 'ai'],
      category: 'Ideas',
      createdAt: '2026-05-16',
      updatedAt: '2026-05-16',
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Personal Goals 2026',
      content: 'Set objectives for the year...',
      tags: ['personal', 'important'],
      category: 'Personal',
      createdAt: '2026-05-15',
      updatedAt: '2026-05-15',
      isFavorite: true,
    },
    {
      id: '4',
      title: 'Team Meeting Notes',
      content: 'Weekly sync discussion points...',
      tags: ['work', 'review'],
      category: 'Work',
      createdAt: '2026-05-14',
      updatedAt: '2026-05-14',
      isFavorite: false,
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = {
      ...filterState,
      category: filterState.category === category ? null : category,
    };
    setFilterState(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filterState.tags.includes(tag)
      ? filterState.tags.filter((t) => t !== tag)
      : [...filterState.tags, tag];

    const newFilters = { ...filterState, tags: newTags };
    setFilterState(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const newFilters = { ...filterState, sortBy };
    setFilterState(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleFavoritesToggle = () => {
    const newFilters = {
      ...filterState,
      favoritesOnly: !filterState.favoritesOnly,
    };
    setFilterState(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      category: null,
      tags: [],
      sortBy: 'recent',
      favoritesOnly: false,
    };
    setFilterState(emptyFilters);
    setSearchQuery('');
    onSearch?.('');
    onFilterChange?.(emptyFilters);
  };

  const hasActiveFilters = Boolean(
    searchQuery || filterState.category || filterState.tags.length > 0 || filterState.favoritesOnly
  );

  // Filter notes based on current state
  let filteredNotes = allNotes;

  if (searchQuery) {
    filteredNotes = filteredNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterState.category) {
    filteredNotes = filteredNotes.filter((note) => note.category === filterState.category);
  }

  if (filterState.tags.length > 0) {
    filteredNotes = filteredNotes.filter((note) =>
      filterState.tags.some((tag) => note.tags.includes(tag))
    );
  }

  if (filterState.favoritesOnly) {
    filteredNotes = filteredNotes.filter((note) => note.isFavorite);
  }

  // Sort notes
  if (filterState.sortBy === 'recent') {
    filteredNotes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } else if (filterState.sortBy === 'oldest') {
    filteredNotes.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
  } else if (filterState.sortBy === 'alphabetical') {
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search notes, tags, or content..."
            className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">🔍</span>

          {/* Clear button */}
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setSearchQuery('');
                  onSearch?.('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Filter Toggle and Actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between flex-wrap gap-2"
      >
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 font-medium ${
              showFilters || hasActiveFilters
                ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300'
                : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'
            }`}
          >
            <span>⚙️</span>
            Filters
            {hasActiveFilters && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
            )}
          </motion.button>

          {/* Favorites Only Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFavoritesToggle}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 font-medium ${
              filterState.favoritesOnly
                ? 'border-yellow-400/50 bg-yellow-500/10 text-yellow-300'
                : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'
            }`}
          >
            {filterState.favoritesOnly ? '⭐' : '☆'} Favorites
          </motion.button>
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm"
            >
              Clear Filters
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg space-y-6">
              {/* Sort */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {(['recent', 'oldest', 'alphabetical'] as const).map((sort) => (
                    <motion.button
                      key={sort}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSortChange(sort)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 capitalize font-medium ${
                        filterState.sortBy === sort
                          ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      {sort}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 font-medium ${
                        filterState.category === category
                          ? 'border-purple-400/50 bg-purple-500/20 text-purple-300'
                          : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
                        filterState.tags.includes(tag)
                          ? 'border-blue-400/50 bg-blue-500/20 text-blue-300'
                          : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      #{tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-2"
      >
        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
          {filteredNotes.length} result{filteredNotes.length !== 1 ? 's' : ''}
        </p>

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', x: 4 }}
                  className="p-4 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-400/30 cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">{note.title}</h4>
                        {note.isFavorite && <span className="text-yellow-400">⭐</span>}
                      </div>
                      <p className="text-xs text-neutral-400 truncate mb-2">{note.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                      {note.updatedAt}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center border border-white/10 rounded-lg bg-white/5"
              >
                <p className="text-neutral-500">No notes found</p>
                <p className="text-xs text-neutral-600 mt-1">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchFilterComponent;
