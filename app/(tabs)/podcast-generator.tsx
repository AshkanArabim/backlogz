import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import PodcastGenerator from '@/components/PodcastGenerator';

export default function PodcastGeneratorScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          AI Podcast Generator
        </ThemedText>
        <ThemedText style={styles.description}>
          Enter a topic and let AI generate a podcast script for you.
        </ThemedText>
      </ThemedView>
      
      <PodcastGenerator />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
}); 