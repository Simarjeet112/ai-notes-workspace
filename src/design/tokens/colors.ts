/**
 * Design Token: Color Palette
 * 
 * Architecture Decision:
 * We use a systematic color palette following Apple's design principles:
 * - Primary: Cyberpunk blue (ui focus, CTAs, interactive elements)
 * - Secondary: Neon purple (accents, hover states)
 * - Success: Mint green (confirmations, positive states)
 * - Neutral: Grayscale for text, backgrounds, borders
 * 
 * Why this approach?
 * 1. Dark mode by default (cyberpunk aesthetic)
 * 2. High contrast for accessibility
 * 3. Systematic scaling (50-950) for flexibility
 * 4. Glowing effects use 30-70% opacity for futuristic feel
 * 5. Each color has companion variants for interactive states
 */

export const colors = {
  // Primary - Cyberpunk Blue (main interaction color)
  primary: {
    light: '#e0f2fe',    // 100 - very light backgrounds
    base: '#0ea5e9',     // 500 - main interactive color
    dark: '#0369a1',     // 700 - hover/pressed states
    darker: '#051e3e',   // 950 - text on light backgrounds
  },

  // Accent - Neon Purple (secondary emphasis)
  accent: {
    light: '#e9d5ff',
    base: '#a855f7',
    dark: '#7e22ce',
    darker: '#3f0f5c',
  },

  // Success - Mint Green (positive feedback)
  success: {
    light: '#dcfce7',
    base: '#22c55e',
    dark: '#15803d',
  },

  // Neutral - Grayscale (text, backgrounds, borders)
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',   // near-black for dark mode backgrounds
  },

  // Semantic colors
  bg: {
    primary: '#0a0a0a',     // Main background - deep black
    secondary: '#171717',   // Card backgrounds - slightly lighter
    tertiary: '#262626',    // Nested elements
    overlay: 'rgba(10, 10, 10, 0.8)', // Modal overlays
  },

  text: {
    primary: '#fafafa',     // Primary text - near white
    secondary: '#a3a3a3',   // Secondary text - muted
    tertiary: '#525252',    // Tertiary text - even more muted
    inverted: '#0a0a0a',    // Text on light backgrounds
  },

  border: {
    light: '#262626',       // Subtle borders
    medium: '#404040',      // Medium borders
    strong: '#525252',      // Strong borders
  },

  // Glow colors (for neon effects)
  glow: {
    primary: 'rgba(14, 165, 233, 0.5)',
    accent: 'rgba(168, 85, 247, 0.5)',
    success: 'rgba(34, 197, 94, 0.5)',
  },
};

export type ColorToken = typeof colors;
