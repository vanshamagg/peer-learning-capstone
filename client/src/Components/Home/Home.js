import React from 'react';
import './Home.css';
import { Card, Button } from 'react-bootstrap';
function Home({ login }) {
  return (
    <div className="home">
      <Card className="home_card">
        <Card.Body>
          <Card.Title>
            <h2>StudyGram</h2>
          </Card.Title>
          <Card.Text>
            <p>Learn,Share,Discuss..</p>
          </Card.Text>
          <Button variant="link" block onClick={login}>
            Login
          </Button>
          <Button variant="link" block>
            Sign Up
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
