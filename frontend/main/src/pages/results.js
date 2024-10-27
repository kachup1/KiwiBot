import React from 'react';
import { useLocation } from 'react-router-dom';
import './results.css';
import { ReactComponent as ForkGhost } from './ghost_with_forks.svg';

function Results() {
    const location = useLocation();
    const { recipe } = location.state || { recipe: "No recipe generated." };

    // Split the recipes into individual recipes by recognizing the separator (double newlines)
    const recipeList = recipe.split('\n\n').map((recipeItem, index) => (
        <li key={index} className="recipe-item">
            {recipeItem}
        </li>
    ));

    const handleCopy = () => {
        navigator.clipboard.writeText(recipe);
        alert('Recipes copied to clipboard!');
    };

    const handleRetry = () => {
        window.location.href = '/main';  // Redirect to the main page
    };

    return (
        <div className="results-container">
            <ForkGhost className="forkghost" />
            <h1 className="suggestions-title">Kiwi's Suggestions...</h1>
            <div className="recipe-card">
                <ol className="recipe-list">
                    {recipeList}
                </ol>
            </div>
            <div className="button-container">
                <button className="copy-button" onClick={handleCopy}>Copy</button>
                <button className="retry-button" onClick={handleRetry}>Retry</button>
            </div>
        </div>
    );
}

export default Results;
