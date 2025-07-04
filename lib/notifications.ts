import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { STORAGE_KEYS, StorageUtil } from '../utils/storage';

export interface ReminderTime {
  id: string;
  hour: number; // 24-hour format
  minute: number;
  enabled: boolean;
  label?: string;
}

export interface ReminderSettings {
  enabled: boolean;
  reminders: ReminderTime[];
  lastUpdated: number;
}

// Default reminder times (every 2 hours from 8 AM to 8 PM)
const DEFAULT_REMINDERS: ReminderTime[] = [
  { id: '1', hour: 8, minute: 0, enabled: true, label: 'Morning hydration' },
  { id: '2', hour: 10, minute: 0, enabled: true, label: 'Mid-morning drink' },
  { id: '3', hour: 12, minute: 0, enabled: true, label: 'Lunch time water' },
  { id: '4', hour: 14, minute: 0, enabled: true, label: 'Afternoon boost' },
  { id: '5', hour: 16, minute: 0, enabled: true, label: 'Late afternoon' },
  { id: '6', hour: 18, minute: 0, enabled: true, label: 'Evening drink' },
  { id: '7', hour: 20, minute: 0, enabled: true, label: 'Evening hydration' },
];

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class ReminderScheduler {
  private static instance: ReminderScheduler;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ReminderScheduler {
    if (!ReminderScheduler.instance) {
      ReminderScheduler.instance = new ReminderScheduler();
    }
    return ReminderScheduler.instance;
  }

  /**
   * Initialize the notification system
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      // Request permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permission not granted');
        return false;
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('hydration-reminders', {
          name: 'Hydration Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4A90E2',
        });
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      return false;
    }
  }

  /**
   * Get current reminder settings
   */
  async getReminderSettings(): Promise<ReminderSettings> {
    try {
      const settings = await StorageUtil.get<ReminderSettings>(STORAGE_KEYS.REMINDER_SETTINGS);
      return (
        settings || {
          enabled: true,
          reminders: DEFAULT_REMINDERS,
          lastUpdated: Date.now(),
        }
      );
    } catch (error) {
      console.error('Failed to get reminder settings:', error);
      return {
        enabled: true,
        reminders: DEFAULT_REMINDERS,
        lastUpdated: Date.now(),
      };
    }
  }

  /**
   * Save reminder settings
   */
  async saveReminderSettings(settings: ReminderSettings): Promise<boolean> {
    try {
      settings.lastUpdated = Date.now();
      return await StorageUtil.set(STORAGE_KEYS.REMINDER_SETTINGS, settings);
    } catch (error) {
      console.error('Failed to save reminder settings:', error);
      return false;
    }
  }

  /**
   * Schedule all enabled reminders
   */
  async scheduleReminders(): Promise<boolean> {
    try {
      const settings = await this.getReminderSettings();

      if (!settings.enabled) {
        console.log('Reminders are disabled');
        return true;
      }

      // Cancel existing scheduled notifications
      await this.cancelAllReminders();

      // Schedule new reminders
      const enabledReminders = settings.reminders.filter((r) => r.enabled);

      for (const reminder of enabledReminders) {
        await this.scheduleReminderNotification(reminder);
      }

      console.log(`Scheduled ${enabledReminders.length} reminders`);
      return true;
    } catch (error) {
      console.error('Failed to schedule reminders:', error);
      return false;
    }
  }

  /**
   * Schedule a single reminder notification
   */
  private async scheduleReminderNotification(reminder: ReminderTime): Promise<void> {
    try {
      const trigger: Notifications.CalendarTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: reminder.hour,
        minute: reminder.minute,
        repeats: true,
      };

      const content = {
        title: '💧 Time to Hydrate!',
        body: reminder.label || "Don't forget to drink water and stay healthy!",
        data: { reminderId: reminder.id },
        categoryIdentifier: 'hydration-reminder',
      };

      await Notifications.scheduleNotificationAsync({
        identifier: `hydration-reminder-${reminder.id}`,
        content,
        trigger,
      });

      console.log(
        `Scheduled reminder for ${reminder.hour}:${reminder.minute.toString().padStart(2, '0')}`
      );
    } catch (error) {
      console.error(`Failed to schedule reminder ${reminder.id}:`, error);
    }
  }

  /**
   * Cancel all scheduled reminders
   */
  async cancelAllReminders(): Promise<boolean> {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const hydrationReminders = scheduledNotifications.filter((notification) =>
        notification.identifier.startsWith('hydration-reminder-')
      );

      for (const notification of hydrationReminders) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }

      console.log(`Cancelled ${hydrationReminders.length} reminders`);
      return true;
    } catch (error) {
      console.error('Failed to cancel reminders:', error);
      return false;
    }
  }

  /**
   * Cancel a specific reminder
   */
  async cancelReminder(reminderId: string): Promise<boolean> {
    try {
      await Notifications.cancelScheduledNotificationAsync(`hydration-reminder-${reminderId}`);
      return true;
    } catch (error) {
      console.error(`Failed to cancel reminder ${reminderId}:`, error);
      return false;
    }
  }

  /**
   * Add a new reminder
   */
  async addReminder(hour: number, minute: number, label?: string): Promise<boolean> {
    try {
      const settings = await this.getReminderSettings();

      const newReminder: ReminderTime = {
        id: Date.now().toString(),
        hour,
        minute,
        enabled: true,
        label,
      };

      settings.reminders.push(newReminder);
      await this.saveReminderSettings(settings);

      if (settings.enabled) {
        await this.scheduleReminderNotification(newReminder);
      }

      return true;
    } catch (error) {
      console.error('Failed to add reminder:', error);
      return false;
    }
  }

  /**
   * Update an existing reminder
   */
  async updateReminder(reminderId: string, updates: Partial<ReminderTime>): Promise<boolean> {
    try {
      const settings = await this.getReminderSettings();
      const reminderIndex = settings.reminders.findIndex((r) => r.id === reminderId);

      if (reminderIndex === -1) {
        console.error(`Reminder ${reminderId} not found`);
        return false;
      }

      // Cancel the old reminder
      await this.cancelReminder(reminderId);

      // Update the reminder
      settings.reminders[reminderIndex] = {
        ...settings.reminders[reminderIndex],
        ...updates,
      };

      await this.saveReminderSettings(settings);

      // Schedule the updated reminder if it's enabled
      if (settings.enabled && settings.reminders[reminderIndex].enabled) {
        await this.scheduleReminderNotification(settings.reminders[reminderIndex]);
      }

      return true;
    } catch (error) {
      console.error('Failed to update reminder:', error);
      return false;
    }
  }

  /**
   * Remove a reminder
   */
  async removeReminder(reminderId: string): Promise<boolean> {
    try {
      const settings = await this.getReminderSettings();

      await this.cancelReminder(reminderId);

      settings.reminders = settings.reminders.filter((r) => r.id !== reminderId);
      await this.saveReminderSettings(settings);

      return true;
    } catch (error) {
      console.error('Failed to remove reminder:', error);
      return false;
    }
  }

  /**
   * Enable or disable all reminders
   */
  async toggleReminders(enabled: boolean): Promise<boolean> {
    try {
      const settings = await this.getReminderSettings();
      settings.enabled = enabled;
      await this.saveReminderSettings(settings);

      if (enabled) {
        await this.scheduleReminders();
      } else {
        await this.cancelAllReminders();
      }

      return true;
    } catch (error) {
      console.error('Failed to toggle reminders:', error);
      return false;
    }
  }

  /**
   * Get all scheduled notification identifiers
   */
  async getScheduledReminderIds(): Promise<string[]> {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      return scheduledNotifications
        .filter((notification) => notification.identifier.startsWith('hydration-reminder-'))
        .map((notification) => notification.identifier);
    } catch (error) {
      console.error('Failed to get scheduled reminders:', error);
      return [];
    }
  }

  /**
   * Test notification (for debugging)
   */
  async sendTestNotification(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💧 Test Notification',
          body: 'This is a test hydration reminder!',
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 2 },
      });
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  }
}

// Export singleton instance
export const reminderScheduler = ReminderScheduler.getInstance();

// Export default for convenience
export default reminderScheduler;
