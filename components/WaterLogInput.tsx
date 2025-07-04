import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useWaterLogStore } from '../stores/waterLogStore';

interface WaterLogInputProps {
  onEntryAdded?: (amount: number) => void;
}

const PRESET_AMOUNTS = [250, 500, 750, 1000]; // Common water amounts in ml

export const WaterLogInput: React.FC<WaterLogInputProps> = ({ onEntryAdded }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addEntry } = useWaterLogStore();

  const handlePresetAmount = async (amount: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await addEntry(amount);
      onEntryAdded?.(amount);

      // Show success feedback
      Alert.alert('Great! 💧', `You drank ${amount}ml of water!`, [
        { text: 'OK', style: 'default' },
      ]);
    } catch (error) {
      console.error('Error adding water entry:', error);
      Alert.alert('Error', 'Failed to log water intake. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomAmount = async () => {
    const amount = parseInt(customAmount, 10);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
      return;
    }

    if (amount > 5000) {
      Alert.alert('Large Amount', 'That seems like a lot! Are you sure you drank that much?');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      await addEntry(amount);
      onEntryAdded?.(amount);
      setCustomAmount('');

      // Show success feedback
      Alert.alert('Great! 💧', `You drank ${amount}ml of water!`, [
        { text: 'OK', style: 'default' },
      ]);
    } catch (error) {
      console.error('Error adding water entry:', error);
      Alert.alert('Error', 'Failed to log water intake. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-sm">
      <Text className="mb-4 text-center text-lg font-bold text-gray-800">
        How much water did you drink?
      </Text>

      {/* Preset Amount Buttons */}
      <View className="mb-4 flex-row flex-wrap justify-center gap-2">
        {PRESET_AMOUNTS.map((amount) => (
          <TouchableOpacity
            key={amount}
            onPress={() => handlePresetAmount(amount)}
            disabled={isLoading}
            className={`rounded-full border-2 px-4 py-2 ${
              isLoading
                ? 'border-gray-300 bg-gray-100'
                : 'border-blue-300 bg-blue-50 active:bg-blue-100'
            }`}>
            <Text className={`font-medium ${isLoading ? 'text-gray-400' : 'text-blue-600'}`}>
              {amount}ml
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount Input */}
      <View className="border-t border-gray-200 pt-4">
        <Text className="mb-2 text-sm font-medium text-gray-600">Or enter a custom amount:</Text>

        <View className="flex-row items-center gap-2">
          <TextInput
            value={customAmount}
            onChangeText={setCustomAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            editable={!isLoading}
          />

          <Text className="font-medium text-gray-600">ml</Text>

          <TouchableOpacity
            onPress={handleCustomAmount}
            disabled={isLoading || !customAmount.trim()}
            className={`rounded-md px-4 py-2 ${
              isLoading || !customAmount.trim() ? 'bg-gray-300' : 'bg-blue-500 active:bg-blue-600'
            }`}>
            <Text
              className={`font-medium ${
                isLoading || !customAmount.trim() ? 'text-gray-500' : 'text-white'
              }`}>
              {isLoading ? 'Adding...' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick tip */}
      <Text className="mt-3 text-center text-xs text-gray-500">
        💡 Tip: Standard water bottle is usually 500ml
      </Text>
    </View>
  );
};

export default WaterLogInput;
