import { Link, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { DailyProgressBar } from '~/components/DailyProgressBar';
import { WaterLogInput } from '~/components/WaterLogInput';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function Home() {
  const { loadStoredData, isLoading, getTodayEntries } = useWaterLogStore();
  const { dailyGoal } = useHydrationGoalStore();
  const [refreshing, setRefreshing] = React.useState(false);

  // Initialize stores on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStoredData();
    setRefreshing(false);
  };

  const handleEntryAdded = () => {
    // Refresh the view when a new entry is added
    // This will trigger a re-render to update the progress bar
  };

  const todayEntries = getTodayEntries();

  return (
    <>
      <Stack.Screen options={{ title: 'Daily Hydration' }} />
      <Container>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
          {/* Header */}
          <View className="mb-6">
            <Text className="mb-2 text-center text-2xl font-bold text-gray-800">
              💧 Stay Hydrated
            </Text>
            <Text className="text-center text-sm text-gray-600">
              Daily Goal: {dailyGoal.toLocaleString()}ml
            </Text>
          </View>

          {/* Daily Progress */}
          <View className="mb-6">
            <DailyProgressBar />
          </View>

          {/* Navigation Buttons */}
          <View className="mb-6 space-y-3">
            <Link href="/history" asChild>
              <TouchableOpacity className="flex-row items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-4">
                <Text className="mr-2 font-medium text-blue-600">📊</Text>
                <Text className="font-medium text-blue-600">View History & Progress</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/reminders" asChild>
              <TouchableOpacity className="flex-row items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-4">
                <Text className="mr-2 font-medium text-purple-600">⏰</Text>
                <Text className="font-medium text-purple-600">Reminder Settings</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/settings" asChild>
              <TouchableOpacity className="flex-row items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
                <Text className="mr-2 font-medium text-gray-600">⚙️</Text>
                <Text className="font-medium text-gray-600">Settings</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Water Log Input */}
          <View className="mb-6">
            <WaterLogInput onEntryAdded={handleEntryAdded} />
          </View>

          {/* Today's Entries */}
          {todayEntries.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-lg font-bold text-gray-800">Today's Entries</Text>
              <View className="rounded-lg bg-gray-50 p-4">
                {todayEntries.slice(0, 5).map((entry, index) => (
                  <View key={entry.id} className="flex-row items-center justify-between py-2">
                    <Text className="text-gray-700">{entry.amount}ml</Text>
                    <Text className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                ))}
                {todayEntries.length > 5 && (
                  <Text className="mt-2 text-center text-sm text-gray-500">
                    +{todayEntries.length - 5} more entries
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Motivational Message */}
          <View className="mb-6">
            <Text className="text-center italic text-gray-600">
              "Water is the driving force of all nature." - Leonardo da Vinci
            </Text>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
