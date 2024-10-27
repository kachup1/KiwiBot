// ApiClient.js
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";  // Use your computer’s IP address here

const ApiClient = {
    generateRecipe: (proteinGoal, ingredients) =>
        axios.post(`${API_BASE_URL}/generate-recipe`, {
            proteinGoal,
            ingredients
        }),
};

export default ApiClient;
