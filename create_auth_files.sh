#!/bin/bash
# Create directories if they don't exist
mkdir -p src/screens src/navigation

# Create Firebase configuration file at src/firebaseConfig.js
cat > src/firebaseConfig.js << 'FCEOF'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app); // Also exporting Firestore instance if needed later
FCEOF

# Create the Login screen at src/screens/LoginScreen.js
cat > src/screens/LoginScreen.js << 'LSEOF'
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Added StyleSheet and Alert
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation to 'Home' will be handled by the auth state listener in App.js ideally
      // For now, we keep the original navigation logic, but this might change
      // navigation.replace('Home'); 
    } catch (err) {
      setError(err.message);
      Alert.alert("Login Failed", err.message); // Provide user feedback
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title={loading ? "Logging In..." : "Log In"} onPress={handleLogin} disabled={loading} />
      <View style={styles.switchContainer}>
        <Button title="New here? Sign Up" onPress={() => navigation.navigate('SignUp')} disabled={loading}/>
      </View>
    </View>
  );
}

// Basic Styling
const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex: 1 to take up the whole screen
    justifyContent: 'center', // Center content vertically
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 28, // Larger title
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center', // Center title
  },
  input: {
    backgroundColor: '#fff', // White background for input
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border color
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 14, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
    fontSize: 16, // Slightly larger font size
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchContainer: {
    marginTop: 15,
    alignItems: 'center', // Center the switch button
  }
});
LSEOF

# Create the Sign Up screen at src/screens/SignUpScreen.js
cat > src/screens/SignUpScreen.js << 'SSEOF'
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Added StyleSheet and Alert
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirm password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
     if (password.length < 6) { // Basic password strength check
      setError('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigation to 'Home' will be handled by the auth state listener in App.js ideally
      // For now, we keep the original navigation logic, but this might change
      // navigation.replace('Home'); 
    } catch (err) {
      setError(err.message);
      Alert.alert("Sign Up Failed", err.message); // Provide user feedback
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password (min. 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
       <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title={loading ? "Creating Account..." : "Create Account"} onPress={handleSignUp} disabled={loading} />
      <View style={styles.switchContainer}>
        <Button title="Already have an account? Log In" onPress={() => navigation.navigate('Login')} disabled={loading}/>
      </View>
    </View>
  );
}

// Reusing styles similar to LoginScreen for consistency
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchContainer: {
    marginTop: 15,
    alignItems: 'center',
  }
});
SSEOF

# Create the Home screen at src/screens/HomeScreen.js
cat > src/screens/HomeScreen.js << 'HSEOF'
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native'; // Added StyleSheet and Alert
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function HomeScreen({ navigation }) { // navigation prop might not be needed if managed by root navigator
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigation back to 'Login' should be handled by the auth state listener in App.js
      // navigation.replace('Login'); 
    } catch (error) {
       Alert.alert("Logout Failed", error.message); // Provide user feedback on error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Backlogz!</Text>
      {/* Display user info if available */}
      {auth.currentUser && <Text style={styles.userInfo}>Logged in as: {auth.currentUser.email}</Text>}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555', // Slightly muted text color
  }
});
HSEOF

# Create the navigation stack at src/navigation/StackNavigator.js
cat > src/navigation/StackNavigator.js << 'NAVEOF'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen'; // Ensure HomeScreen is imported

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
      {/* Add other authenticated screens here */}
      {/* e.g., <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}
NAVEOF

echo "Script finished. Files created."
echo "Remember to replace placeholders in src/firebaseConfig.js" 