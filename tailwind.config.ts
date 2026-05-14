import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          /** Deepest navy — hero base, emphasis */
          950: 'var(--navy-deep)',
          /** Page / section background */
          900: 'var(--background)',
          /** Cards, elevated panels */
          850: 'var(--card)',
          800: 'var(--card)',
          /** Borders, dividers */
          700: 'var(--border)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-soft)',
        },
        cream: 'var(--foreground)',
        beige: 'var(--muted-foreground)',
        whatsapp: '#25d366',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: 'var(--shadow-gold)',
      },
    },
  },
  plugins: [],
} satisfies Config
