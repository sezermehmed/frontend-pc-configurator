// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CpuList from './components/CpuList';
import CpuForm from './components/CpuForm';
import MemoryList from './components/MemoryList';
import MemoryForm from './components/MemoryForm';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CpuList />} />
          <Route path="/cpu" element={<CpuList />} />
          <Route path="/cpu" element={<CpuForm />} />
          <Route path="/cpu/:id" element={<CpuForm />} />

          <Route path="/" element={<MemoryList />} />
          <Route path="/memory" element={<MemoryList />} />
          <Route path="/memory" element={<MemoryForm />} />
          <Route path="/memory/:id" element={<MemoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
