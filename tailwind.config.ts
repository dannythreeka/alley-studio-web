import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        success: 'var(--success)',
        'gray-light': 'var(--gray-light)',
        'gray-dark': 'var(--gray-dark)',
        gray: 'var(--gray)',
      },
      fontFamily: {
        jp: ['var(--font-noto-sans-jp)'],
        tc: ['var(--font-noto-sans-tc)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
