import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home'
import Register from './components/register/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
