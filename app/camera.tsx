import React, { useRef, useCallback, useState, useEffect } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const router = useRouter();
  const webcamRef = useRef<any>(null);
  const [Webcam, setWebcam] = useState<any>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      import("react-webcam").then((mod) => setWebcam(() => mod.default));
    }
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      router.push({
        pathname: "/result",
        params: { photo: imageSrc?.split(",")[1] },
      });
    } else {
      alert(
        "Camera not ready. Please refresh the page or check camera permissions."
      );
    }
  }, [webcamRef, router]);

  if (Platform.OS !== "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Please use the web version of this app in your browser to access the
          camera.
        </Text>
      </View>
    );
  }

  if (!Webcam) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Loading camera...</p>
      </div>
    );
  }

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
        Web Camera Demo
      </div>
      <div style={{ marginBottom: 20 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          style={{ borderRadius: 8 }}
          videoConstraints={{
            facingMode: "environment",
          }}
        />
      </div>
      <button
        onClick={capture}
        style={{
          fontSize: 18,
          padding: "10px 20px",
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: "#007AFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Take Photo
      </button>
      {photo && (
        <img
          src={photo}
          alt="Captured"
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 8 }}
        />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 18, marginBottom: 20, textAlign: "center" },
});
