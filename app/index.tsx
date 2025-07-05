import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { CharacterSilhouette } from '~/components/CharacterSilhouette';
import { WaterLogModal } from '~/components/WaterLogModal';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function Home() {
  const { loadStoredData, isLoading, getTodayTotal } = useWaterLogStore();
  const { dailyGoal } = useHydrationGoalStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  // Initialize stores on app start
  React.useEffect(() => {
    loadStoredData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStoredData();
    setRefreshing(false);
  };

  const handleEntryAdded = () => {
    // Refresh the view when a new entry is added
    // This will trigger a re-render to update the progress
  };

  const todayTotal = getTodayTotal();
  const progress = Math.min(todayTotal / dailyGoal, 1);

  return (
    <View className="p-safe flex-1">
      {/* Progress Text */}
      <View className="mb-8 items-center">
        <Text className="text-center text-lg text-gray-600">
          {todayTotal}ml of {dailyGoal.toLocaleString()}ml
        </Text>
        <Text className="mt-1 text-center text-sm text-gray-500">
          {Math.round(progress * 100)}% of daily goal
        </Text>
      </View>

      {/* Plus Button */}
      <View className="mb-8 items-center">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-lg"
          style={{
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}>
          <Text className="text-3xl font-bold text-white">+</Text>
        </TouchableOpacity>
        <Text className="mt-3 text-center text-sm text-gray-600">Tap to log water intake</Text>
      </View>
      {/* Water Log Modal */}
      <WaterLogModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEntryAdded={handleEntryAdded}
      />
    </View>
  );
}
