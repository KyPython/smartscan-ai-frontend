import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="onboarding">
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="result" options={{ headerShown: false }} />
      {/* Add other screens here if needed */}
    </Stack>
  );
}
