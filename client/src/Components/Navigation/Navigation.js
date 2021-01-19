import React from 'react';
import './Navigation.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navigation() {
  return (
    <Navbar className="navigation">
      <Navbar.Brand href="#home">
        {' '}
        <h1>StudyGram</h1>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            className="navigation_search"
          />
        </Form>
        <h2>
          <AccountCircleIcon className="navigation_userIcon" />
        </h2>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
