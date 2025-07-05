import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import ScreenHeader from '~/components/ScreenHeader';

function SettingCard({ icon, iconColor, label, value, to, onPress, bg, destructive }: any) {
  const CardContent = () => (
    <View className="mb-4 flex-row items-center rounded-lg bg-gray-50 px-4 py-3.5">
      {/* Icon */}
      <View
        className="mr-4 h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: bg }}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      {/* Label & Value */}
      <View className="flex-1 flex-row items-center">
        <Text
          className={`font-quicksand text-base font-bold ${destructive ? 'text-pastelPink' : 'text-text-primary'}`}>
          {label}
        </Text>
        {value && (
          <View className="flex-1 items-end">
            <Text className="font-quicksand text-text-secondary ml-2 text-xs font-medium">
              {value}
            </Text>
          </View>
        )}
      </View>
      {/* Chevron - only show for navigation */}
      {to && (
        <View className="ml-2.5">
          <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
        </View>
      )}
    </View>
  );

  if (to) {
    return (
      <Link href={to} asChild>
        <TouchableOpacity>
          <CardContent />
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <CardContent />
    </TouchableOpacity>
  );
}

export default function Settings() {
  const router = useRouter();

  // Animation values
  const opacity = useSharedValue(0);

  // Start fade-in animation when component mounts
  React.useEffect(() => {
    // Start fading in after a small delay (when overlay is ~30% expanded)
    // This creates the effect of content "emerging" from behind the expanding overlay
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 200 });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleClearData = () => {
    // TODO: Implement clear data functionality
    console.log('Clear data pressed');
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]} className="bg-background">
      <ScreenHeader title="Settings" onBack={() => router.back()} />
      <ScrollView className="bg-background" showsVerticalScrollIndicator={false}>
        {/* First section */}
        <View className="mb-8">
          <View className="px-4">
            <SettingCard
              icon="trophy-outline"
              iconColor="#60A5FA"
              label="Goal"
              to="/goal"
              bg="#EBF8FF"
            />
            <SettingCard
              icon="notifications-outline"
              iconColor="#A78BFA"
              label="Reminder"
              to="/reminders"
              bg="#F3E8FF"
            />
          </View>
        </View>

        {/* Second section */}
        <View className="mb-8">
          <View className="px-4">
            <SettingCard
              icon="lock-closed-outline"
              iconColor="#34D399"
              label="Privacy Policy"
              to="/privacy"
              bg="#ECFDF5"
            />
            <SettingCard
              icon="document-text-outline"
              iconColor="#C084FC"
              label="Terms of Service"
              to="/terms"
              bg="#FAF5FF"
            />
            <SettingCard
              icon="trash-outline"
              iconColor="#FB7185"
              label="Clear Data"
              onPress={handleClearData}
              bg="#FFF1F2"
              destructive={true}
            />
          </View>
        </View>

        {/* Third section */}
        <View>
          <View className="px-4">
            <SettingCard
              icon="information-circle-outline"
              iconColor="#FB923C"
              label="App Version"
              value="1.0.0"
              bg="#FFF7ED"
            />
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
