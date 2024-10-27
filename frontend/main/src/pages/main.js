import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import { ReactComponent as LiftingGhost } from './lifting_ghost.svg';
import ApiClient from '../ApiClient';

function Main() {
    const [proteinGoal, setProteinGoal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const handleProteinGoalChange = (event) => {
        setProteinGoal(event.target.value);
    };

    const handleIngredientsChange = (event) => {
        setIngredients(event.target.value);
    };

    const handleGenerate = () => {
        ApiClient.backendApi.generateRecipe({ proteinGoal, ingredients: ingredients.split(',') })
            .then(response => {
                // Navigate to Results page with the recipe data
                navigate('/results', { state: { recipe: response.data.recipe } });
            })
            .catch(error => {
                console.error("Failed to generate recipe:", error);
            });
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
                        onChange={handleProteinGoalChange}
                    />
                    <span>g</span>
                </div>
                <label htmlFor="ingredients">Enter Your Ingredients:</label>
                <textarea
                    id="ingredients"
                    placeholder="Ground Beef&#10;Broccoli&#10;Eggs&#10;Cabbage&#10;Onion..."
                    value={ingredients}
                    onChange={handleIngredientsChange}
                ></textarea>
                <button className="generate-button" onClick={handleGenerate}>
                    Generate
                </button>
            </div>
        </div>
    );
}

export default Main;
