import React from 'react';
import Main from './pages/main';
import './App.css'; // Ensure this line is present

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                {/* Other Routes */}
            </Routes>
        </Router>
    );
}

export default App;
