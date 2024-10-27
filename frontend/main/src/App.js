import React from 'react';
import Main from './pages/main';
import Welcome from './pages/welcome';
import Results from './pages/results';
import './App.css'; // Ensure this line is present

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/main" element={<Main />} />
                <Route path="/results" element={<Results />} />
                {/* Other Routes */}
            </Routes>
        </Router>
    );
}

export default App;
