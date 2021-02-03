import React, { useState, useEffect } from 'react';
import NotesMain from './NotesMain/NotesMain.js'
import SideBar from  './SideBar/SideBar.js'

import './Notes.css';

function Notes() {
 
  return (
    <>
      <div className="notes">
        {/* <SideBar/> */}
        <NotesMain/>

      </div>
    </>
  );
}

export default Notes;
