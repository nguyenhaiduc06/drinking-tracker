export const colors = {
  // Brand Colors - Vibrant & Energetic
  primary: '#FF6B9D', // Cute pink - main brand color
  primaryLight: '#FF8FB1', // Soft pink - hover states
  primaryDark: '#E55A8A', // Deeper pink - active states

  // Accent Colors - Playful & Young
  accent: '#4ECDC4', // Mint green - success/positive
  accentLight: '#6EDDD6', // Light mint - subtle highlights
  accentDark: '#3DB8B0', // Dark mint - emphasis

  // Secondary Colors - Fun & Approachable
  secondary: '#FFD93D', // Sunny yellow - energy & joy
  secondaryLight: '#FFE55C', // Light yellow - highlights
  secondaryDark: '#F4C430', // Dark yellow - emphasis

  // Tertiary Colors - Supportive & Friendly
  tertiary: '#A8E6CF', // Soft mint - backgrounds
  tertiaryLight: '#C8F4E0', // Very light mint - subtle backgrounds
  tertiaryDark: '#8DD4B8', // Dark mint - borders

  // UI Colors - Clean & Modern
  background: '#FEFEFE', // Pure white background
  surface: '#FFFFFF', // Card surfaces
  card: '#F8F9FF', // Soft card backgrounds

  // Text Colors - Readable & Friendly
  text: {
    primary: '#2D3748', // Dark but not harsh
    secondary: '#718096', // Medium gray - secondary text
    tertiary: '#A0AEC0', // Light gray - tertiary text
    inverse: '#FFFFFF', // White text on dark backgrounds
  },

  // Status Colors - Positive & Encouraging
  success: '#48BB78', // Green - achievements
  warning: '#ED8936', // Orange - gentle reminders
  error: '#F56565', // Soft red - errors
  info: '#4299E1', // Blue - information

  // Gradient Colors - Energetic & Dynamic
  gradients: {
    primary: ['#FF6B9D', '#FF8FB1'], // Pink gradient
    accent: ['#4ECDC4', '#6EDDD6'], // Mint gradient
    secondary: ['#FFD93D', '#FFE55C'], // Yellow gradient
    background: ['#FEFEFE', '#F8F9FF'], // Subtle background
  },

  // Neutral Colors - Soft & Approachable
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
} as const;

export type ColorKey = keyof typeof colors;
