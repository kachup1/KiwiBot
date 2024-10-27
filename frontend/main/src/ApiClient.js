// src/ApiClient.js
import axios from 'axios';

// Set up an axios instance with base configurations
const ApiClient = axios.create({
    baseURL: 'http://10.39.55.21:5000',  // Replace with your Flask server's IP address
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
});

// Example function for generating a recipe
const generateRecipe = (ingredients, proteinGoal) => {
    return ApiClient.post('/generate-recipe', {
        ingredients,
        proteinGoal
    });
};

// Another example for testing connection
const testConnection = () => {
    return ApiClient.get('/test-connection');
};

// Export functions or the client itself
export default { generateRecipe, testConnection };
