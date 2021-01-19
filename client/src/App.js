import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation.js';
import Body from './Components/Body/Body.js';
import Wrapper from './Components/Wrapper.js';
import Home from './Components/Home/Home.js';

const App = () => {
  const [user, setUser] = useState(null);
  const login = () => {
    setUser(true);
  };
  return (
    <Router>
      {!user ? (
        <Home user={user} login={login} />
      ) : (
        <>
          <Wrapper>
            <Navigation />
            <Body />
          </Wrapper>
        </>
      )}
    </Router>
  );
};

export default App;
