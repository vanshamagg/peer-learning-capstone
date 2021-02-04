import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Card, Button } from 'react-bootstrap';
function Home() {
  return (
    <div className="home">
      <Card className="home_card">
        <Card.Body>
          <Card.Title>
            <h2>StudyGram</h2>
          </Card.Title>
       
            <p>Learn,Share,Discuss...</p>
          
          <Link to="/login">
            <Button variant="link" block >
              Login
            </Button>
          </Link>
          <Link to="/signup" >
            <Button variant="link" block>
              Sign Up
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
