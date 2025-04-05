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
    // Restore original logic
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      // Re-add the previous log for consistency if desired, or remove it.
      // console.log(`Attempting login for: ${email}, Auth instance project ID: ${auth.app.options.projectId}`); 
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation to 'Home' is handled by onAuthStateChanged listener in _layout.tsx
    } catch (err) {
      // Keep the raw error logging for now, it might still be useful
      // console.error("[Login Error] Raw Code:", err.code);
      // console.error("[Login Error] Raw Message:", err.message);
      setError(`Login Failed: ${err.message}`); // Display error message
      Alert.alert("Login Failed", err.message); // Show alert
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
