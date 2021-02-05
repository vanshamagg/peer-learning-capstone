import React,{useState} from 'react';
import {Alert,Button} from 'react-bootstrap';

function AlertDismissible() {

  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>File Uploaded Successfully!!</Alert.Heading>

        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;
