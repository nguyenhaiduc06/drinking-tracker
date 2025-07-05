import { Link, Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settingsSections = [
  {
    data: [
      {
        key: 'goal',
        label: 'Goal',
        iconType: 'icon',
        icon: 'trophy-outline',
        iconColor: '#60A5FA', // pastelBlue
        to: '/goal',
        bg: '#EBF8FF',
      },
      {
        key: 'reminder',
        label: 'Reminder',
        iconType: 'icon',
        icon: 'notifications-outline',
        iconColor: '#A78BFA', // pastelPurple
        to: '/reminders',
        bg: '#F3E8FF',
      },
    ],
  },
  {
    data: [
      {
        key: 'privacy',
        label: 'Privacy Policy',
        iconType: 'icon',
        icon: 'lock-closed-outline',
        iconColor: '#34D399', // pastelGreen
        to: '/privacy',
        bg: '#ECFDF5',
      },
      {
        key: 'terms',
        label: 'Terms of Service',
        iconType: 'icon',
        icon: 'document-text-outline',
        iconColor: '#C084FC', // pastelLavender
        to: '/terms',
        bg: '#FAF5FF',
      },
      {
        key: 'clear',
        label: 'Clear Data',
        iconType: 'icon',
        icon: 'trash-outline',
        iconColor: '#FB7185', // pastelPink
        to: '/clear-data',
        bg: '#FFF1F2',
        destructive: true,
      },
    ],
  },
  {
    data: [
      {
        key: 'version',
        label: 'App Version',
        iconType: 'icon',
        icon: 'information-circle-outline',
        iconColor: '#FB923C', // pastelOrange
        to: '/version',
        value: '1.0.0',
        valueType: 'text',
        bg: '#FFF7ED',
      },
    ],
  },
];

function SettingCard({
  iconType,
  icon,
  iconColor,
  label,
  value,
  valueType,
  valueColor,
  to,
  bg,
  destructive,
}: any) {
  return (
    <Link href={to} asChild>
      <TouchableOpacity className="mb-4 flex-row items-center rounded-lg bg-gray-50 px-4 py-3.5">
        {/* Icon */}
        <View
          className="mr-4 h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: bg }}>
          {iconType === 'icon' && <Ionicons name={icon} size={20} color={iconColor} />}
        </View>
        {/* Label & Value */}
        <View className="flex-1 flex-row items-center">
          <Text
            className={`font-quicksand text-base font-bold ${destructive ? 'text-pastelPink' : 'text-text-primary'}`}>
            {label}
          </Text>
          {value && (
            <View className="flex-1 items-end">
              {valueType === 'chip' ? (
                <Text className="font-quicksand text-text-secondary ml-2 overflow-hidden rounded-xl bg-gray-200 px-2.5 py-0.5 text-xs font-medium">
                  {value}
                </Text>
              ) : (
                <Text className="font-quicksand text-text-secondary ml-2 text-xs font-medium">
                  {value}
                </Text>
              )}
            </View>
          )}
        </View>
        {/* Chevron */}
        <View className="ml-2.5">
          <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function Settings() {
  return (
    <View className="bg-background pt-safe flex-1">
      <ScrollView className="bg-background" showsVerticalScrollIndicator={false}>
        {/* Settings sections */}
        {settingsSections.map((section, idx) => (
          <View key={idx} className={`${idx < settingsSections.length - 1 ? 'mb-8' : ''}`}>
            <View className="px-4">
              {section.data.map((item: any) => (
                <SettingCard key={item.key} {...item} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
