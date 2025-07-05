import '../global.css';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { reminderScheduler } from '../lib/notifications';
import { loadFonts } from '../config/fonts';

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts and initialize reminders on app start
    const initializeApp = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue without custom fonts
      }

      // Initialize reminders
      initializeReminders();
    };

    initializeApp();
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

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="water-log"
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="reminders"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
