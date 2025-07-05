import React from 'react';
import { View, Text } from 'react-native';

interface WaterProgressViewProps {
  currentAmount: number;
  dailyGoal: number;
}

export const WaterProgressView: React.FC<WaterProgressViewProps> = ({
  currentAmount,
  dailyGoal,
}) => {
  const progress = Math.min(currentAmount / dailyGoal, 1);
  const progressPercentage = Math.round(progress * 100);

  return (
    <View className="bg-background relative flex-1">
      {/* Progress Fill */}
      <View
        className="bg-primary absolute bottom-0 left-0 right-0 rounded-t-2xl"
        style={{ height: `${progressPercentage}%` }}
      />

      {/* Progress Text Overlay */}
      <View className="absolute inset-0 flex-1 items-center justify-center px-5">
        <Text className="font-quicksand text-text-primary text-center text-5xl font-bold">
          {currentAmount.toLocaleString()}ml
        </Text>
        <Text className="font-quicksand text-text-secondary mt-2 text-center text-lg font-medium">
          of {dailyGoal.toLocaleString()}ml
        </Text>
      </View>
    </View>
  );
};
