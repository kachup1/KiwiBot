// main.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import { ReactComponent as LiftingGhost } from './lifting_ghost.svg';
import ApiClient from '../ApiClient';

function Main() {
    const [proteinGoal, setProteinGoal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const handleGenerate = async () => {
        try {
            // Make the API call to generate the recipe
            const response = await ApiClient.generateRecipe(
                proteinGoal,
                ingredients.split("\n").map(item => item.trim())
            );

            // Check if response is valid and navigate
            if (response.data && response.data.recipe) {
                navigate('/results', { state: { recipe: response.data.recipe } });
            } else {
                console.error("Invalid response data:", response);
                alert("Failed to generate a recipe. Please try again.");
            }
        } catch (error) {
            console.error("Error generating recipe:", error);
            alert("There was an error connecting to the server.");
        }
    };


    return (
        <div className="main-container">
            <div className="title">
                <h1>Your Meal <br /> Your Way!</h1>
            </div>
            <LiftingGhost className="lifting-ghost" />
            <div className="input-container">
                <label htmlFor="proteinGoal">Set Your Protein Goal:</label>
                <div className="protein-input">
                    <input
                        type="number"
                        id="proteinGoal"
                        placeholder="120"
                        value={proteinGoal}
                        onChange={(e) => setProteinGoal(e.target.value)}
                    />
                    <span>g</span>
                </div>
                <label htmlFor="ingredients">Enter Your Ingredients:</label>
                <textarea
                    id="ingredients"
                    placeholder="Ground Beef\nBroccoli\nEggs\nCabbage\nOnion..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                ></textarea>
                <button className="generate-button" onClick={handleGenerate}>
                    Generate
                </button>
            </div>
        </div>
    );
}

export default Main;
