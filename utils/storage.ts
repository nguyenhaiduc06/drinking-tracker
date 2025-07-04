import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys for different data types
export const STORAGE_KEYS = {
  HYDRATION_GOAL: 'hydration_goal',
  WATER_LOG_ENTRIES: 'water_log_entries',
  REMINDER_SETTINGS: 'reminder_settings',
  USER_PREFERENCES: 'user_preferences',
  STREAK_DATA: 'streak_data',
  BADGE_DATA: 'badge_data',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Storage utility class that provides a consistent interface for AsyncStorage operations
 */
export class StorageUtil {
  /**
   * Get data from storage
   * @param key - Storage key
   * @returns Promise with the stored data or null if not found
   */
  static async get<T>(key: StorageKey): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting data from storage for key '${key}':`, error);
      return null;
    }
  }

  /**
   * Set data in storage
   * @param key - Storage key
   * @param value - Value to store
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  static async set<T>(key: StorageKey, value: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`Error setting data in storage for key '${key}':`, error);
      return false;
    }
  }

  /**
   * Remove data from storage
   * @param key - Storage key
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  static async remove(key: StorageKey): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing data from storage for key '${key}':`, error);
      return false;
    }
  }

  /**
   * Clear all app data from storage
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  static async clearAll(): Promise<boolean> {
    try {
      const keys = [...Object.values(STORAGE_KEYS)];
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Error clearing all data from storage:', error);
      return false;
    }
  }

  /**
   * Get multiple items from storage
   * @param keys - Array of storage keys
   * @returns Promise with an object containing the retrieved data
   */
  static async getMultiple<T>(keys: StorageKey[]): Promise<Record<string, T | null>> {
    try {
      const keyValuePairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, T | null> = {};

      keyValuePairs.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
      });

      return result;
    } catch (error) {
      console.error('Error getting multiple items from storage:', error);
      return {};
    }
  }

  /**
   * Set multiple items in storage
   * @param data - Object with key-value pairs to store
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  static async setMultiple<T>(data: Record<StorageKey, T>): Promise<boolean> {
    try {
      const keyValuePairs: [string, string][] = Object.entries(data).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);

      await AsyncStorage.multiSet(keyValuePairs);
      return true;
    } catch (error) {
      console.error('Error setting multiple items in storage:', error);
      return false;
    }
  }

  /**
   * Check if a key exists in storage
   * @param key - Storage key
   * @returns Promise<boolean> - true if key exists, false otherwise
   */
  static async exists(key: StorageKey): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking if key '${key}' exists in storage:`, error);
      return false;
    }
  }

  /**
   * Get all keys from storage
   * @returns Promise<string[]> - Array of all storage keys
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from storage:', error);
      return [];
    }
  }

  /**
   * Get storage size information
   * @returns Promise with storage information
   */
  static async getStorageInfo(): Promise<{ size: number; keys: string[] }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keyValuePairs = await AsyncStorage.multiGet(keys);

      let totalSize = 0;
      keyValuePairs.forEach(([, value]) => {
        if (value) {
          totalSize += value.length;
        }
      });

      return { size: totalSize, keys };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { size: 0, keys: [] };
    }
  }
}

// Convenience functions for specific data types
export const HydrationGoalStorage = {
  get: () => StorageUtil.get<number>(STORAGE_KEYS.HYDRATION_GOAL),
  set: (goal: number) => StorageUtil.set(STORAGE_KEYS.HYDRATION_GOAL, goal),
  remove: () => StorageUtil.remove(STORAGE_KEYS.HYDRATION_GOAL),
};

export const WaterLogStorage = {
  get: () => StorageUtil.get<any[]>(STORAGE_KEYS.WATER_LOG_ENTRIES),
  set: (entries: any[]) => StorageUtil.set(STORAGE_KEYS.WATER_LOG_ENTRIES, entries),
  remove: () => StorageUtil.remove(STORAGE_KEYS.WATER_LOG_ENTRIES),
};

export const ReminderStorage = {
  get: () => StorageUtil.get<any>(STORAGE_KEYS.REMINDER_SETTINGS),
  set: (settings: any) => StorageUtil.set(STORAGE_KEYS.REMINDER_SETTINGS, settings),
  remove: () => StorageUtil.remove(STORAGE_KEYS.REMINDER_SETTINGS),
};

export const UserPreferencesStorage = {
  get: () => StorageUtil.get<any>(STORAGE_KEYS.USER_PREFERENCES),
  set: (preferences: any) => StorageUtil.set(STORAGE_KEYS.USER_PREFERENCES, preferences),
  remove: () => StorageUtil.remove(STORAGE_KEYS.USER_PREFERENCES),
};

export const StreakStorage = {
  get: () => StorageUtil.get<any>(STORAGE_KEYS.STREAK_DATA),
  set: (streakData: any) => StorageUtil.set(STORAGE_KEYS.STREAK_DATA, streakData),
  remove: () => StorageUtil.remove(STORAGE_KEYS.STREAK_DATA),
};

export const BadgeStorage = {
  get: () => StorageUtil.get<any>(STORAGE_KEYS.BADGE_DATA),
  set: (badgeData: any) => StorageUtil.set(STORAGE_KEYS.BADGE_DATA, badgeData),
  remove: () => StorageUtil.remove(STORAGE_KEYS.BADGE_DATA),
};

// Export default instance
export default StorageUtil;
