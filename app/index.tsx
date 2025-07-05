import { Link, Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WaterProgressView } from '~/components/WaterProgressView';
import { colors } from '~/config/colors';
import { icons } from '~/config/icons';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function Home() {
  const { loadStoredData, isLoading, getTodayTotal } = useWaterLogStore();
  const { dailyGoal } = useHydrationGoalStore();
  const router = useRouter();

  // Initialize stores on app start
  React.useEffect(() => {
    loadStoredData();
  }, []);

  const todayTotal = getTodayTotal();

  return (
    <View className="bg-background flex-1">
      {/* Water Progress View - Full Screen */}
      <WaterProgressView currentAmount={todayTotal} dailyGoal={dailyGoal} />

      {/* Top Navigation Buttons */}
      <View className="absolute left-0 right-0 top-12 flex-row justify-between px-6">
        {/* History Button - Top Left */}
        <Link href="/history" asChild>
          <TouchableOpacity
            className="bg-primary h-12 w-12 items-center justify-center rounded-full"
            activeOpacity={0.85}>
            <Ionicons name={icons.history} size={24} color={colors.surface} />
          </TouchableOpacity>
        </Link>

        {/* Settings Button - Top Right */}
        <Link href="/settings" asChild>
          <TouchableOpacity
            className="bg-primary h-12 w-12 items-center justify-center rounded-full"
            activeOpacity={0.85}>
            <Ionicons name={icons.settings} size={24} color={colors.surface} />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Plus Button Overlay */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => router.push('/water-log')}
          className="bg-primary h-16 w-16 items-center justify-center rounded-full"
          activeOpacity={0.85}>
          <Ionicons name={icons.add} size={32} color={colors.surface} />
        </TouchableOpacity>
        <Text className="font-quicksand text-primary mt-3 text-center text-sm font-medium">
          Tap to log water intake
        </Text>
      </View>
    </View>
  );
}
