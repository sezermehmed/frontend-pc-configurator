// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import './App.css';
import CpuList from './components/CpuList';
import CpuForm from './components/CpuForm';
import MemoryList from './components/MemoryList';
import MemoryForm from './components/MemoryForm';
import MotherboardList from './components/MotherboardList';
function App() {
  const handleButtonClick = () => {
    window.location.href = 'http://localhost:3000/';
  };
  return (
    <Router>
      <div className="App">
      <div class="container">
      <button className="adminPanel" onClick={handleButtonClick}> Client Main Page </button>
      </div>
        <Routes>
          <Route path="/" element={<MemoryList />} />
          <Route path="/memory" element={<MemoryList />} />
          <Route path="/memory" element={<MemoryForm />} />
          <Route path="/memory/:id" element={<MemoryForm />} />
        </Routes>
        <Routes>
          <Route path="/" element={<CpuList />} />
          <Route path="/cpu" element={<CpuList />} />
          <Route path="/cpu" element={<CpuForm />} />
          <Route path="/cpu/:id" element={<CpuForm />} />
        </Routes>
        <Routes>
          <Route path="/" element={<MotherboardList />} />
          <Route path="/motherboard" element={<MotherboardList />} />
          <Route path="/cpu" element={<CpuForm />} />
          <Route path="/cpu/:id" element={<CpuForm />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
