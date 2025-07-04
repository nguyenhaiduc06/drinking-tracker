import React from 'react';
import { Text, View } from 'react-native';
import { useHydrationGoalStore } from '../stores/hydrationGoalStore';
import { useWaterLogStore } from '../stores/waterLogStore';

interface DailyProgressBarProps {
  showDetails?: boolean;
  height?: number;
}

export const DailyProgressBar: React.FC<DailyProgressBarProps> = ({
  showDetails = true,
  height = 12,
}) => {
  const { dailyGoal } = useHydrationGoalStore();
  const { getTodayTotal } = useWaterLogStore();

  const todayTotal = getTodayTotal();
  const progressPercentage = Math.min((todayTotal / dailyGoal) * 100, 100);
  const isComplete = todayTotal >= dailyGoal;
  const remaining = Math.max(dailyGoal - todayTotal, 0);

  // Format number with commas for large numbers
  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  // Get progress bar color based on completion
  const getProgressColor = () => {
    if (isComplete) return 'bg-green-500';
    if (progressPercentage >= 75) return 'bg-blue-500';
    if (progressPercentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  // Get progress text color
  const getProgressTextColor = () => {
    if (isComplete) return 'text-green-600';
    if (progressPercentage >= 75) return 'text-blue-600';
    if (progressPercentage >= 50) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <View className="w-full">
      {/* Progress Bar */}
      <View className="w-full overflow-hidden rounded-full bg-gray-200" style={{ height }}>
        <View
          className={`h-full ${getProgressColor()} transition-all duration-300`}
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      {/* Progress Details */}
      {showDetails && (
        <View className="mt-2">
          {/* Progress Stats */}
          <View className="mb-1 flex-row items-center justify-between">
            <Text className={`text-sm font-medium ${getProgressTextColor()}`}>
              {formatAmount(todayTotal)}ml / {formatAmount(dailyGoal)}ml
            </Text>
            <Text className={`text-sm font-bold ${getProgressTextColor()}`}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>

          {/* Status Message */}
          <Text className="text-center text-xs text-gray-600">
            {isComplete ? (
              <Text className="font-medium text-green-600">
                🎉 Great job! You've reached your daily goal!
              </Text>
            ) : (
              <Text>
                {remaining > 0 && `${formatAmount(remaining)}ml remaining to reach your goal`}
              </Text>
            )}
          </Text>

          {/* Motivational Message */}
          {!isComplete && (
            <Text className="mt-1 text-center text-xs text-gray-500">
              {progressPercentage >= 75
                ? "You're almost there! 💪"
                : progressPercentage >= 50
                  ? 'Halfway there! Keep going! 🚀'
                  : progressPercentage >= 25
                    ? 'Good start! Stay hydrated! 💧'
                    : 'Start your hydration journey! 🌟'}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default DailyProgressBar;
