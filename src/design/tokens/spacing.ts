/**
 * Design Token: Spacing System
 * 
 * Architecture Decision:
 * We use a 4px grid system following Apple's design discipline.
 * This ensures perfect alignment, predictable layouts, and scalability.
 * 
 * Why 4px grid?
 * 1. Divisible by 2, 4, 8 - flexible for responsive design
 * 2. Matches device pixel ratios at various scales
 * 3. Creates predictable rhythm and harmony
 * 4. Easier to scale (4px -> 8px -> 16px -> 32px etc.)
 * 
 * Naming convention:
 * - xs: 4px (smallest gap, between elements)
 * - sm: 8px (small internal padding)
 * - md: 16px (standard padding/margin)
 * - lg: 24px (larger sections)
 * - xl: 32px (major section spacing)
 * - 2xl: 48px (page-level spacing)
 * - 3xl: 64px (large component spacing)
 */

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
};

export const spacingValue = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

export type SpacingToken = keyof typeof spacing;
