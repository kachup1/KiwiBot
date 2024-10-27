
import '../App.css';

import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [proteinGoal, setProteinGoal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');

    const generateRecipe = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-recipe', {
                protein_goal: proteinGoal,
                ingredients: ingredients
            });
            setRecipe(response.data.recipe);
        } catch (error) {
            console.error("Error generating recipe", error);
        }
    };

    return (
        <div className="App">
            <h1>KiwiBot Recipe Generator</h1>
            <input
                type="number"
                placeholder="Protein Goal (g)"
                value={proteinGoal}
                onChange={(e) => setProteinGoal(e.target.value)}
            />
            <textarea
                placeholder="List ingredients (one per line)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={generateRecipe}>Generate Recipe</button>
            <h2>Generated Recipe:</h2>
            <pre>{recipe}</pre>
        </div>
    );
}

export default App;
