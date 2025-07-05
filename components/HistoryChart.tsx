import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useHydrationGoalStore } from '../stores/hydrationGoalStore';
import { useWaterLogStore } from '../stores/waterLogStore';

interface HistoryChartProps {
  initialView?: 'weekly' | 'monthly';
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ initialView = 'weekly' }) => {
  const [currentView, setCurrentView] = useState<'weekly' | 'monthly'>(initialView);
  const { getWeeklyLogs, getMonthlyLogs } = useWaterLogStore();
  const { dailyGoal } = useHydrationGoalStore();

  const weeklyLogs = getWeeklyLogs();
  const monthlyLogs = getMonthlyLogs();
  const currentLogs = currentView === 'weekly' ? weeklyLogs : monthlyLogs;

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (currentView === 'weekly') {
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Helper function to get completion percentage
  const getCompletionPercentage = (amount: number) => {
    return Math.min((amount / dailyGoal) * 100, 100);
  };

  // Helper function to get pastel bar color based on completion
  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-pastelLime';
    if (percentage >= 75) return 'bg-pastelBlue';
    if (percentage >= 50) return 'bg-pastelPurple';
    if (percentage >= 25) return 'bg-pastelOrange';
    return 'bg-pastelPink';
  };

  // Calculate statistics
  const totalDays = currentLogs.length;
  const daysWithData = currentLogs.filter((log) => log.totalAmount > 0).length;
  const completedDays = currentLogs.filter((log) => log.totalAmount >= dailyGoal).length;
  const averageIntake = currentLogs.reduce((sum, log) => sum + log.totalAmount, 0) / totalDays;
  const maxIntake = Math.max(...currentLogs.map((log) => log.totalAmount));

  return (
    <View className="w-full">
      {/* View Toggle */}
      <View className="mb-4 flex-row rounded-xl bg-gray-100 p-1">
        <TouchableOpacity
          onPress={() => setCurrentView('weekly')}
          className={`flex-1 rounded-lg py-2 ${currentView === 'weekly' ? 'bg-pastelBlue' : 'bg-transparent'}`}>
          <Text
            className={`font-quicksand text-center font-semibold ${currentView === 'weekly' ? 'text-white' : 'text-text-secondary'}`}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentView('monthly')}
          className={`flex-1 rounded-lg py-2 ${currentView === 'monthly' ? 'bg-pastelBlue' : 'bg-transparent'}`}>
          <Text
            className={`font-quicksand text-center font-semibold ${currentView === 'monthly' ? 'text-white' : 'text-text-secondary'}`}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View className="mb-6">
        <Text className="font-quicksand text-primary mb-3 text-lg font-bold">
          {currentView === 'weekly' ? 'Weekly' : 'Monthly'} Summary
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="bg-pastelBlue/20 min-w-[120px] flex-1 rounded-xl p-3">
            <Text className="font-quicksand text-pastelBlue text-lg font-bold">
              {completedDays}/{totalDays}
            </Text>
            <Text className="font-quicksand text-pastelBlue text-sm">Goals Met</Text>
          </View>
          <View className="bg-pastelLime/20 min-w-[120px] flex-1 rounded-xl p-3">
            <Text className="font-quicksand text-pastelLime text-lg font-bold">
              {Math.round(averageIntake)}ml
            </Text>
            <Text className="font-quicksand text-pastelLime text-sm">Daily Average</Text>
          </View>
          <View className="bg-pastelPurple/20 min-w-[120px] flex-1 rounded-xl p-3">
            <Text className="font-quicksand text-pastelPurple text-lg font-bold">
              {Math.round(maxIntake)}ml
            </Text>
            <Text className="font-quicksand text-pastelPurple text-sm">Best Day</Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View className="mb-4">
        <Text className="font-quicksand text-primary mb-3 text-lg font-bold">Daily Progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="min-w-[350px] flex-row items-end px-2 md:min-w-[800px]">
            {currentLogs.map((log, index) => {
              const percentage = getCompletionPercentage(log.totalAmount);
              const barHeight = Math.max(percentage * 2, 8); // Minimum height of 8
              return (
                <View key={log.date} className="mx-1 flex-1 items-center">
                  {/* Bar */}
                  <View
                    className={`w-6 ${getBarColor(percentage)} rounded-t-lg`}
                    style={{ height: barHeight }}
                  />
                  {/* Amount */}
                  <Text className="font-quicksand text-text-secondary mt-1 text-center text-xs">
                    {log.totalAmount > 0 ? `${Math.round(log.totalAmount / 100) / 10}L` : '0'}
                  </Text>
                  {/* Date */}
                  <Text className="font-quicksand text-text-tertiary mt-1 text-center text-xs">
                    {formatDate(log.date)}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Goal Line Reference */}
      <View className="mb-4 flex-row items-center justify-center">
        <View className="flex-row items-center">
          <View className="mr-2 h-3 w-4 rounded-sm bg-gray-300" />
          <Text className="font-quicksand text-text-secondary text-xs">Goal: {dailyGoal}ml</Text>
        </View>
      </View>

      {/* Detailed List */}
      <View>
        <Text className="font-quicksand text-primary mb-3 text-lg font-bold">Detailed View</Text>
        <View className="space-y-2">
          {currentLogs
            .filter((log) => log.totalAmount > 0)
            .slice(0, 7)
            .map((log) => (
              <View
                key={log.date}
                className="flex-row items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <View className="flex-1">
                  <Text className="font-quicksand text-text-primary font-semibold">
                    {formatDate(log.date)}
                  </Text>
                  <Text className="font-quicksand text-text-secondary text-sm">
                    {log.entries.length} entries
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-quicksand text-pastelBlue font-bold">
                    {log.totalAmount.toLocaleString()}ml
                  </Text>
                  <Text
                    className={`font-quicksand text-sm ${log.totalAmount >= dailyGoal ? 'text-pastelLime' : 'text-pastelOrange'}`}>
                    {Math.round(getCompletionPercentage(log.totalAmount))}% of goal
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default HistoryChart;
