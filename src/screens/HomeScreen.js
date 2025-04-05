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
