import Home from './components/Home';
//import Surprise from './components/Surprise';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
//import New from './components/New';

// App.js - Main React component for the Birthday Site
// This file serves as the entry point for the React application
// It imports the Home component and renders it

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
