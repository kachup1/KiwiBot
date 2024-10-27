import React from 'react';
import { useLocation } from 'react-router-dom';
import './results.css';

function Results() {
    const location = useLocation();
    const recipe = location.state?.recipe; // Access the recipe from the state

    return (
        <div className="results-container">
            <h1>Kiwi's Suggestions...</h1>
            {recipe ? (
                <div className="recipe-box">
                    <p>{recipe}</p>
                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
            <div className="button-group">
                <button className="copy-button">Copy</button>
                <button className="retry-button" onClick={() => window.history.back()}>Retry</button>
            </div>
        </div>
    );
}

export default Results;
