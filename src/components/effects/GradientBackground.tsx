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
    return null;
  }

  const gradientX = 50 + mouse.x * 8;
  const gradientY = 50 + mouse.y * 8;

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        background: `radial-gradient(
          ellipse 800px 600px at ${gradientX}% ${gradientY}%,
          rgba(14, 165, 233, 0.12) 0%,
          rgba(168, 85, 247, 0.08) 25%,
          rgba(10, 10, 10, 0.5) 60%,
          rgba(10, 10, 10, 1) 100%
        )`,
        transition: 'background 0.1s ease-out',
      }}
    />
  );
};
