import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import classifyImage from "../api/classifyImage";

export default function ResultScreen() {
  const { photo } = useLocalSearchParams<{ photo?: string }>();
  const router = useRouter();
  const [label, setLabel] = useState<string>("Loading...");

  async function uploadToImgbb(base64: string): Promise<string> {
    const IMGBB_API_KEY = "22c85e650e2337bd33e4ae9477140a51";
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: new URLSearchParams({ image: base64 }),
      }
    );

    if (!res.ok) {
      throw new Error(`ImgBB upload failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(`ImgBB error: ${data.error?.message || "Upload failed"}`);
    }

    return data.data.url;
  }

  useEffect(() => {
    async function run() {
      if (photo) {
        try {
          console.log("📸 Processing photo...");
          const imageUrl = await uploadToImgbb(photo);
          console.log("🔗 Image uploaded to:", imageUrl);

          const result = await classifyImage(imageUrl);
          console.log("🤖 AI Result:", result);

          setLabel(result);
        } catch (e) {
          console.error("❌ Error in result screen:", e);
          // Show the actual error message instead of generic "Error"
          setLabel(`Error: ${e.message}`);
        }
      } else {
        setLabel("No photo provided");
      }
    }
    run();
  }, [photo]);

  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          source={{ uri: `data:image/jpg;base64,${photo}` }}
          style={styles.image}
        />
      ) : null}
      <Text style={styles.label}>AI Label: {label}</Text>
      <Button title="Retake Photo" onPress={() => router.replace("/camera")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 200, height: 200, marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 20 },
});
