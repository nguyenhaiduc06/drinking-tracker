/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand Color
        primary: '#FF6B9D',
        // Pastel Palette
        pastelPink: '#FF7479',
        pastelBlue: '#55B7FF',
        pastelPurple: '#9090ED',
        pastelLavender: '#CF89DC',
        pastelGreen: '#3EBF9E',
        pastelLime: '#81D444',
        pastelRose: '#FF93A5',
        pastelOrange: '#FF956C',
        // Text Colors
        text: {
          primary: '#2D3748',
          secondary: '#718096',
          tertiary: '#A0AEC0',
          inverse: '#FFFFFF',
        },
        // Background Colors
        background: '#FEFEFE',
        surface: '#FFFFFF',
        card: '#F8F9FF',
      },
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui'],
        quicksand: ['Quicksand', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
        '2xl': '32px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
    },
  },
  plugins: [],
};
