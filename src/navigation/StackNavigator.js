import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen'; // Ensure HomeScreen is imported
import { Slot } from 'expo-router'; // Import Slot for nested layouts if needed

const Stack = createNativeStackNavigator();

// This navigator handles the screens shown when the user is NOT authenticated
export function AuthStackNavigator() { 
  return (
    <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ // Consistent styling for headers if shown
            headerStyle: {
            backgroundColor: '#6200ee', // Example header color
            },
            headerTintColor: '#fff', // Header text color
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}
    >
      {/* Usually hide headers for Login/SignUp */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// This navigator handles the screens shown when the user IS authenticated
export function AppStackNavigator() { 
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Backlogz Home' }} // Set a title for the Home screen header
      />
      {/* Remove the conflicting manual definition for (tabs) */}
      {/* Expo Router should handle the app/(tabs) layout automatically */}
      {/* 
      <Stack.Screen 
        name="(tabs)" 
        component={Slot} // Use Slot if (tabs) refers to another Expo Router layout
        options={{ headerShown: false }} 
      /> 
      */}
      {/* Add other authenticated screens here */}
      {/* e.g., <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}
