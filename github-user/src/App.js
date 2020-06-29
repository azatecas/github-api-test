import React, { useState } from 'react';
import './App.css';

import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPage from './components/UserPage';
import Nav from './components/Nav';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
    <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/:id" component={UserPage} />
      </Switch>
    </Router>
  );
}

export default App;
