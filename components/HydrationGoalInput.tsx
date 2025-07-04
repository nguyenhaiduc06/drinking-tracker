import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useHydrationGoalStore } from '~/stores/hydrationGoalStore';

interface HydrationGoalInputProps {
  onGoalUpdated?: (newGoal: number) => void;
}

export const HydrationGoalInput: React.FC<HydrationGoalInputProps> = ({ onGoalUpdated }) => {
  const { dailyGoal, setDailyGoal } = useHydrationGoalStore();
  const [inputValue, setInputValue] = useState(dailyGoal.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const newGoal = parseInt(inputValue, 10);

    // Validation
    if (isNaN(newGoal) || newGoal <= 0) {
      Alert.alert('Invalid Goal', 'Please enter a valid positive number for your daily goal.');
      setInputValue(dailyGoal.toString()); // Reset to current goal
      return;
    }

    if (newGoal < 500) {
      Alert.alert('Goal Too Low', 'For your health, please set a goal of at least 500ml per day.');
      return;
    }

    if (newGoal > 10000) {
      Alert.alert(
        'Goal Too High',
        'For safety, please set a goal of no more than 10,000ml per day.'
      );
      return;
    }

    try {
      await setDailyGoal(newGoal);
      setIsEditing(false);
      onGoalUpdated?.(newGoal);
      Alert.alert('Success', `Daily goal updated to ${newGoal.toLocaleString()}ml!`);
    } catch (error) {
      console.error('Failed to update hydration goal:', error);
      Alert.alert('Error', 'Failed to update your daily goal. Please try again.');
      setInputValue(dailyGoal.toString()); // Reset to current goal
    }
  };

  const handleCancel = () => {
    setInputValue(dailyGoal.toString());
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Preset goal options
  const presetGoals = [1500, 2000, 2500, 3000];

  const handlePresetGoal = async (goal: number) => {
    try {
      await setDailyGoal(goal);
      setInputValue(goal.toString());
      setIsEditing(false);
      onGoalUpdated?.(goal);
      Alert.alert('Success', `Daily goal set to ${goal.toLocaleString()}ml!`);
    } catch (error) {
      console.error('Failed to set preset goal:', error);
      Alert.alert('Error', 'Failed to set your daily goal. Please try again.');
    }
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <Text className="mb-4 text-lg font-bold text-gray-800">Daily Hydration Goal</Text>

      <View className="mb-4">
        <Text className="mb-2 text-sm text-gray-600">Current Goal</Text>
        <View className="flex-row items-center">
          {isEditing ? (
            <View className="flex-1 flex-row items-center">
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                className="flex-1 rounded-lg border border-gray-300 p-3 text-lg"
                placeholder="Enter goal in ml"
                autoFocus
              />
              <Text className="ml-2 text-lg text-gray-600">ml</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleEdit} className="flex-1">
              <View className="flex-row items-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <Text className="flex-1 text-lg font-medium text-gray-800">
                  {dailyGoal.toLocaleString()}ml
                </Text>
                <Text className="text-sm text-blue-500">Tap to edit</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isEditing && (
        <View className="mb-4 flex-row space-x-2">
          <TouchableOpacity onPress={handleSave} className="flex-1 rounded-lg bg-blue-500 p-3">
            <Text className="text-center font-medium text-white">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} className="flex-1 rounded-lg bg-gray-300 p-3">
            <Text className="text-center font-medium text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isEditing && (
        <View>
          <Text className="mb-2 text-sm text-gray-600">Quick Set</Text>
          <View className="flex-row flex-wrap justify-between space-x-2">
            {presetGoals.map((goal) => (
              <TouchableOpacity
                key={goal}
                onPress={() => handlePresetGoal(goal)}
                className={`mb-2 flex-1 rounded-lg border p-2 ${
                  goal === dailyGoal ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                }`}>
                <Text
                  className={`text-center text-sm ${
                    goal === dailyGoal ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                  {goal.toLocaleString()}ml
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="mt-4 rounded-lg bg-blue-50 p-3">
        <Text className="text-xs text-blue-600">
          💡 The recommended daily water intake is 2,000-2,500ml (8-10 glasses) for most adults.
        </Text>
      </View>
    </View>
  );
};
