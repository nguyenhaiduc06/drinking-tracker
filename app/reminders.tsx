import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ReminderSettingsScreen } from '~/features/reminders/ReminderSettingsScreen';

export default function Reminders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Reminders' }} />
      <Container>
        <ReminderSettingsScreen />
      </Container>
    </>
  );
}
