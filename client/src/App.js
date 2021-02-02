import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Routes from'./Components/Routes/Routes';

const App = () => {
  return (
    <Router>
     
      <Routes />
    </Router>
  );
};

export default (App);
