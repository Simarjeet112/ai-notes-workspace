/**
 * Hook: useMouseMove
 * 
 * Tracks mouse movement for reactive depth effects.
 * Uses requestAnimationFrame for 60fps tracking.
 * 
 * Why requestAnimationFrame?
 * - Syncs with display refresh rate (60fps)
 * - Prevents layout thrashing
 * - Automatic cleanup if not visible
 * 
 * Returns normalized mouse position (-1 to 1) for shader/depth effects
 */

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export const useMouseMove = () => {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        // Normalize mouse position to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;

        setMouse({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return mouse;
};
