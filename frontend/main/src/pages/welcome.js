import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import { ReactComponent as GhostIcon } from './ghost.svg'; // Assuming the SVG file is named `ghost.svg`

function Welcome() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/main');  // Navigates to the Main page
    };

    return (
        <div className="welcome-container">
            <div className="ghost-circle">
                <GhostIcon className="ghost-icon" />
            </div>
            <h1 className="title">Kiwi Bot 1.0</h1>
            <p className="description">
                Searching for tasty, high-protein dishes that you can make with the things you already own? You're in the right place!
            </p>
            <button className="get-started-button" onClick={handleGetStarted}>
                Get Started</button>
        </div>
    );
}

export default Welcome;
