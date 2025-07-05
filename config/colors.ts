export const colors = {
  // Brand Colors
  primary: '#0079F1',
  primaryDark: '#0056B3',
  primaryLight: '#4DA3FF',

  // UI Colors
  background: '#f8f9fa',
  surface: '#ffffff',
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
  },

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export type ColorKey = keyof typeof colors;
