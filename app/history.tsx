import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Container } from '~/components/Container';
import { HistoryChart } from '~/components/HistoryChart';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function History() {
  const { entries, isLoading } = useWaterLogStore();

  const hasData = entries.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: 'Hydration History' }} />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-6">
            <Text className="mb-2 text-center text-2xl font-bold text-gray-800">
              📊 Your Hydration Journey
            </Text>
            <Text className="text-center text-sm text-gray-600">
              Track your progress and stay motivated
            </Text>
          </View>

          {/* History Chart */}
          {hasData ? (
            <HistoryChart />
          ) : (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="mb-4 text-6xl">💧</Text>
              <Text className="mb-2 text-xl font-bold text-gray-700">No History Yet</Text>
              <Text className="px-4 text-center text-gray-500">
                Start logging your water intake to see your progress here!
              </Text>
            </View>
          )}
        </ScrollView>
      </Container>
    </>
  );
}
