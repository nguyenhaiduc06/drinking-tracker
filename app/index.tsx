import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { CharacterSilhouette } from '~/components/CharacterSilhouette';
import { WaterLogModal } from '~/components/WaterLogModal';
import { WaterProgressView } from '~/components/WaterProgressView';
import { colors } from '~/config/colors';
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

  return (
    <View className="flex-1">
      {/* Water Progress View - Full Screen */}
      <WaterProgressView currentAmount={todayTotal} dailyGoal={dailyGoal} />

      {/* Plus Button Overlay */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}>
          <Text style={{ color: colors.primary }} className="text-3xl font-bold">
            +
          </Text>
        </TouchableOpacity>
        <Text className="mt-3 text-center text-sm font-medium text-white">
          Tap to log water intake
        </Text>
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
