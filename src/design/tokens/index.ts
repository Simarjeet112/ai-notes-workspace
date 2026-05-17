/**
 * Design System Tokens - Single Import Point
 * 
 * Re-export all design tokens for easy access throughout the application.
 * This is the source of truth for visual consistency.
 * 
 * Usage:
 * import { colors, spacing, typography, motion } from '@design/tokens';
 */

export { colors } from './colors';
export type { ColorToken } from './colors';

export { spacing, spacingValue } from './spacing';
export type { SpacingToken } from './spacing';

export { typography, textStyles } from './typography';
export type { TextStyle } from './typography';

export { motion } from './motion';
export type { MotionPreset } from './motion';
