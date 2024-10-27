import axios from 'axios';

const API_KEY = 'your_spoonacular_api_key';  // Replace with your Spoonacular API key
const API_BASE_URL = 'https://api.spoonacular.com';

const ApiClient = {
    generateRecipe: async (ingredients) => {
        // Ensure that ingredients is an array and not an empty array
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            throw new Error("Ingredients must be a non-empty array");
        }

        try {
            // Make the GET request to Spoonacular API
            const response = await axios.get(`${API_BASE_URL}/recipes/findByIngredients`, {
                params: {
                    ingredients: ingredients.join(','),  // Join ingredients into a string
                    apiKey: API_KEY,  // Spoonacular API key
                    number: 1,  // Limit to 1 recipe
                },
            });

            // Return the recipe data
            return response.data;

        } catch (error) {
            // Handle any errors that may occur during the request
            console.error("Error fetching recipe:", error);
            throw error;  // Re-throw the error so it can be handled by the caller
        }
    },
};

export default ApiClient;
