import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        'syntx-neon': '#00ffc8',
        'syntx-dark': '#0a0a0a',
        tremor: {
          brand: {
            faint: '#00ffc805',
            muted: '#00ffc81a',
            subtle: '#00ffc833',
            DEFAULT: '#00ffc8',
            emphasis: '#00e0b3',
            inverted: '#ffffff',
          },
          background: {
            DEFAULT: '#0a0a0a',
            subtle: '#101010',
          },
          border: {
            DEFAULT: '#222222',
          },
          ring: {
            DEFAULT: '#444444',
          },
          content: {
            DEFAULT: '#cccccc',
            subtle: '#888888',
            emphasis: '#f2f2f2',
            strong: '#ffffff',
            inverted: '#000000',
          },
        },
      },
      boxShadow: {
        'syntx-glow': '0 0 15px rgba(0, 255, 200, 0.5), 0 0 5px rgba(0, 255, 200, 0.2)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tremor/react')],
}
export default config
