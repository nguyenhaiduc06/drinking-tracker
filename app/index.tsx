import { Link, Stack, useRouter, useFocusEffect } from 'expo-router';
import * as React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { WaterProgressView } from '~/components/WaterProgressView';
import { colors } from '~/config/colors';
import { icons } from '~/config/icons';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';
import { useWaterLogStore } from '~/stores/waterLogStore';

export default function Home() {
  const { loadStoredData, isLoading, getTodayTotal } = useWaterLogStore();
  const { dailyGoal } = useHydrationGoalStore();
  const router = useRouter();

  // Get screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Animation values
  const settingsScale = useSharedValue(1);
  const overlayScale = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const historyScale = useSharedValue(1);
  const historyOverlayScale = useSharedValue(0);
  const historyOverlayOpacity = useSharedValue(0);

  // Button positions
  const buttonSize = 48; // 12 * 4 (w-12 h-12)
  const buttonY = 48 + 24; // 48 is top-12, 24 is safe area
  // Settings button (top-right)
  const settingsButtonX = screenWidth - 48 - 24; // 24 is padding (px-6)
  // History button (top-left)
  const historyButtonX = 24; // 24 is padding (px-6)

  // Initialize stores on app start
  React.useEffect(() => {
    loadStoredData();
  }, []);

  // Reset animations when screen comes back into focus
  useFocusEffect(
    React.useCallback(() => {
      // Reset all animation values when returning to this screen
      overlayScale.value = 0;
      overlayOpacity.value = 0;
      settingsScale.value = 1;
      historyOverlayScale.value = 0;
      historyOverlayOpacity.value = 0;
      historyScale.value = 1;
    }, [])
  );

  const todayTotal = getTodayTotal();

  // Animated styles for settings button
  const settingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: settingsScale.value }],
  }));

  // Animated styles for history button
  const historyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: historyScale.value }],
  }));

  // Animated styles for settings overlay
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    // Calculate scale needed to cover entire screen from button position
    const maxDimension = Math.max(screenWidth, screenHeight);
    const maxScale = (maxDimension * 2) / buttonSize;

    const scale = interpolate(overlayScale.value, [0, 1], [1, maxScale], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity: overlayOpacity.value,
    };
  });

  // Animated styles for history overlay
  const historyOverlayAnimatedStyle = useAnimatedStyle(() => {
    // Calculate scale needed to cover entire screen from button position
    const maxDimension = Math.max(screenWidth, screenHeight);
    const maxScale = (maxDimension * 2) / buttonSize;

    const scale = interpolate(historyOverlayScale.value, [0, 1], [1, maxScale], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity: historyOverlayOpacity.value,
    };
  });

  // Handle settings button press with full-screen animation
  const handleSettingsPress = () => {
    // Add haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Start the overlay animation
    overlayOpacity.value = withTiming(1, { duration: 50 });

    // Animate button scale slightly
    settingsScale.value = withTiming(1.15, { duration: 100 });

    router.push('/settings');

    // Animate overlay to cover full screen
    overlayScale.value = withTiming(1, { duration: 450 });
  };

  // Handle history button press with full-screen animation
  const handleHistoryPress = () => {
    // Add haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    router.push('/history');

    // Start the overlay animation
    historyOverlayOpacity.value = withTiming(1, { duration: 50 });

    // Animate button scale slightly
    historyScale.value = withTiming(1.15, { duration: 100 });

    // Animate overlay to cover full screen
    historyOverlayScale.value = withTiming(1, { duration: 450 });
  };

  return (
    <View className="bg-background pt-safe flex-1">
      {/* Water Progress View - Full Screen */}
      <WaterProgressView currentAmount={todayTotal} dailyGoal={dailyGoal} />

      {/* Top Navigation Buttons */}
      <View className="h-16 flex-row items-center justify-between px-4">
        {/* History Button - Top Left */}
        <Link href="/history" asChild>
          <TouchableOpacity
            onPress={handleHistoryPress}
            className="h-12 w-12 items-center justify-center rounded-full bg-white/50"
            activeOpacity={0.85}>
            <Ionicons name="time" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </Link>

        {/* Settings Button - Top Right with Animation */}
        <Animated.View style={settingsAnimatedStyle}>
          <TouchableOpacity
            onPress={handleSettingsPress}
            className="h-12 w-12 items-center justify-center rounded-full bg-white/50"
            activeOpacity={0.85}>
            <Ionicons name="menu" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Plus Button Overlay */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => router.push('/water-log')}
          className="bg-pastelBlue h-16 w-16 items-center justify-center rounded-full"
          activeOpacity={0.85}>
          <Ionicons name={icons.add} size={32} color={colors.surface} />
        </TouchableOpacity>
        <Text className="font-quicksand text-text-primary mt-3 text-center text-sm font-medium">
          Tap to log water intake
        </Text>
      </View>

      {/* Settings Full-Screen Zoom Overlay */}
      <Animated.View
        style={[
          overlayAnimatedStyle,
          {
            position: 'absolute',
            top: buttonY,
            left: settingsButtonX,
            width: buttonSize,
            height: buttonSize,
            backgroundColor: '#FEFEFE', // matches settings background
            borderRadius: buttonSize / 2,
            zIndex: 1000,
            pointerEvents: 'none',
          },
        ]}
      />

      {/* History Full-Screen Zoom Overlay */}
      <Animated.View
        style={[
          historyOverlayAnimatedStyle,
          {
            position: 'absolute',
            top: buttonY,
            left: historyButtonX,
            width: buttonSize,
            height: buttonSize,
            backgroundColor: '#FEFEFE', // matches history background
            borderRadius: buttonSize / 2,
            zIndex: 1000,
            pointerEvents: 'none',
          },
        ]}
      />
    </View>
  );
}
