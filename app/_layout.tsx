import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { reminderScheduler } from '../lib/notifications';

export default function Layout() {
  useEffect(() => {
    // Initialize reminders on app start
    initializeReminders();
  }, []);

  const initializeReminders = async () => {
    try {
      // Initialize the notification system
      const initialized = await reminderScheduler.initialize();
      if (!initialized) {
        console.warn('Failed to initialize notification system');
        return;
      }

      // Check if this is the first launch or if reminders need to be set up
      const reminderSettings = await reminderScheduler.getReminderSettings();
      const isFirstLaunch = !reminderSettings.lastUpdated || reminderSettings.lastUpdated === 0;

      if (isFirstLaunch) {
        console.log('First launch detected - setting up default reminders');

        // Save the default settings to storage
        await reminderScheduler.saveReminderSettings({
          enabled: true,
          reminders: reminderSettings.reminders, // Uses DEFAULT_REMINDERS from the scheduler
          lastUpdated: Date.now(),
        });

        // Schedule the default reminders
        await reminderScheduler.scheduleReminders();

        console.log('Default reminders scheduled successfully');
      } else {
        // Not first launch - schedule existing reminders
        console.log('Restoring existing reminders');
        await reminderScheduler.scheduleReminders();
      }
    } catch (error) {
      console.error('Error initializing reminders:', error);
    }
  };

  return <Stack screenOptions={{ headerShown: false }} />;
}
