'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WorkspaceSidebar from '@components/workspace/Sidebar';

/**
 * DASHBOARD PAGE
 * Analytics and productivity insights
 */

interface AnalyticsCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: 'cyan' | 'purple' | 'blue' | 'green';
}

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const analyticsCards: AnalyticsCard[] = [
    {
      title: 'Total Notes',
      value: '247',
      change: 12,
      icon: '📝',
      color: 'cyan',
    },
    {
      title: 'This Week',
      value: '18',
      change: 5,
      icon: '📊',
      color: 'purple',
    },
    {
      title: 'AI Usage',
      value: '85%',
      change: 3,
      icon: '⚡',
      color: 'blue',
    },
    {
      title: 'Productivity',
      value: '94%',
      change: 8,
      icon: '🚀',
      color: 'green',
    },
  ];

  const colorMap = {
    cyan: {
      bg: 'from-cyan-500/10 to-cyan-400/5',
      border: 'border-cyan-400/20',
      text: 'text-cyan-300',
      icon: 'bg-cyan-500/20',
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-400/5',
      border: 'border-purple-400/20',
      text: 'text-purple-300',
      icon: 'bg-purple-500/20',
    },
    blue: {
      bg: 'from-blue-500/10 to-blue-400/5',
      border: 'border-blue-400/20',
      text: 'text-blue-300',
      icon: 'bg-blue-500/20',
    },
    green: {
      bg: 'from-green-500/10 to-green-400/5',
      border: 'border-green-400/20',
      text: 'text-green-300',
      icon: 'bg-green-500/20',
    },
  };

  const recentActivity = [
    {
      id: 1,
      action: 'Created note',
      title: 'Q2 Strategy Planning',
      time: '2 hours ago',
      icon: '✨',
    },
    {
      id: 2,
      action: 'Edited note',
      title: 'Team Meeting Notes',
      time: '5 hours ago',
      icon: '✏️',
    },
    {
      id: 3,
      action: 'Shared note',
      title: 'Project Roadmap',
      time: '1 day ago',
      icon: '🔗',
    },
    {
      id: 4,
      action: 'Archived note',
      title: 'Old Meeting Minutes',
      time: '2 days ago',
      icon: '📦',
    },
  ];

  const topTags = [
    { name: 'work', count: 45, color: 'cyan' },
    { name: 'important', count: 32, color: 'purple' },
    { name: 'ideas', count: 28, color: 'blue' },
    { name: 'personal', count: 22, color: 'green' },
    { name: 'research', count: 18, color: 'cyan' },
    { name: 'todo', count: 15, color: 'purple' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 flex overflow-hidden">
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
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold hover:shadow-glow-lg transition-all duration-300"
          >
            JD
          </motion.button>
        </motion.header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, John</h2>
            <p className="text-neutral-400">Here's what's happening with your notes today.</p>
          </motion.div>

          {/* Analytics Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {analyticsCards.map((card) => {
              const config = colorMap[card.color];
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative p-6 rounded-xl border ${config.border} bg-gradient-to-br ${config.bg} backdrop-blur-lg overflow-hidden group cursor-pointer transition-all duration-300`}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0"
                    animate={{
                      boxShadow: [
                        `inset 0 0 15px rgba(255, 255, 255, 0)`,
                        `inset 0 0 30px rgba(255, 255, 255, 0.05)`,
                        `inset 0 0 15px rgba(255, 255, 255, 0)`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-neutral-400">{card.title}</p>
                      <motion.div
                        className={`p-2 rounded-lg ${config.icon}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-lg">{card.icon}</span>
                      </motion.div>
                    </div>

                    <div className="flex items-end justify-between">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-3xl font-bold text-white">{card.value}</p>
                      </motion.div>

                      <motion.div
                        className={`text-sm font-semibold ${config.text}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span>+{card.change}%</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Recent Activity */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg"
            >
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-xl mt-1">{activity.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {activity.action}:{' '}
                            <span className="text-cyan-300">{activity.title}</span>
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="text-neutral-500 hover:text-white transition-colors"
                      >
                        →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Tags */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg"
            >
              <h3 className="text-lg font-bold text-white mb-4">Top Tags</h3>

              <div className="space-y-2">
                {topTags.map((tag) => {
                  const config = colorMap[tag.color as keyof typeof colorMap];
                  return (
                    <motion.div
                      key={tag.name}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${config.icon}`} />
                        <span className="text-sm text-neutral-300 capitalize">{tag.name}</span>
                      </div>
                      <motion.span
                        className={`text-sm font-semibold ${config.text}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.1 * tag.count }}
                      >
                        {tag.count}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bars */}
              <div className="mt-6 space-y-3">
                {topTags.slice(0, 3).map((tag) => {
                  const config = colorMap[tag.color as keyof typeof colorMap];
                  const percentage = (tag.count / 45) * 100;
                  return (
                    <div key={`progress-${tag.name}`}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-neutral-400 capitalize">{tag.name}</span>
                        <span className="text-xs text-neutral-500">{percentage.toFixed(0)}%</span>
                      </div>
                      <motion.div
                        className="h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden"
                      >
                        <motion.div
                          className={`h-full ${config.icon}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
