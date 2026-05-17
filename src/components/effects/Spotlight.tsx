/**
 * Component: Spotlight
 * 
 * Cinematic spotlight effect that follows mouse.
 * Creates sense of depth and interactivity.
 * 
 * Implementation:
 * - SVG-based (lightweight, scalable)
 * - Mouse-reactive position
 * - Feathered edges for smooth falloff
 * - Animated glow
 * 
 * Why SVG instead of Canvas?
 * - No performance overhead
 * - Can be styled with CSS
 * - Integrates with React naturally
 * - Smooth even with multiple spotlights
 */

import React, { useEffect, useState } from 'react';
import { useMouseMove } from '@lib/animations/useMouseMove';

interface SpotlightProps {
  color?: string;
  intensity?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  color = '#0ea5e9',
  intensity = 0.5,
}) => {
  const mouse = useMouseMove();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setPosition({
      x: (mouse.x + 1) * 50,
      y: (mouse.y + 1) * 50,
    });
  }, [mouse]);

  if (!isMounted) {
    return null;
  }

  return (
    <svg
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{
        filter: `drop-shadow(0 0 80px ${color}33)`,
      }}
    >
      <defs>
        <radialGradient id="spotlight-gradient">
          <stop offset="0%" stopColor={color} stopOpacity={intensity * 0.4} />
          <stop offset="50%" stopColor={color} stopOpacity={intensity * 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx={`${position.x}%`}
        cy={`${position.y}%`}
        r="20%"
        fill="url(#spotlight-gradient)"
        style={{
          transition: 'cx 0.1s ease-out, cy 0.1s ease-out',
        }}
      />
    </svg>
  );
};
