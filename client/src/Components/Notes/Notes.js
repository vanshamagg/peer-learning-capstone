import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesMain from './NotesMain/NotesMain.js';
import SideBar from './SideBar/SideBar.js';
import './Notes.css';

function Notes() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const OnClick = (title) => {
    console.log(title);
    axios({
      method: 'get',
      url: `https://studygram-dev.herokuapp.com/api/resource/category/?q=${title}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setData(() => {
          setData(response.data.resources);
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="notes">
        <SideBar OnClick={OnClick} />
        <NotesMain />
      </div>
    </>
  );
}

export default Notes;
