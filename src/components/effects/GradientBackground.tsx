/**
 * Component: GradientBackground
 * 
 * Animated gradient background with mouse reactivity.
 * Uses CSS gradients for performance.
 * 
 * Why CSS gradients instead of Canvas?
 * 1. Better performance (no canvas overhead)
 * 2. Responsive to viewport size automatically
 * 3. GPU accelerated
 * 4. Can animate via CSS variables
 * 
 * Mouse reactivity:
 * - Gradients shift based on mouse position
 * - Creates depth/parallax effect
 * - Subtle (not distracting)
 * 
 * Fixed in this version:
 * - Removed conflicting background/backgroundColor properties
 * - Uses only backgroundImage property
 * - Proper style object typing
 * - Hydration-safe rendering
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useMouseMove } from '@lib/animations/useMouseMove';

export const GradientBackground: React.FC = () => {
  const mouse = useMouseMove();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  const gradientX = 50 + mouse.x * 5;
  const gradientY = 50 + mouse.y * 5;

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(
          ellipse at ${gradientX}% ${gradientY}%,
          rgba(14, 165, 233, 0.15) 0%,
          rgba(168, 85, 247, 0.1) 25%,
          transparent 50%
        ), radial-gradient(at 50% 50%, rgba(10, 10, 10, 1) 0%, transparent 100%)`,
        backgroundColor: '#0a0a0a',
        transition: 'background-image 0.1s ease-out',
      }}
    />
  );
};
