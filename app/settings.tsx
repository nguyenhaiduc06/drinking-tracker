import { Link, Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { HydrationGoalInput } from '~/components/HydrationGoalInput';

export default function Settings() {
  const handleGoalUpdated = (newGoal: number) => {
    // Optional: Handle goal update if needed
    console.log('Goal updated to:', newGoal);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-6">
            <Text className="text-center text-2xl font-bold text-gray-800">⚙️ Settings</Text>
            <Text className="text-center text-sm text-gray-600">
              Customize your hydration tracking experience
            </Text>
          </View>

          {/* Hydration Goal Section */}
          <View className="mb-6">
            <HydrationGoalInput onGoalUpdated={handleGoalUpdated} />
          </View>

          {/* Reminder Settings Section */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-gray-800">Notifications</Text>
            <Link href="/reminders" asChild>
              <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-purple-200 bg-purple-50 p-4">
                <View className="flex-row items-center">
                  <Text className="mr-3 text-2xl">⏰</Text>
                  <View>
                    <Text className="font-medium text-purple-800">Reminder Settings</Text>
                    <Text className="text-sm text-purple-600">
                      Manage when you get reminded to drink water
                    </Text>
                  </View>
                </View>
                <Text className="text-lg text-purple-600">→</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* App Info Section */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-gray-800">About</Text>
            <View className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <View className="mb-3">
                <Text className="font-medium text-gray-800">💧 Drinking Tracker</Text>
                <Text className="text-sm text-gray-600">
                  Stay hydrated and build healthy habits
                </Text>
              </View>

              <View className="mb-3">
                <Text className="text-sm text-gray-600">
                  <Text className="font-medium">Version:</Text> 1.0.0
                </Text>
                <Text className="text-sm text-gray-600">
                  <Text className="font-medium">Storage:</Text> All data is stored locally on your
                  device
                </Text>
              </View>

              <View className="border-t border-gray-200 pt-3">
                <Text className="text-xs text-gray-500">
                  Your privacy is important to us. This app works completely offline and doesn't
                  collect or share any personal data.
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-gray-800">Quick Actions</Text>
            <View className="space-y-3">
              <Link href="/history" asChild>
                <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <View className="flex-row items-center">
                    <Text className="mr-3 text-2xl">📊</Text>
                    <Text className="font-medium text-blue-800">View History</Text>
                  </View>
                  <Text className="text-lg text-blue-600">→</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/" asChild>
                <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
                  <View className="flex-row items-center">
                    <Text className="mr-3 text-2xl">🏠</Text>
                    <Text className="font-medium text-green-800">Back to Home</Text>
                  </View>
                  <Text className="text-lg text-green-600">→</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Health Tips */}
          <View className="mb-6">
            <Text className="mb-4 text-lg font-bold text-gray-800">💡 Health Tips</Text>
            <View className="rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-medium text-blue-800">
                Stay Hydrated Throughout the Day
              </Text>
              <Text className="text-xs text-blue-600">
                • Drink water first thing in the morning{'\n'}• Keep a water bottle with you{'\n'}•
                Set regular reminders to drink water{'\n'}• Eat water-rich foods like fruits and
                vegetables{'\n'}• Monitor your urine color as a hydration indicator
              </Text>
            </View>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
