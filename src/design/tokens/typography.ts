/**
 * Design Token: Typography System
 * 
 * Architecture Decision:
 * Two-tier typography stack:
 * 1. Apple system fonts (San Francisco) for UI
 * 2. Fira Code for code/monospace
 * 
 * Why this setup?
 * - Apple fonts are optimized for screen display (hinting, spacing)
 * - San Francisco is the gold standard for modern UI
 * - Fira Code is beautiful for technical content
 * - Fallback stack ensures rendering on all systems
 * 
 * Size hierarchy:
 * - Uses 16px base (standard web convention)
 * - Scales by 1.25x golden ratio
 * - Line heights follow 4px grid
 * - Letter spacing is optical, not mathematical
 */

export const typography = {
  fontFamily: {
    ui: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ],
    mono: [
      '"Fira Code"',
      '"Courier New"',
      'monospace',
    ],
  },

  // Size scale (16px base, 1.25x ratio)
  fontSize: {
    xs: '12px',   // caption, tags
    sm: '14px',   // secondary text
    base: '16px', // body text
    lg: '18px',   // emphasis
    xl: '20px',   // subheading
    '2xl': '24px', // heading
    '3xl': '30px', // large heading
    '4xl': '36px', // major heading
    '5xl': '48px', // hero heading
  },

  // Line heights (follow 4px grid: 16, 20, 24, 28, 32, 36, 40, 52)
  lineHeight: {
    tight: '1.25',    // 16px on 16px text
    normal: '1.5',    // 24px on 16px text
    relaxed: '1.75',  // 28px on 16px text
    loose: '2',       // 32px on 16px text
  },

  // Font weights (only what we need)
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Letter spacing (optical, not mathematical)
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.04em',
  },
};

// Predefined text styles for consistency
export const textStyles = {
  // Headings
  h1: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '52px',
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '40px',
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '36px',
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    letterSpacing: '0em',
  },
  h5: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '0em',
  },

  // Body text
  body: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
  },
  bodySmall: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0em',
  },

  // UI elements
  label: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0em',
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0em',
  },
  code: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0em',
    fontFamily: 'monospace',
  },
};

export type TextStyle = keyof typeof textStyles;
