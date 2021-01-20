import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation.js';
import Body from './Components/Body/Body.js';
import Wrapper from './Components/Wrapper.js';
import Home from './Components/Home/Home.js';
import Login from './Components/Login/Login.js';
import SignUp from './Components/SignUp/SignUp.js';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Navigation />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/signup" component={SignUp} />

      <Route exact path="/wrapper" component={Wrapper} />
    </Router>
  );
};

export default App;
