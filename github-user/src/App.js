import React from 'react';
import './App.css';

import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
    </Router>
  );
}



export default App;
