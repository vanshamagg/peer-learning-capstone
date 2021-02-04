import React from 'react';
import { Switch } from 'react-router-dom';
import Wrapper from '../Wrapper.js';
import Home from '../Home/Home.js';
import Notes from '../Notes/Notes.js';
import Login from '../Login/Login.js';
import SignUp from '../SignUp/SignUp.js';
import Navigation from '..//Navigation/Navigation.js';
import User from '..//Navigation/User/User';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute from './PublicRoute.js';

import { withRouter } from 'react-router-dom';
const Routes = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname !== '/' && <Navigation />}

      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PublicRoute restricted={true} component={SignUp} path="/signup" exact />
        <PrivateRoute component={Wrapper} path="/wrapper" exact />
        <PrivateRoute component={Notes} path="/wrapper/notes" exact />
        <PrivateRoute component={User} path="/wrapper/:id" exact />
      </Switch>
    </div>
  );
});

export default Routes;
