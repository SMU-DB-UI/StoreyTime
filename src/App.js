import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
