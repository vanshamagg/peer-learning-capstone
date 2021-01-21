import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { Form, Button } from 'react-bootstrap';
function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { firstname, lastname, username, email, password, password2 } = formData;

  // making a controlled component
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const signupSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(data);
    // }
    axios
      .post('https://studygram-dev.herokuapp.com/api/user', data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  // if (password !== password2) {
  //   alert('Passwords do not match', 'danger');
  // }
  return (
    <div className="signUp">
      <Form onSubmit={signupSubmit}>
        <h2>Sign Up</h2>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={onChange}
          />
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="email Id"
              name="email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={onChange}
          />
        </Form.Group>
        {/*        
            <Form.Group>
              <Form.Control type="text" placeholder="username" />
            </Form.Group> */}

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="link" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
