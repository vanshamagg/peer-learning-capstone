import { Alert, Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
function AlertDismissible(show) {
  return (
    <>
   
        <Alert show={show} className="alert-fixed" variant="success">
          <Alert.Heading>Congratulations!</Alert.Heading>
          <p>Your account has been successfully created.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="/login">
              <Button variant="outline-success">Login</Button>
            </Link>
          </div>
        </Alert>
      
    </>
  );
}
export default AlertDismissible;
