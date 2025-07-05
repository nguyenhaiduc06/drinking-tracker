import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HistoryChart } from '~/components/HistoryChart';
import { useWaterLogStore } from '~/stores/waterLogStore';
import { colors } from '~/config/colors';

export default function History() {
  const router = useRouter();
  const { entries, isLoading } = useWaterLogStore();
  const hasData = entries.length > 0;

  return (
    <View className="bg-background pt-safe flex-1">
      {/* Custom Header - matching home screen layout */}
      <View className="h-16 flex-row items-center justify-between px-4">
        <Text className="font-quicksand text-text-primary text-2xl font-bold">History</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-gray-50"
          accessibilityLabel="Close history">
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
