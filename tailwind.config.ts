import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './slides.md', './pages/**/*.{vue,md}', './components/**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
