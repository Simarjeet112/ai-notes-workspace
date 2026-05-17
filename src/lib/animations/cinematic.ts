/**
 * Advanced Motion Hooks
 * Cinematic interaction and animation utilities
 */

import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * useParallax
 * Creates parallax effect based on scroll position
 */
export const useParallax = (offset: number = 50) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    y: scrollY * (offset / 100),
    style: {
      transform: `translateY(${scrollY * (offset / 100)}px)`,
    },
  };
};

/**
 * useDepthScroll
 * Creates depth-based layering as user scrolls
 */
export const useDepthScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollTop / docHeight;
      setScrollProgress(scrolled);
      setMaxScroll(docHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    progress: scrollProgress,
    scale: 0.8 + scrollProgress * 0.2,
    opacity: Math.max(0, 1 - scrollProgress * 1.5),
  };
};

/**
 * useMagneticButton
 * Creates magnetic/gravity effect on buttons
 */
export const useMagneticButton = (strength: number = 20) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < strength) {
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const pull = strength - distance;

      x.set(Math.cos(angle) * pull * 0.5);
      y.set(Math.sin(angle) * pull * 0.5);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { ref, x, y };
};

/**
 * useInView
 * Triggers animation when element comes into view
 */
export const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { margin: '-100px', ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};
