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
  ],
};

export default config;
