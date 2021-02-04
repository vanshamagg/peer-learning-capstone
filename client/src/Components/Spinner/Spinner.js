import React, { Fragment } from "react";
import spinner from "./spinner.gif";
import './Spinner.css'


export default () => (
  <div className="spinner">
    <img
      src={spinner}
    
      alt="Loading..."
    />
  </div>
);
