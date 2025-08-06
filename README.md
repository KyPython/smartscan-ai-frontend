# **📱 SmartScan AI Frontend: A Cross-Platform Client for AI Services**

This repository contains the client-side application for the **[SmartScan AI](https://www.google.com/search?q=https://github.com/your-repo/smartscan-ai-fullstack-repo)** project. It showcases expertise in building a modern, cross-platform user interface with a single codebase that effectively communicates with a decoupled backend and AI engine.

## **🛠️ Tech Stack & Architecture**

The frontend is built with an advanced, type-safe stack chosen for its ability to deliver a consistent experience across different platforms while maintaining a high level of developer productivity.

  - **Expo Router** - Implements a file-based routing system for clear, scalable navigation.
  - **React Native Web** - Provides a single codebase for building UIs that run on both web browsers and mobile devices.
  - **TypeScript** - Ensures type safety and improves code quality and maintainability.
  - **React Webcam** - Enables real-time browser camera access for a dynamic user experience.
  - **Expo Image Picker** - Facilitates native image selection on mobile for future feature expansion.

## **📁 Project Structure**

The project is structured for maintainability and clarity, with a clear separation of concerns between components, API integration, and application logic.

```
app/
├── _layout.tsx          # Root layout and navigation for the entire app
├── index.tsx           # Root redirect to the onboarding flow
├── onboarding.tsx      # Welcome screen to introduce the project
├── camera.tsx          # Camera interface with image capture logic
└── result.tsx          # Displays the AI-generated caption and image

api/
└── classifyImage.ts    # Service for handling communication with the backend API

components/
├── Themed.tsx          # Custom components for consistent styling
└── useColorScheme.tsx  # Hook for dark/light mode functionality
```

## **🚀 Key Features**

This frontend demonstrates a range of critical development skills:

  - **Cross-Platform Compatibility:** A single codebase powers a responsive web application.
  - **Real-time Camera Integration:** Seamlessly accesses the user's camera for a modern, interactive experience.
  - **Asynchronous API Integration:** Handles image uploads and fetches AI results from the backend without blocking the UI.
  - **Clean UI/UX Design:** Implements a modern, clean interface focused on user flow and accessibility.
  - **Scalable State Management:** The architecture is designed to easily grow with future features without becoming complex.

## **💻 Local Development**

### Prerequisites

  - Node.js 18+

### Setup

To run the application locally, first clone the repository and install dependencies.

```bash
# Install dependencies
npm install

# Start the development server
npm run web            # Web development
npm run android        # Android development
npm run ios           # iOS development

# Build for production
npm run build         # Web build for deployment
```

## **🌐 Environment Variables**

Configure the URL for your backend API to enable full functionality. This practice demonstrates an understanding of dynamic API endpoint configuration for different environments.

```env
BACKEND_API_URL=https://your-backend-url.onrender.com
```

## **🚀 Deployment**

The web application is deployed via **Vercel** with a seamless CI/CD pipeline, showcasing an understanding of automated deployment and build processes.

## **📱 Platform Support**

  - ✅ **Web** - Fully functional with real-time camera and AI integration.
  - ⚠️ **Mobile** - Currently shows a message to use the web version. This was a deliberate choice to focus on a complete web MVP before expanding to native mobile features.
  - 🔄 **Future Scope** - The code is structured to allow for a straightforward implementation of native camera access and other platform-specific features in the future.
