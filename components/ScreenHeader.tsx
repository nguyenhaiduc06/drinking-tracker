import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack }) => (
  <View className="bg-background h-28 flex-row items-center justify-between px-4 pb-4 pt-10">
    <TouchableOpacity
      onPress={onBack}
      className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
      accessibilityLabel="Go back">
      <Ionicons name="chevron-back" size={20} color="#2D3748" />
    </TouchableOpacity>
    <Text className="font-quicksand text-text-primary ml-2 flex-1 text-center text-xl font-bold">
      {title}
    </Text>
    {/* Spacer for symmetry */}
    <View className="h-10 w-10" />
  </View>
);

export default ScreenHeader;
