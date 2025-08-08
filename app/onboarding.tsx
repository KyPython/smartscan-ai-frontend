import React from "react";
import { Platform, View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  // Native: show onboarding message and continue button
  if (Platform.OS !== "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Welcome to SmartScan AI!{"\n\n"}
          This app lets you take a photo and get an AI-generated caption.
        </Text>
        <Button title="Continue" onPress={() => router.replace("/camera")} />
      </View>
    );
  }

  // Web: show onboarding message and continue button (no demo)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>
        Welcome to SmartScan AI!
      </div>
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        This app lets you take a photo and get an AI-generated caption.
      </div>
      <button
        onClick={() => router.replace("/camera")}
        style={{
          fontSize: 18,
          padding: "10px 20px",
          borderRadius: 8,
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        Continue
      </button>
    </div>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 18, marginBottom: 20, textAlign: "center" },
});
// Fri Aug  8 02:20:05 EDT 2025
