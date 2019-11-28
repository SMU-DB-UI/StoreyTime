import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home'
import Polls from './components/polls/Polls'
import Register from './components/register/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <div className='AppBackground'>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route component={Login} />
          </Switch>
        </BrowserRouter>
      </div >
    </div >
  );
}

export default App;
