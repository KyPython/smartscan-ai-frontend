import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import classifyImage from "../api/classifyImage";

export default function ResultScreen() {
  const { photo } = useLocalSearchParams<{ photo?: string }>();
  const router = useRouter();
  const [label, setLabel] = useState<string>("Loading...");

  async function uploadToImgbb(base64: string): Promise<string> {
    try {
      console.log("🔄 Starting ImgBB upload...");
      const IMGBB_API_KEY = "22c85e650e2337bd33e4ae9477140a51";

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ image: base64 }),
        }
      );

      console.log("📡 ImgBB response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ ImgBB error response:", errorText);
        throw new Error(`ImgBB upload failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("📊 ImgBB response data:", data);

      if (!data.success) {
        throw new Error(
          `ImgBB error: ${data.error?.message || "Upload failed"}`
        );
      }

      console.log("✅ Image uploaded successfully:", data.data.url);
      return data.data.url;
    } catch (error) {
      console.error("❌ ImgBB upload error:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function run() {
      if (photo) {
        try {
          console.log("📸 Processing photo... Length:", photo.length);

          // First test if backend is awake
          console.log("🏥 Testing backend health...");
          const healthTest = await fetch(
            "https://smartscan-ai-backend.onrender.com/"
          );
          console.log("🏥 Backend health:", await healthTest.text());

          // Upload image to ImgBB
          const imageUrl = await uploadToImgbb(photo);
          console.log("🔗 Image uploaded to:", imageUrl);

          // Verify image URL is accessible
          console.log("🔍 Testing image URL accessibility...");
          const imageTest = await fetch(imageUrl, { method: "HEAD" });
          console.log("🔍 Image URL status:", imageTest.status);

          // Call AI backend
          console.log("🤖 Calling AI backend...");
          const result = await classifyImage(imageUrl);
          console.log("✅ AI Result received:", result);

          setLabel(result);
        } catch (e) {
          console.error("❌ Full error details:", e);

          // Show more specific error based on type
          if (e.message.includes("502")) {
            setLabel(
              "Error: AI service is starting up, please try again in 30 seconds"
            );
          } else if (e.message.includes("ImgBB")) {
            setLabel("Error: Image upload failed");
          } else {
            setLabel(`Error: ${e.message || "Unknown error"}`);
          }
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
