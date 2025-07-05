import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '~/config/colors';
import { fontStyles } from '~/config/fonts';

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
    <View style={styles.container}>
      {/* Progress Fill */}
      <View
        style={[
          styles.progressFill,
          {
            height: `${progressPercentage}%`,
          },
        ]}
      />

      {/* Progress Text Overlay */}
      <View style={styles.textOverlay}>
        <Text style={styles.amountText}>{currentAmount.toLocaleString()}ml</Text>
        <Text style={styles.goalText}>of {dailyGoal.toLocaleString()}ml</Text>
        <Text style={styles.percentageText}>{progressPercentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  amountText: {
    fontSize: 48,
    color: colors.text.primary,
    textAlign: 'center',
    ...fontStyles.bold,
  },
  goalText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
    ...fontStyles.medium,
  },
  percentageText: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 16,
    ...fontStyles.semibold,
  },
});
