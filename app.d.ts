/// <reference types="nativewind/types" />

declare module "*.png";

// Expo Router Types
declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "/(auth)/login": undefined;
      "/(auth)/signup": undefined;
      "/(tabs)/home": undefined;
      "/(tabs)/settings": undefined;
    }
  }
} 