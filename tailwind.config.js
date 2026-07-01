/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Micro-Credentials / Badges palette: trust blue + achievement gold
        primary: {
          DEFAULT: '#0369A1',
          light: '#0EA5E9',
          dark: '#075985',
        },
        gold: {
          DEFAULT: '#A16207',
          light: '#CA8A04',
          soft: '#FEF3C7',
        },
        ink: '#0C4A6E', // foreground text
        surface: '#F0F9FF', // page background
        edge: '#BAE6FD', // card border
        muted: {
          DEFAULT: '#E7EFF5',
          fg: '#64748B',
        },
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(3, 105, 161, 0.08), 0 2px 4px -2px rgba(3, 105, 161, 0.06)',
        'card-hover': '0 12px 20px -6px rgba(3, 105, 161, 0.18)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
