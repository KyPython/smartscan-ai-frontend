// Updated to use your deployed Node.js backend
const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://smartscan-ai-backend.onrender.com";

export async function classifyImage(imageUrl: string): Promise<string> {
  try {
    console.log(`Calling backend: ${BACKEND_API_URL}/api/classify`);
    console.log(`Image URL: ${imageUrl}`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/classify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend response:', data);
    
    return data?.output || "No result";
  } catch (error) {
    console.error('Classification error:', error);
    return `Error: ${error.message}`;
  }
}

export default classifyImage;