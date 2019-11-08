import React from 'react';
import './App.css';
//import Login from './components/login/Login';
import Home from './components/home/Home'
import Register from './components/register/Register'
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
