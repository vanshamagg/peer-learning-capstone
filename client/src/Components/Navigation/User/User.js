import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import DateRangeIcon from '@material-ui/icons/DateRange';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import './User.css';
import { Container, Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import SchoolIcon from '@material-ui/icons/School';
function User() {
  const lname = localStorage.getItem('lname');
  const fname = localStorage.getItem('fname');
  const name = `${fname} ${lname}`;
  const [user, setUser] = useState('');
  const [resources, setResources] = useState('');
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

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
  useEffect(() => {
    axios({
      method: 'get',
      url: `/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      setUser(response.data);
      setResources(response.data.resources);
    });
  }, []);

  return (
    <div className="user">
      <Button className="btn">
        <Link to="/wrapper">
          {' '}
          <ArrowBackIcon />
          Back
        </Link>
      </Button>
      {user && (
        <Container className="user_card">
          <Row style={{width:'100%'}}>
            <Col sm={4} className="user_left">
              <Avatar className="user_left_icon">{getInitials(name, ' ')}</Avatar>
              <h3 >
                {user.firstname} {user.lastname}
              </h3>
              <p>
                <LocationOnIcon /> {user.country}
              </p>
            </Col>
            <Col sm={8} className="user_right">
              <h5>Contact Details</h5>
              <hr style={{ width: '90%' }} />
              <Row>
                <Col sm={6}>
                  <p>
                    {' '}
                    <EmailIcon /> Email
                  </p>
                  <p> {user.email}</p>
                </Col>
                <Col sm={6}>
                  <p>
                    {' '}
                    <PhoneAndroidIcon />
                    Mobile Number
                  </p>
                  <p>{user.mobile}</p>
                </Col>
              </Row>
              <h5>Personal Details</h5>
              <hr style={{ width: '90%' }} />
              <Row>
                <Col sm={6}>
                  <p>
                    {' '}
                    <SchoolIcon /> Institue
                  </p>
                  <p>{user.insti_name}</p>
                </Col>
                <Col sm={6}>
                  <p>
                    {' '}
                    <DateRangeIcon />
                    Age
                  </p>
                  <p>{calculate_age(user.dob)}</p>
                </Col>
              </Row>
              {resources.length !== 0 && (
                <>
                  <h5>Resources</h5>
                  <hr style={{ width: '90%' }} />

                  <Row>
                    <Col sm={10}>
                      {resources.map((file) => (
                        <span key={file.id}>{file.title} || </span>
                      ))}
                    </Col>
                  </Row>
                </>
              )}
              {user.MemberGroups.length !== 0 && (
                <>
                  <h5>Groups : </h5>
                  <hr style={{ width: '90%' }} />

                  <Row>
                    <Col sm={10}>
                      {user.MemberGroups.map((group) => (
                        <span key={group.id}>{group.name} || </span>
                      ))}
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default User;
