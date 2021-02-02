import React, { useState, useEffect } from 'react';
import AlertDismissible from './AlertDismissible'
import Navigation from '../Navigation/Navigation.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { Form, Button, Col,  } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function SignUp() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [countryapi, setCountryapi] = useState([]);
  const [stateapi, setStateapi] = useState([]);
  const [cityapi, setCityapi] = useState([]);
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    email: '',
    insti_name: '',
    insti_type: '',
    gender: '',
    mobile: '',
    country: '',
    city: '',
    state: '',
    dob: '',
  });

  const {
    firstname,
    middlename,
    lastname,
    username,
    password,
    password2,
    email,
    insti_name,
    insti_type,
    gender,
    mobile,
    country,
    city,
    state,
    dob,
  } = formData;

  // COUNTRY HANDLER
  const countryHandler = () => {
    try {
      const res = axios({
        method: 'get',
        url: 'https://api.countrystatecity.in/v1/countries',
        headers: {
          'X-CSCAPI-KEY': 'b0NzelBwR204aDZmeWR0cEk4RzFscWlacjJMZUxMN1lhcEdUMFEydw==',
        },
      }).then((response) => {
        setCountryapi(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // STATE HANDLER
  const stateHandler = async (st) => {
    try {
      const res = await axios({
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${st}/states`,
        headers: {
          'X-CSCAPI-KEY': 'b0NzelBwR204aDZmeWR0cEk4RzFscWlacjJMZUxMN1lhcEdUMFEydw==',
        },
      }).then((response) => {
        setStateapi(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // CITY HANDLER
  const cityHandler = async (st, ct) => {
    try {
      axios({
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${st}/states/${ct}/cities`,
        headers: {
          'X-CSCAPI-KEY': 'b0NzelBwR204aDZmeWR0cEk4RzFscWlacjJMZUxMN1lhcEdUMFEydw==',
        },
      }).then((response) => {
        setCityapi(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    countryHandler();
  }, []);
  const st = countryapi.filter((item) => item.name === country).map((item) => item.iso2);
  const ct = stateapi.filter((item) => item.name === state).map((item) => item.iso2);

  useEffect(() => {
    stateHandler(st);
  }, [country]);
  useEffect(() => {
    cityHandler(st, ct);
    // cityHandler();
  }, [state]);

  // ONCHANGE FUNCTION FORM DATA
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    }
    const data = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      insti_name: insti_name,
      insti_type: insti_type,
      gender: gender,
      mobile: mobile,
      country: country,
      city: city,
      state: state,
      dob: dob,
    };
    console.log(data);
    // }
   await axios
      .post('https://studygram-dev.herokuapp.com/api/user', data)
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        setIsRegistered(true);
        setShow(true);
      })
      .catch((err) =>  {
       const error = (err.response.data.error);
      //  error.map(err => err)
       alert(error.map(err => err));
      } )
  };

  return (
    <>
      <div className="signUp">
        <Form onSubmit={signupSubmit}>
          <h2>Sign Up</h2>
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  name="middlename"
                  value={middlename}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Id"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Institute name"
                  name="insti_name"
                  value={insti_name}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  type="text"
                  placeholder="Institue Type"
                  className="select"
                  name="insti_type"
                  value={insti_type}
                  onChange={onChange}
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group className="signUp_radio">
                <Form.Check
                  type="radio"
                  onChange={onChange}
                  label="female"
                  name="gender"
                  value="female"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={onChange}
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Other"
                  name="gender"
                  value="other"
                  onChange={onChange}
                  id="formHorizontalRadios3"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={mobile}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Control
              as="select"
              type="text"
              placeholder="Country"
              className="select"
              name="country"
              value={country.name}
              onChange={onChange}
            >
              <option>Country</option>
              {countryapi.map((country) => (
                <option key={country.id}>{country.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  type="text"
                  placeholder="State"
                  className="select"
                  name="state"
                  value={state.name}
                  onChange={onChange}
                >
                  <option>State</option>
                  {stateapi.map((state) => (
                    <option key={state.id}>{state.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  type="text"
                  placeholder="City"
                  className="select"
                  name="city"
                  value={city.name}
                  onChange={onChange}
                >
                  <option>City</option>
                  {cityapi.map((city) => (
                    <option key={city.id}>{city.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>

          <Button variant="link" type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
      {isRegistered && <AlertDismissible show={show}/>}
    </>
  );
}

export default SignUp;
