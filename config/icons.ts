import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const icons = {
  // Navigation
  home: 'home' as const,
  history: 'time' as const,
  settings: 'settings' as const,
  reminders: 'notifications' as const,

  // Water & Hydration
  water: 'water' as const,
  add: 'add' as const,
  remove: 'remove' as const,

  // Actions
  edit: 'create' as const,
  delete: 'trash' as const,
  close: 'close' as const,
  check: 'checkmark' as const,

  // Status
  success: 'checkmark-circle' as const,
  warning: 'warning' as const,
  error: 'close-circle' as const,
  info: 'information-circle' as const,

  // UI
  chevronRight: 'chevron-forward' as const,
  chevronLeft: 'chevron-back' as const,
  chevronUp: 'chevron-up' as const,
  chevronDown: 'chevron-down' as const,

  // Time
  time: 'time' as const,
  calendar: 'calendar' as const,
  clock: 'time-outline' as const,

  // Settings
  notifications: 'notifications' as const,
  bell: 'notifications-outline' as const,
  gear: 'settings-outline' as const,
} as const;

export type IconName = keyof typeof icons;

// Icon component helper
export const getIcon = (name: IconName, size: number = 24, color: string = '#000') => {
  return React.createElement(Ionicons, { name: icons[name], size, color });
};
