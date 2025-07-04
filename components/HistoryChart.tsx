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

  // Helper function to get bar color based on completion
  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-400';
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
      <View className="mb-4 flex-row rounded-lg bg-gray-100 p-1">
        <TouchableOpacity
          onPress={() => setCurrentView('weekly')}
          className={`flex-1 rounded-md py-2 ${
            currentView === 'weekly' ? 'bg-blue-500' : 'bg-transparent'
          }`}>
          <Text
            className={`text-center font-medium ${
              currentView === 'weekly' ? 'text-white' : 'text-gray-600'
            }`}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentView('monthly')}
          className={`flex-1 rounded-md py-2 ${
            currentView === 'monthly' ? 'bg-blue-500' : 'bg-transparent'
          }`}>
          <Text
            className={`text-center font-medium ${
              currentView === 'monthly' ? 'text-white' : 'text-gray-600'
            }`}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View className="mb-6">
        <Text className="mb-3 text-lg font-bold text-gray-800">
          {currentView === 'weekly' ? 'Weekly' : 'Monthly'} Summary
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="min-w-[120px] flex-1 rounded-lg bg-blue-50 p-3">
            <Text className="text-lg font-bold text-blue-600">
              {completedDays}/{totalDays}
            </Text>
            <Text className="text-sm text-blue-600">Goals Met</Text>
          </View>
          <View className="min-w-[120px] flex-1 rounded-lg bg-green-50 p-3">
            <Text className="text-lg font-bold text-green-600">{Math.round(averageIntake)}ml</Text>
            <Text className="text-sm text-green-600">Daily Average</Text>
          </View>
          <View className="min-w-[120px] flex-1 rounded-lg bg-purple-50 p-3">
            <Text className="text-lg font-bold text-purple-600">{Math.round(maxIntake)}ml</Text>
            <Text className="text-sm text-purple-600">Best Day</Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View className="mb-4">
        <Text className="mb-3 text-lg font-bold text-gray-800">Daily Progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            className="flex-row items-end px-2"
            style={{ minWidth: currentView === 'weekly' ? 350 : 800 }}>
            {currentLogs.map((log, index) => {
              const percentage = getCompletionPercentage(log.totalAmount);
              const barHeight = Math.max(percentage * 2, 8); // Minimum height of 8

              return (
                <View key={log.date} className="mx-1 flex-1 items-center">
                  {/* Bar */}
                  <View
                    className={`w-6 ${getBarColor(percentage)} rounded-t-sm`}
                    style={{ height: barHeight }}
                  />

                  {/* Amount */}
                  <Text className="mt-1 text-center text-xs text-gray-600">
                    {log.totalAmount > 0 ? `${Math.round(log.totalAmount / 100) / 10}L` : '0'}
                  </Text>

                  {/* Date */}
                  <Text className="mt-1 text-center text-xs text-gray-500">
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
          <Text className="text-xs text-gray-600">Goal: {dailyGoal}ml</Text>
        </View>
      </View>

      {/* Detailed List */}
      <View>
        <Text className="mb-3 text-lg font-bold text-gray-800">Detailed View</Text>
        <View className="space-y-2">
          {currentLogs
            .filter((log) => log.totalAmount > 0)
            .slice(0, 7)
            .map((log) => (
              <View
                key={log.date}
                className="flex-row items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">{formatDate(log.date)}</Text>
                  <Text className="text-sm text-gray-600">{log.entries.length} entries</Text>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-gray-800">
                    {log.totalAmount.toLocaleString()}ml
                  </Text>
                  <Text
                    className={`text-sm ${
                      log.totalAmount >= dailyGoal ? 'text-green-600' : 'text-orange-600'
                    }`}>
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
