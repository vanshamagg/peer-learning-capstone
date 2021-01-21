import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Avatar from '@material-ui/core/Avatar';
function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    axios
      .post('https://studygram-dev.herokuapp.com/api/user/auth', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log(error));
  };

  if (isLoggedIn) {
    return <Redirect to="/Wrapper" />;
  }
  return (
    <div className="login">
      <Form onSubmit={(e) => loginHandler(e)}>
        <Avatar src="/broken-image.jpg" className="login_avatar" />
        <h2>Student Login </h2>
        <Form.Group controlId="formBasicEmail" className="login_email">
          <PersonIcon className="login_icon" />
          <Form.Control
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="login_password">
          <LockIcon className="login_icon" />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>
        <Button variant="link" type="submit" onClick={(e) => loginHandler(e)}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
