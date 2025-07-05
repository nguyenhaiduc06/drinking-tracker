import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WaterLogInput from '~/components/WaterLogInput';

export default function WaterLogScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ presentation: 'modal' }} />
      <View className="bg-background flex-1 px-4 pt-12">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="font-quicksand text-primary text-2xl font-bold">Log Water Intake</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Ionicons name="close" size={24} color="#5B5F6B" />
          </TouchableOpacity>
        </View>
        <WaterLogInput onEntryAdded={() => router.back()} />
      </View>
    </>
  );
}
