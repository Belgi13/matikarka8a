import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { poppins: ['var(--font-poppins)', 'sans-serif'] },
      colors: {
        brand: {
          purple: '#6D28D9',
          lavender: '#DDD6FE',
          amber: '#F59E0B',
          success: '#10B981',
          mathbg: '#EFF6FF',
        },
      },
    },
  },
  plugins: [],
}

export default config
