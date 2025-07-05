export const colors = {
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
} as const;

export type ColorKey = keyof typeof colors;
