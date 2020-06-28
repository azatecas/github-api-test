import React, { useState } from 'react';
import './App.css';

import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPage from './components/UserPage';
import Nav from './components/Nav';
import SearchPage from './components/SearchPage';
import { connect } from 'react-redux';

function App({isSearching, searchResults}) {
  return (
    <Router>
    <Nav />
      <Switch>
        {!isSearching ? <Route exact path="/" component={Home} />
          :
          <Route exact path="/" component={SearchPage} />
        }
        
        <Route path="/:id" component={UserPage} />
      </Switch>
    </Router>
  );
}

const mapStateToProp = state => {
  return {
    isSearching: state.isSearching,
    searchResults: state.searchResults,
  }
}

export default connect(mapStateToProp,{})(App);
