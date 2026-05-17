/**
 * Hook: useScrollAnimation
 * 
 * Creates animations based on scroll position.
 * Uses Intersection Observer for performance.
 * 
 * Why Intersection Observer?
 * - Doesn't fire on every scroll event (better performance)
 * - Automatically detects when elements are visible
 * - Native browser API (no manual scroll listening needed)
 * 
 * Usage:
 * const { ref, controls } = useScrollAnimation();
 * <motion.div ref={ref} animate={controls} />
 */

import { useEffect, useRef } from 'react';
import { useAnimation } from 'framer-motion';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          // Optionally unobserve after triggering animation
          observer.unobserve(entry.target);
        }
      },
      {
        margin: '0px 0px -100px 0px', // Trigger before element fully visible
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return { ref, controls };
};
