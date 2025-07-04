import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { reminderScheduler, ReminderSettings, ReminderTime } from '../../lib/notifications';

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (hour: number, minute: number, label?: string) => void;
  editingReminder?: ReminderTime | null;
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({
  visible,
  onClose,
  onAdd,
  editingReminder,
}) => {
  const [hour, setHour] = useState(editingReminder?.hour?.toString() || '8');
  const [minute, setMinute] = useState(editingReminder?.minute?.toString() || '0');
  const [label, setLabel] = useState(editingReminder?.label || '');

  const handleSubmit = () => {
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minute, 10);

    if (isNaN(hourNum) || hourNum < 0 || hourNum > 23) {
      Alert.alert('Invalid Hour', 'Please enter a valid hour (0-23)');
      return;
    }

    if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
      Alert.alert('Invalid Minute', 'Please enter a valid minute (0-59)');
      return;
    }

    onAdd(hourNum, minuteNum, label.trim() || undefined);
    onClose();
  };

  const formatTime = (h: number, m: number) => {
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const previewTime = () => {
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minute, 10);
    if (!isNaN(hourNum) && !isNaN(minuteNum)) {
      return formatTime(hourNum, minuteNum);
    }
    return 'Invalid time';
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white p-4">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-800">
            {editingReminder ? 'Edit Reminder' : 'Add Reminder'}
          </Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-lg text-blue-500">Cancel</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="mb-4 text-lg font-medium text-gray-800">Time</Text>

          <View className="mb-4 flex-row items-center">
            <View className="mr-2 flex-1">
              <Text className="mb-1 text-sm text-gray-600">Hour (0-23)</Text>
              <TextInput
                value={hour}
                onChangeText={setHour}
                keyboardType="numeric"
                className="rounded-lg border border-gray-300 p-3 text-lg"
                placeholder="8"
              />
            </View>
            <Text className="mx-2 text-2xl text-gray-400">:</Text>
            <View className="ml-2 flex-1">
              <Text className="mb-1 text-sm text-gray-600">Minute (0-59)</Text>
              <TextInput
                value={minute}
                onChangeText={setMinute}
                keyboardType="numeric"
                className="rounded-lg border border-gray-300 p-3 text-lg"
                placeholder="0"
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <Text className="text-center font-medium text-blue-600">Preview: {previewTime()}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-lg font-medium text-gray-800">Label (Optional)</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            className="rounded-lg border border-gray-300 p-3"
            placeholder="e.g., Morning hydration"
            maxLength={50}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} className="mb-4 rounded-lg bg-blue-500 p-4">
          <Text className="text-center text-lg font-medium text-white">
            {editingReminder ? 'Update Reminder' : 'Add Reminder'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const ReminderSettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<ReminderSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderTime | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const currentSettings = await reminderScheduler.getReminderSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Failed to load reminder settings:', error);
      Alert.alert('Error', 'Failed to load reminder settings');
    } finally {
      setLoading(false);
    }
  };

  const toggleReminders = async (enabled: boolean) => {
    try {
      const success = await reminderScheduler.toggleReminders(enabled);
      if (success) {
        setSettings((prev) => (prev ? { ...prev, enabled } : null));
      } else {
        Alert.alert('Error', 'Failed to update reminder settings');
      }
    } catch (error) {
      console.error('Failed to toggle reminders:', error);
      Alert.alert('Error', 'Failed to update reminder settings');
    }
  };

  const toggleReminderEnabled = async (reminderId: string, enabled: boolean) => {
    try {
      const success = await reminderScheduler.updateReminder(reminderId, { enabled });
      if (success) {
        await loadSettings(); // Reload to get updated state
      } else {
        Alert.alert('Error', 'Failed to update reminder');
      }
    } catch (error) {
      console.error('Failed to toggle reminder:', error);
      Alert.alert('Error', 'Failed to update reminder');
    }
  };

  const addReminder = async (hour: number, minute: number, label?: string) => {
    try {
      const success = await reminderScheduler.addReminder(hour, minute, label);
      if (success) {
        await loadSettings();
        Alert.alert('Success', 'Reminder added successfully!');
      } else {
        Alert.alert('Error', 'Failed to add reminder');
      }
    } catch (error) {
      console.error('Failed to add reminder:', error);
      Alert.alert('Error', 'Failed to add reminder');
    }
  };

  const editReminder = async (hour: number, minute: number, label?: string) => {
    if (!editingReminder) return;

    try {
      const success = await reminderScheduler.updateReminder(editingReminder.id, {
        hour,
        minute,
        label,
      });
      if (success) {
        setEditingReminder(null);
        await loadSettings();
        Alert.alert('Success', 'Reminder updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update reminder');
      }
    } catch (error) {
      console.error('Failed to update reminder:', error);
      Alert.alert('Error', 'Failed to update reminder');
    }
  };

  const deleteReminder = async (reminderId: string) => {
    Alert.alert('Delete Reminder', 'Are you sure you want to delete this reminder?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const success = await reminderScheduler.removeReminder(reminderId);
            if (success) {
              await loadSettings();
              Alert.alert('Success', 'Reminder deleted successfully!');
            } else {
              Alert.alert('Error', 'Failed to delete reminder');
            }
          } catch (error) {
            console.error('Failed to delete reminder:', error);
            Alert.alert('Error', 'Failed to delete reminder');
          }
        },
      },
    ]);
  };

  const formatTime = (hour: number, minute: number) => {
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const openEditModal = (reminder: ReminderTime) => {
    setEditingReminder(reminder);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingReminder(null);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Loading reminder settings...</Text>
      </View>
    );
  }

  if (!settings) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">Failed to load reminder settings</Text>
        <TouchableOpacity onPress={loadSettings} className="mt-4 rounded-lg bg-blue-500 px-6 py-2">
          <Text className="font-medium text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="mb-2 text-2xl font-bold text-gray-800">⏰ Reminder Settings</Text>
          <Text className="text-gray-600">Manage your hydration reminders</Text>
        </View>

        {/* Master Toggle */}
        <View className="mb-6 flex-row items-center justify-between rounded-lg bg-gray-50 p-4">
          <View className="flex-1">
            <Text className="text-lg font-medium text-gray-800">Enable Reminders</Text>
            <Text className="mt-1 text-sm text-gray-600">Turn on/off all hydration reminders</Text>
          </View>
          <Switch
            value={settings.enabled}
            onValueChange={toggleReminders}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
            thumbColor={settings.enabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        {/* Reminders List */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-800">Your Reminders</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="rounded-lg bg-blue-500 px-4 py-2">
              <Text className="font-medium text-white">+ Add</Text>
            </TouchableOpacity>
          </View>

          {settings.reminders.length === 0 ? (
            <View className="p-6 text-center">
              <Text className="text-center text-gray-500">No reminders set up yet</Text>
            </View>
          ) : (
            <View className="space-y-2">
              {settings.reminders
                .sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute))
                .map((reminder) => (
                  <View
                    key={reminder.id}
                    className="flex-row items-center justify-between rounded-lg bg-gray-50 p-4">
                    <View className="flex-1">
                      <Text className="text-lg font-medium text-gray-800">
                        {formatTime(reminder.hour, reminder.minute)}
                      </Text>
                      {reminder.label && (
                        <Text className="mt-1 text-sm text-gray-600">{reminder.label}</Text>
                      )}
                    </View>

                    <View className="flex-row items-center">
                      <Switch
                        value={reminder.enabled}
                        onValueChange={(enabled) => toggleReminderEnabled(reminder.id, enabled)}
                        trackColor={{ false: '#767577', true: '#4A90E2' }}
                        thumbColor={reminder.enabled ? '#ffffff' : '#f4f3f4'}
                      />

                      <TouchableOpacity
                        onPress={() => openEditModal(reminder)}
                        className="ml-3 p-2">
                        <Text className="font-medium text-blue-500">Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => deleteReminder(reminder.id)}
                        className="ml-2 p-2">
                        <Text className="font-medium text-red-500">Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </View>

        {/* Tips */}
        <View className="rounded-lg bg-blue-50 p-4">
          <Text className="mb-2 font-medium text-blue-800">💡 Tips</Text>
          <Text className="text-sm leading-5 text-blue-700">
            • Set reminders throughout your day for consistent hydration{'\n'}• Most people benefit
            from drinking water every 2-3 hours{'\n'}• You can temporarily disable reminders without
            deleting them
          </Text>
        </View>
      </ScrollView>

      <AddReminderModal
        visible={modalVisible}
        onClose={closeModal}
        onAdd={editingReminder ? editReminder : addReminder}
        editingReminder={editingReminder}
      />
    </View>
  );
};

export default ReminderSettingsScreen;
