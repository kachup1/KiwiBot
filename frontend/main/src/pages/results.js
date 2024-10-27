// results.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './results.css';

function Results() {
    const location = useLocation();
    const { recipe } = location.state || { recipe: "No recipe generated." };

    return (
        <div className="results-container">
            <h1>Your Recipe</h1>
            <div className="recipe-display">
                {recipe}
            </div>
        </div>
    );
}

export default Results;
