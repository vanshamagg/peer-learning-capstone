import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import { Navbar, Nav, Button } from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './org2.png';
function Navigation() {
  const lname = localStorage.getItem('lname');
  const fname = localStorage.getItem('fname');
  const name = `${fname} ${lname}`;
  const [loggedOut, setLoggedOut] = useState(false);
  console.log(name);
  const history = useHistory();
  const getInitials = (name, delimeter) => {
    if (name) {
      const array = name.split(delimeter);
      switch (array.length) {
        case 1:
          return array[0].charAt(0).toUpperCase();
          break;
        default:
          return array[0].charAt(0).toUpperCase() + array[array.length - 1].charAt(0).toUpperCase();
      }
    }
    return false;
  };

  const HandleLogout = () => {
    localStorage.clear();
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Redirect to="/" />;
  }

  const id = localStorage.getItem('id');
 
  const UserHandler = () => {
    history.push(`/wrapper/${id}`);
  };
  return (
    <>
      {!localStorage.token ? (
        <Navbar className="navigation">
          <LinkContainer to="/wrapper">
            <Navbar.Brand>
              <img src={logo} alt="StudyGram" />
            </Navbar.Brand>
          </LinkContainer>
        </Navbar>
      ) : (
        <Navbar className="navigation">
          <LinkContainer to="/wrapper">
            <Navbar.Brand>
              <img src={logo} alt="StudyGram" />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <Avatar className="navigation_userIcon" onClick={UserHandler} >
              {getInitials(name, ' ')}
            </Avatar>

            <Button onClick={HandleLogout}>
              Logout <ExitToAppIcon />
            </Button>
          </Nav>
        </Navbar>
      )}
    </>
  );
}

export default Navigation;
