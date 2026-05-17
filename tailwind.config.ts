import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(14, 165, 233, 0.3)',
        'glow-md': '0 0 16px rgba(14, 165, 233, 0.5)',
        'glow-lg': '0 0 24px rgba(14, 165, 233, 0.7)',
        'glow-xl': '0 0 40px rgba(14, 165, 233, 0.9)',
        'glow-purple': '0 0 24px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 24px rgba(6, 182, 212, 0.5)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'cinematic-glow': 'radial-gradient(800px at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 80%)',
      },
      animation: {
        // Cinematic floating
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-medium': 'float-medium 4s ease-in-out infinite',
        'float-fast': 'float-fast 3s ease-in-out infinite',
        
        // Glow pulses
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-intense': 'pulse-intense 2s ease-in-out infinite',
        
        // Cinematic reveals
        'reveal-up': 'reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-down': 'reveal-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-fade': 'reveal-fade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        
        // Light rays
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'light-ray': 'light-ray 3s ease-in-out infinite',
        
        // Cinematic depth
        'depth-scale': 'depth-scale 3s ease-in-out infinite',
        
        // Atmospheric
        'drift': 'drift 8s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'pulse-intense': {
          '0%, 100%': { opacity: '0.7', boxShadow: '0 0 16px rgba(14, 165, 233, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(14, 165, 233, 0.9)' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'reveal-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'reveal-fade': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'light-ray': {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '0.6', transform: 'scaleY(1.1)' },
        },
        'depth-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(0) translateY(-20px)' },
          '75%': { transform: 'translateX(-10px) translateY(-10px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  safelist: [
    // Ensure critical classes are never purged
    'bg-neutral-950',
    'text-neutral-100',
    'text-white',
    'bg-white/5',
    'bg-white/8',
    'bg-white/10',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    'backdrop-blur-xl',
    'border-white/10',
    'border-white/15',
    'border-cyan-400/20',
    'text-neutral-300',
    'text-neutral-400',
    'hover:text-white',
    'rounded-2xl',
    'rounded-lg',
    'rounded-xl',
    // Animation classes
    'animate-float-slow',
    'animate-float-medium',
    'animate-float-fast',
    'animate-pulse-glow',
    'animate-pulse-intense',
    'animate-reveal-up',
    'animate-reveal-down',
    'animate-reveal-fade',
    'animate-light-ray',
    'animate-depth-scale',
    'animate-drift',
    'animate-rotate-slow',
    // Glow effects
    'shadow-glow-sm',
    'shadow-glow-md',
    'shadow-glow-lg',
    'shadow-glow-xl',
    'shadow-glow-purple',
    'shadow-glow-cyan',
  ],
};

export default config;
