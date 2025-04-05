import { GoogleGenerativeAI } from '@google/generative-ai';
import { EXPO_PUBLIC_GEMINI_API_KEY } from '@env';

if (!EXPO_PUBLIC_GEMINI_API_KEY) {
  console.error('Gemini API key is not set in .env file');
}

console.log('Initializing Gemini with API key:', EXPO_PUBLIC_GEMINI_API_KEY ? 'Key exists' : 'No key found');

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(EXPO_PUBLIC_GEMINI_API_KEY);

// Function to get a model instance
export const getGeminiModel = (modelName: string = 'gemini-pro') => {
  return genAI.getGenerativeModel({ model: modelName });
};

// Example function to generate content
export const generateContent = async (prompt: string) => {
  try {
    console.log('Generating content for prompt:', prompt);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('Successfully generated content');
    return response.text();
  } catch (error) {
    console.error('Detailed error in generateContent:', error);
    throw error;
  }
};

// Export the client for direct use if needed
export default genAI; 