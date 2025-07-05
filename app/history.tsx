import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { HistoryChart } from '~/components/HistoryChart';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function History() {
  const { entries, isLoading } = useWaterLogStore();
  const hasData = entries.length > 0;

  return (
    <View className="bg-background pt-safe flex-1">
      <ScrollView className="bg-background flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8 mt-6 px-6">
          <Text className="font-quicksand text-primary mb-2 text-center text-3xl font-bold">
            📊 Your Hydration Journey
          </Text>
          <Text className="font-quicksand text-text-secondary text-center text-base">
            Track your progress and stay motivated
          </Text>
        </View>

        {/* History Chart */}
        {hasData ? (
          <View className="px-4">
            <HistoryChart />
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-16">
            <Text className="mb-4 text-7xl">💧</Text>
            <Text className="font-quicksand text-pastelBlue mb-2 text-2xl font-bold">
              No History Yet
            </Text>
            <Text className="font-quicksand text-text-secondary px-4 text-center">
              Start logging your water intake to see your progress here!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
