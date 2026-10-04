/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        surface: {
          base: '#000000',
          muted: '#ebdbb7',
          raised: '#fffdf8',
          strong: '#e8f0fe',
        },
        text: {
          primary: '#111827',
          secondary: '#111827',
          tertiary: '#4b5563',
          inverse: '#374151',
        },
        border: {
          DEFAULT: '#e5e7eb',
        },
        ink: '#111827',
        paper: '#fffdf8',
        sand: '#ebdbb7',
        bluewash: '#e8f0fe',
        cobalt: '#1d4ed8',
        navy: '#141b2b',
        canvas: '#fbf9f4',
        mist: '#f5f3ee',
        sandline: '#eedeba',
        mutedink: '#45464c',
      },
      boxShadow: {
        hard: '3px 3px 0 0 #111827',
        'hard-blue': '3px 3px 0 0 #1d4ed8',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};
