import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Avatar from '@material-ui/core/Avatar';
function Login() {
  const [loading, setLoading] = useState(false);
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
    await axios
      .post('https://studygram-dev.herokuapp.com/api/user/auth', data)
      .then((response) => {
        setLoading(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('fname', response.data.firstname);
        localStorage.setItem('lname', response.data.lastname);
        localStorage.setItem('id', response.data.id);
        setIsLoggedIn(true);
      })
      .catch((error) => alert('Invalid Credentials'));
  };

  if (isLoggedIn) {
    return <Redirect to="/wrapper" />;
  }
  return (
    <>
      {/* <Navigation /> */}
      <div className="login">
        <Form onSubmit={(e) => loginHandler(e)}>
          <Avatar className="login_avatar" />
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
          <Button variant="link" type="submit" onClick={(e) => loginHandler(e)} disabled={loading}>
            {loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}{' '}
            Login
          </Button>
          <p>
            Not on StudyGram yet? <Link to="/signup"> Sign up</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Login;
