import React from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Avatar from '@material-ui/core/Avatar';
function Login({ login, user }) {
  if (user) {
    return <Redirect to="/Wrapper" />;
  }
  return (
    <div className="login">
      <Form>
        <Avatar src="/broken-image.jpg" className="login_avatar" />
        <h2>Student Login </h2>
        <Form.Group controlId="formBasicEmail" className="login_email">
          <PersonIcon className="login_icon" />
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="login_password">
          <LockIcon className="login_icon" />
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="link" type="submit" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
