import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/src/firebaseConfig';
import { AuthStackNavigator, AppStackNavigator } from '@/src/navigation/StackNavigator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // console.log("[RootLayout] Component Mounting..."); // Log mount
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // console.log(`[RootLayout] Initial State - loaded: ${loaded}, initializing: ${initializing}`);

  // Listener for Firebase auth state changes
  useEffect(() => {
    // console.log("[RootLayout] Auth listener effect setup.");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("[RootLayout] onAuthStateChanged triggered. User:", currentUser?.uid || null);
      setUser(currentUser);
      if (initializing) {
        // console.log("[RootLayout] Setting initializing to false.");
        setInitializing(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      // console.log("[RootLayout] Auth listener cleanup.");
      unsubscribe();
    }
  }, []); // Changed dependency to empty array - only run once

  useEffect(() => {
    // console.log(`[RootLayout] Font/Auth Effect Triggered - loaded: ${loaded}, initializing: ${initializing}`);
    if (loaded && !initializing) {
      // console.log("[RootLayout] Hiding Splash Screen.");
      SplashScreen.hideAsync();
    }
  }, [loaded, initializing]); // Update dependencies

  // Show nothing or a loading indicator while initializing or fonts loading
  if (!loaded || initializing) {
    // console.log(`[RootLayout] Rendering null (loading/initializing) - loaded: ${loaded}, initializing: ${initializing}`);
    return null; // Or return a loading component e.g., <ActivityIndicator size="large" />
  }

  // Use NavigationContainer and render the correct navigator based on user state
  // console.log(`[RootLayout] Rendering Navigators - User state: ${user ? 'Logged In' : 'Logged Out'}`);
  return (
    <>
      {user ? <AppStackNavigator /> : <AuthStackNavigator />}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
