/**
 * Cinematic 3D Scene Architecture
 * 
 * This system creates immersive 3D backgrounds with:
 * - Floating AI orbs with animated rings
 * - Holographic glass cards
 * - Volumetric lighting effects
 * - Ambient particles
 * - Cinematic camera movement
 * 
 * Why Three.js for the hero?
 * 1. GPU-accelerated rendering for smooth 60fps
 * 2. Native 3D perspective impossible with CSS alone
 * 3. Can layer with DOM elements (DOM on top of Three.js canvas)
 * 4. Professional "wow" factor that matches premium products
 * 
 * Performance strategy:
 * - Lazy load Three.js scene only when in viewport
 * - Use InstancedBufferGeometry for particles
 * - Optimize shader complexity
 * - Use LOD (level of detail) techniques
 */

'use client';

import React, { Suspense, lazy } from 'react';

// Lazy load Three.js scene to avoid blocking initial render
const HeroScene = lazy(() => import('./HeroScene'));

export const CinematicHero: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-neutral-950" />}>
        <HeroScene />
      </Suspense>

      {/* Content overlay (rendered on top of canvas) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Content will be passed as children */}
      </div>
    </div>
  );
};
