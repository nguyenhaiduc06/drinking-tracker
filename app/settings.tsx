import { Link, Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { Container } from '~/components/Container';
import { HydrationGoalInput } from '~/components/HydrationGoalInput';
import { colors } from '~/config/colors';
import { getIcon } from '~/config/icons';
import { fontStyles } from '~/config/fonts';

// Example icon images (replace with your own assets if needed)
const appIcon = require('../assets/icon.png');
const flagIcon = '🇬🇧'; // Use emoji for language
const helpIcon = '👩‍💻'; // Use emoji for help

const settingsSections = [
  {
    data: [
      {
        key: 'appIcon',
        label: 'App icon',
        iconType: 'image',
        icon: appIcon,
        to: '/app-icon',
      },
    ],
    headerChip: "WHAT'S NEW",
  },
  {
    data: [
      {
        key: 'resetTime',
        label: 'Day Reset Time, Week',
        iconType: 'icon',
        icon: 'time',
        iconColor: colors.primary,
        to: '/reset-time',
        value: '12:00 AM',
        valueType: 'chip',
        valueColor: colors.text.secondary,
        bg: colors.primaryLight + '10',
      },
      {
        key: 'units',
        label: 'Measurement Units',
        iconType: 'emoji',
        icon: '📏',
        to: '/units',
        value: 'ml',
        valueType: 'chip',
        valueColor: colors.text.secondary,
        bg: colors.secondaryLight + '10',
      },
      {
        key: 'sounds',
        label: 'App Sounds, Animations',
        iconType: 'icon',
        icon: 'notifications',
        iconColor: colors.accent,
        to: '/sounds',
        bg: colors.accentLight + '10',
      },
      {
        key: 'health',
        label: 'Apple Health Sync',
        iconType: 'emoji',
        icon: '❤️',
        to: '/health',
        value: 'Connect',
        valueType: 'chip',
        valueColor: colors.text.secondary,
        bg: colors.secondary + '10',
      },
      {
        key: 'watch',
        label: 'Apple Watch',
        iconType: 'emoji',
        icon: '⌚️',
        to: '/watch',
        bg: colors.secondary + '10',
      },
      {
        key: 'icloud',
        label: 'iCloud Backup',
        iconType: 'emoji',
        icon: '☁️',
        to: '/icloud',
        bg: colors.accent + '10',
      },
    ],
  },
  {
    data: [
      {
        key: 'language',
        label: 'Language',
        iconType: 'emoji',
        icon: flagIcon,
        to: '/language',
        bg: colors.primary + '10',
      },
      {
        key: 'help',
        label: 'Help & Support',
        iconType: 'emoji',
        icon: helpIcon,
        to: '/help',
        bg: colors.tertiary + '10',
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
}: any) {
  return (
    <Link href={to} asChild>
      <TouchableOpacity
        style={{
          backgroundColor: colors.surface,
          borderRadius: 20,
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 14,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
        activeOpacity={0.85}>
        {/* Icon */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: bg || colors.tertiaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
          {iconType === 'image' && (
            <Image source={icon} style={{ width: 32, height: 32, borderRadius: 8 }} />
          )}
          {iconType === 'emoji' && <Text style={[fontStyles.bold, { fontSize: 24 }]}>{icon}</Text>}
          {iconType === 'icon' && getIcon(icon, 26, iconColor || colors.primary)}
        </View>
        {/* Label & Value */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[fontStyles.semibold, { fontSize: 16, color: colors.text.primary }]}>
            {label}
          </Text>
          {value && (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {valueType === 'chip' ? (
                <Text
                  style={[
                    fontStyles.medium,
                    {
                      fontSize: 13,
                      color: valueColor || colors.text.secondary,
                      backgroundColor: colors.gray[100],
                      borderRadius: 12,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                      marginLeft: 8,
                      overflow: 'hidden',
                    },
                  ]}>
                  {value}
                </Text>
              ) : (
                <Text
                  style={[
                    fontStyles.medium,
                    { fontSize: 13, color: valueColor || colors.text.secondary, marginLeft: 8 },
                  ]}>
                  {value}
                </Text>
              )}
            </View>
          )}
        </View>
        {/* Chevron */}
        <View style={{ marginLeft: 10 }}>{getIcon('chevronRight', 22, colors.gray[300])}</View>
      </TouchableOpacity>
    </Link>
  );
}

export default function Settings() {
  const handleGoalUpdated = (newGoal: number) => {
    // Optional: Handle goal update if needed
    console.log('Goal updated to:', newGoal);
  };

  return (
    <View className="bg-background flex-1">
      <ScrollView
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}>
        {/* Top bar with chip */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              backgroundColor: colors.gray[100],
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 4,
            }}>
            <Text
              style={[
                fontStyles.medium,
                { fontSize: 13, color: colors.text.secondary, letterSpacing: 1 },
              ]}>
              WHAT'S NEW
            </Text>
          </View>
        </View>
        {/* Settings sections */}
        {settingsSections.map((section, idx) => (
          <View key={idx} style={{ marginBottom: idx < settingsSections.length - 1 ? 32 : 0 }}>
            {/* Section chip if present */}
            {section.headerChip && (
              <View style={{ alignItems: 'flex-end', marginBottom: 8, paddingHorizontal: 16 }}>
                <View
                  style={{
                    backgroundColor: colors.gray[100],
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 4,
                  }}>
                  <Text
                    style={[
                      fontStyles.medium,
                      { fontSize: 13, color: colors.text.secondary, letterSpacing: 1 },
                    ]}>
                    {section.headerChip}
                  </Text>
                </View>
              </View>
            )}
            <View style={{ paddingHorizontal: 16 }}>
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
