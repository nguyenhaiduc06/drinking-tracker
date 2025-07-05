import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { HistoryChart } from '~/components/HistoryChart';
import { useWaterLogStore } from '~/stores/waterLogStore';
import ScreenHeader from '~/components/ScreenHeader';

export default function History() {
  const router = useRouter();
  const { entries, isLoading } = useWaterLogStore();
  const hasData = entries.length > 0;

  return (
    <View className="bg-background flex-1">
      <ScreenHeader title="History" onBack={() => router.back()} />
      <ScrollView className="bg-background flex-1" showsVerticalScrollIndicator={false}>
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
