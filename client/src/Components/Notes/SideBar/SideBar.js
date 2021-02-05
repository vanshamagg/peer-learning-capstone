import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SideBar.css';
import SideBarOption from './SideBarOption.js';


function Sidebar({ OnClick, AllCategories }) {
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState(['']);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/resource/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      setCategories(response.data);
    });
  }, []);
  console.log(categories);
  return (
    <div className="notes_sidebar">
      <SideBarOption title="All Categories"  AllCategories={AllCategories} all key={98}/>
      {categories.map((category) => (
        <SideBarOption title={category.name} OnClick={OnClick}  key={category.id} />
      ))}
    
    </div>
  );
}

export default Sidebar;
