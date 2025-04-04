import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Temporary mock data
const mockTopics = [
  { id: '1', title: 'Quantum Physics' },
  { id: '2', title: 'Ancient Rome' },
  { id: '3', title: 'Machine Learning' },
];

export default function MyTopicsScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={mockTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.topicItem}>
            <ThemedText style={styles.topicTitle}>{item.title}</ThemedText>
          </ThemedView>
        )}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  topicItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  topicTitle: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 