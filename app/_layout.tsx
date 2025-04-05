import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useSegments, useRouter, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { onAuthStateChanged, User } from 'firebase/auth';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/src/firebaseConfig';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (!mounted || initializing || !loaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // If user is not authenticated and not in auth group, redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // If user is authenticated and in auth group, redirect to main app
      router.replace('/(tabs)/home');
    }
  }, [user, segments, initializing, mounted, loaded]);

  useEffect(() => {
    if (loaded && !initializing) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initializing]);

  if (!loaded || initializing) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
