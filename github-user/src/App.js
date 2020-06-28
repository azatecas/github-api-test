import React from 'react';
import './App.css';

import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPage from './components/UserPage';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
    <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={UserPage} />
      </Switch>
    </Router>
  );
}



export default App;
