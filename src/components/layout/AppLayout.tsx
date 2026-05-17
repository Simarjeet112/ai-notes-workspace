import React from 'react';
import { motion } from 'framer-motion';

/**
 * REUSABLE LAYOUT WRAPPER
 * Consistent structure for authenticated pages
 */

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
  sidebarOpen = true,
  onSidebarToggle,
}) => {
  return (
    <div className="relative w-full min-h-screen bg-neutral-950 flex overflow-hidden">
      {/* Content renders here */}
      {children}
    </div>
  );
};

export default AppLayout;
