import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import { ReactComponent as LiftingGhost } from './lifting_ghost.svg';

function Main() {
    const [proteinGoal, setProteinGoal] = useState('');
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    // Function to read the local text file and find matching recipes
    const loadRecipes = async (ingredientList) => {
        try {
            // Fetch the recipes.txt file from the public folder
            const response = await fetch('/recipes.txt');
            const data = await response.text();

            // Split the file content into individual recipes
            const recipeList = data.split('\n\n');  // Assume recipes are separated by two new lines

            // Filter recipes that match the user's ingredients
            const matchedRecipes = recipeList.filter(recipe => {
                const ingredientsLine = recipe.split('\n')[1];  // Get the Ingredients line
                const recipeIngredients = ingredientsLine.replace('Ingredients: ', '')
                    .split(', ')
                    .map(ingredient => ingredient.toLowerCase().trim());  // Normalize ingredients to lowercase and trim spaces

                // Check if all user ingredients (also normalized) are in the recipe
                return ingredientList.every(userIngredient =>
                    recipeIngredients.some(recipeIngredient =>
                        recipeIngredient.includes(userIngredient.toLowerCase())
                    )
                );
            });

            return matchedRecipes;
        } catch (error) {
            console.error('Error reading recipes file:', error);
            return [];
        }
    };

    const handleGenerate = async () => {
        const ingredientList = ingredients
            .split("\n")
            .map(item => item.trim().toLowerCase())  // Normalize user input to lowercase and trim spaces
            .filter(item => item);  // Filter out empty items to avoid sending invalid data

        // Check if the ingredient list is empty
        if (ingredientList.length === 0) {
            alert("Please enter at least one valid ingredient.");
            return;
        }

        // Load and match recipes
        const matchedRecipes = await loadRecipes(ingredientList);

        if (matchedRecipes.length > 0) {
            navigate('/results', { state: { recipe: matchedRecipes.join('\n\n') } });
        } else {
            alert("No matching recipes found.");
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
