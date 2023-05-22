// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CpuList from './components/CpuList';
import CpuForm from './components/CpuForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CpuList />} />
          <Route path="/cpu" element={<CpuList />} />
          <Route path="/cpu" element={<CpuForm />} />
          <Route path="/cpu/:id" element={<CpuForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
