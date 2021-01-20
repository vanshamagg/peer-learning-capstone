import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://studygram-dev.herokuapp.com/';
ReactDOM.render(<App />, document.getElementById('root'));
