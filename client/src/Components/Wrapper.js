import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import Body from './Body/Body.js';
function Wrapper() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  if (token == null) {
    setIsLoggedIn(false);
  }
  if (isLoggedIn === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="wrapper">
    
      <Body />
    </div>
  );
}

export default Wrapper;
