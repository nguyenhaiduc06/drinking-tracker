import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { colors } from '~/config/colors';
import { useWaterLogStore } from '~/stores/waterLogStore';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';
import { StorageUtil } from '~/utils/storage';
import { reminderScheduler } from '~/lib/notifications';

function SettingCard({ icon, iconColor, label, value, to, onPress, bg, destructive }: any) {
  const CardContent = () => (
    <View className="mb-4 flex-row items-center rounded-lg bg-gray-50 px-4 py-3.5">
      {/* Icon */}
      <View
        className="mr-4 h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: bg }}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      {/* Label & Value */}
      <View className="flex-1 flex-row items-center">
        <Text
          className={`font-quicksand text-base font-bold ${destructive ? 'text-pastelPink' : 'text-text-primary'}`}>
          {label}
        </Text>
        {value && (
          <View className="flex-1 items-end">
            <Text className="font-quicksand text-text-secondary ml-2 text-xs font-medium">
              {value}
            </Text>
          </View>
        )}
      </View>
      {/* Chevron - only show for navigation */}
      {to && (
        <View className="ml-2.5">
          <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
        </View>
      )}
    </View>
  );

  if (to) {
    return (
      <Link href={to} asChild>
        <TouchableOpacity>
          <CardContent />
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <CardContent />
    </TouchableOpacity>
  );
}

export default function Settings() {
  const router = useRouter();
  const { clearAllData: clearWaterLogData } = useWaterLogStore();
  const { resetToDefault: resetHydrationGoal } = useHydrationGoalStore();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your water logs, goals, reminders, and app settings. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All Data',
          style: 'destructive',
          onPress: async () => {
            try {
              // Show loading/processing state
              Alert.alert('Clearing Data...', 'Please wait while we clear your data.');

              // 1. Clear all AsyncStorage data
              await StorageUtil.clearAll();

              // 2. Reset in-memory store states
              await clearWaterLogData();
              resetHydrationGoal();

              // 3. Cancel all scheduled notifications
              await reminderScheduler.cancelAllReminders();

              // 4. Show success message
              Alert.alert(
                'Data Cleared',
                'All your data has been successfully cleared. The app will now restart to its default state.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Navigate back to home screen
                      router.replace('/');
                    },
                  },
                ]
              );
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'There was an error clearing your data. Please try again.', [
                { text: 'OK' },
              ]);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="bg-background pt-safe flex-1">
      <View className="h-16 flex-row items-center justify-between px-4">
        <Text className="font-quicksand text-text-primary text-2xl font-bold">Settings</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-gray-50"
          accessibilityLabel="Close settings">
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* First section */}
        <View className="mb-8">
          <View className="px-4">
            <SettingCard
              icon="trophy-outline"
              iconColor="#60A5FA"
              label="Goal"
              to="/goal"
              bg="#EBF8FF"
            />
            <SettingCard
              icon="notifications-outline"
              iconColor="#A78BFA"
              label="Reminder"
              to="/reminders"
              bg="#F3E8FF"
            />
          </View>
        </View>

        {/* Second section */}
        <View className="mb-8">
          <View className="px-4">
            <SettingCard
              icon="lock-closed-outline"
              iconColor="#34D399"
              label="Privacy Policy"
              to="/privacy"
              bg="#ECFDF5"
            />
            <SettingCard
              icon="document-text-outline"
              iconColor="#C084FC"
              label="Terms of Service"
              to="/terms"
              bg="#FAF5FF"
            />
            <SettingCard
              icon="trash-outline"
              iconColor="#FB7185"
              label="Clear Data"
              onPress={handleClearData}
              bg="#FFF1F2"
              destructive={true}
            />
          </View>
        </View>

        {/* Third section */}
        <View>
          <View className="px-4">
            <SettingCard
              icon="information-circle-outline"
              iconColor="#FB923C"
              label="App Version"
              value="1.0.0"
              bg="#FFF7ED"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
