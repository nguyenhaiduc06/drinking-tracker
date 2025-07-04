import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export interface WaterEntry {
  id: string;
  amount: number; // in ml
  timestamp: number; // Unix timestamp
  date: string; // YYYY-MM-DD format
}

export interface DailyLog {
  date: string; // YYYY-MM-DD format
  entries: WaterEntry[];
  totalAmount: number;
}

export interface WaterLogState {
  entries: WaterEntry[];
  isLoading: boolean;
  isInitialized: boolean;
  // Actions
  addEntry: (amount: number) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  getTodayTotal: () => number;
  getTodayEntries: () => WaterEntry[];
  getDailyLog: (date: string) => DailyLog | null;
  getWeeklyLogs: () => DailyLog[];
  getMonthlyLogs: () => DailyLog[];
  loadStoredData: () => Promise<void>;
  clearAllData: () => Promise<void>;
}

const STORAGE_KEY = 'water_log_entries';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function to group entries by date
const groupEntriesByDate = (entries: WaterEntry[]): Record<string, WaterEntry[]> => {
  return entries.reduce(
    (acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = [];
      }
      acc[entry.date].push(entry);
      return acc;
    },
    {} as Record<string, WaterEntry[]>
  );
};

// Helper function to get date range for weekly/monthly logs
const getDateRange = (days: number): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

export const useWaterLogStore = create<WaterLogState>((set, get) => ({
  entries: [],
  isLoading: false,
  isInitialized: false,

  addEntry: async (amount: number) => {
    if (amount <= 0) return;

    const newEntry: WaterEntry = {
      id: generateId(),
      amount,
      timestamp: Date.now(),
      date: getTodayDate(),
    };

    set((state) => ({ entries: [...state.entries, newEntry] }));

    // Persist to AsyncStorage
    try {
      const updatedEntries = [...get().entries];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving water entry:', error);
    }
  },

  removeEntry: async (id: string) => {
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    }));

    // Persist to AsyncStorage
    try {
      const updatedEntries = get().entries;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error removing water entry:', error);
    }
  },

  getTodayTotal: () => {
    const todayDate = getTodayDate();
    return get()
      .entries.filter((entry) => entry.date === todayDate)
      .reduce((total, entry) => total + entry.amount, 0);
  },

  getTodayEntries: () => {
    const todayDate = getTodayDate();
    return get()
      .entries.filter((entry) => entry.date === todayDate)
      .sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  },

  getDailyLog: (date: string) => {
    const entries = get().entries.filter((entry) => entry.date === date);
    if (entries.length === 0) return null;

    return {
      date,
      entries: entries.sort((a, b) => b.timestamp - a.timestamp),
      totalAmount: entries.reduce((total, entry) => total + entry.amount, 0),
    };
  },

  getWeeklyLogs: () => {
    const weekDates = getDateRange(7);
    const groupedEntries = groupEntriesByDate(get().entries);

    return weekDates.map((date) => {
      const entries = groupedEntries[date] || [];
      return {
        date,
        entries: entries.sort((a, b) => b.timestamp - a.timestamp),
        totalAmount: entries.reduce((total, entry) => total + entry.amount, 0),
      };
    });
  },

  getMonthlyLogs: () => {
    const monthDates = getDateRange(30);
    const groupedEntries = groupEntriesByDate(get().entries);

    return monthDates.map((date) => {
      const entries = groupedEntries[date] || [];
      return {
        date,
        entries: entries.sort((a, b) => b.timestamp - a.timestamp),
        totalAmount: entries.reduce((total, entry) => total + entry.amount, 0),
      };
    });
  },

  loadStoredData: async () => {
    set({ isLoading: true });
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const entries: WaterEntry[] = JSON.parse(storedData);
        set({ entries, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Error loading stored water data:', error);
      set({ isInitialized: true });
    } finally {
      set({ isLoading: false });
    }
  },

  clearAllData: async () => {
    set({ entries: [] });
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing water data:', error);
    }
  },
}));
