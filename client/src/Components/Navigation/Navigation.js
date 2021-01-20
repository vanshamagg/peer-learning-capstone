import React from 'react';
import './Navigation.css';
import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navigation() {
  return (
    <Navbar className="navigation">
       <LinkContainer to="/">
       <Navbar.Brand >
       
        <h1>StudyGram</h1>
      </Navbar.Brand>
       </LinkContainer>
     
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
