import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { Form, Button, Col, Row } from 'react-bootstrap';
function SignUp() {
  return (
    <div className="signUp">
      <Form>
        <h2>Sign Up</h2>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
        <Row>
          <Col xs="auto">
            <Form.Control placeholder="First name" />
          </Col>
          <Col xs="auto">
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control type="email" placeholder="Email Id" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="link" type="submit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
