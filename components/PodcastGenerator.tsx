import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { generateContent } from '../services/gemini';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const PodcastGenerator = () => {
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePodcast = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const prompt = `Generate a podcast script about ${topic}. Include an introduction, main discussion points, and a conclusion. Make it engaging and informative.`;
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate podcast content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Podcast Generator</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a topic for your podcast"
          value={topic}
          onChangeText={setTopic}
          placeholderTextColor="#888"
        />
        <Button 
          title="Generate Podcast" 
          onPress={generatePodcast} 
          disabled={isLoading}
        />
      </View>

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : null}

      {generatedContent ? (
        <ScrollView style={styles.contentContainer}>
          <ThemedText style={styles.contentTitle}>Generated Podcast Script:</ThemedText>
          <ThemedText style={styles.content}>{generatedContent}</ThemedText>
        </ScrollView>
      ) : null}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loader: {
    marginVertical: 20,
  },
  contentContainer: {
    marginTop: 20,
    maxHeight: 400,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    lineHeight: 24,
  },
});

export default PodcastGenerator; 