// src/App.js
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';

import './App.css';
import CpuList from './components/CpuList';
import MemoryList from './components/MemoryList';
import MotherboardList from './components/MotherboardList';

function App() {
    const handleButtonClick = () => {
        window.location.href = 'http://localhost:3000/';
    };
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <button className="client" onClick={handleButtonClick}>Client Main Page</button>
                </div>
                <div className="lists">
                    <Routes>
                        <Route path="/" element={<MemoryList/>}/>
                    </Routes>
                </div>
                <div className="lists">
                    <Routes>
                        <Route path="/" element={<CpuList/>}/>
                    </Routes>
                </div>

                <div className="lists">
                    <Routes>
                        <Route path="/" element={<MotherboardList/>}/>
                    </Routes>
                </div>
            </div>
        </Router>

    );
}

export default App;
