import { Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
function AlertDismissible(show) {
  const [login, setLogin] = useState(false);
  const loginHandler = () => {
    setLogin(true);
  };
  if (login) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <>
      <alert>
        <Alert show={show} className="alert-fixed" variant="success">
          <Alert.Heading>Congratulations!</Alert.Heading>
          <p>Your account has been successfully created.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={loginHandler} variant="outline-success">
              Login
            </Button>
          </div>
        </Alert>
      </alert>
    </>
  );
}
export default AlertDismissible;
