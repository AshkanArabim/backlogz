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
      // console.log(`Attempting signup for: ${email}, Auth instance project ID: ${auth.app.options.projectId}`); // <-- Add log
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
