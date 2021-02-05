import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesMain from './NotesMain/NotesMain.js';
import SideBar from './SideBar/SideBar.js';
import './Notes.css';

function Notes() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  const AllCategories = () => {
    setLoading(true);
    setTitle("All Categories");
    axios({
      method: 'get',
      url: '/resource/all',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setData(() => {
          setData(response.data);
        });
        setLoading(false);
      })

      .catch((error) => console.log(error));
  };
  useEffect(() => {
    AllCategories();
  }, []);

  const OnClick = (title) => {
    setLoading(true);
    setTitle(title);
    console.log(title);
    axios({
      method: 'get',
      url: `/resource/category/?q=${title}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setData(() => {
          setData(response.data.Resources);
        });
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="notes">
        <SideBar OnClick={OnClick} AllCategories={AllCategories} />
        <NotesMain data={data} loading={loading} title={title} AllCategories={AllCategories} />
      </div>
    </>
  );
}

export default Notes;
