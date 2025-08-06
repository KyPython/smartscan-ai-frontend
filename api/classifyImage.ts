// api/classifyImage.ts
const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function classifyImage(imageUrl: string): Promise<string> {
  const response = await fetch(`${BACKEND_API_URL}/api/classify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  });

  const data = await response.json();
  return data?.output || "No result";
}

export default classifyImage;