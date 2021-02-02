import React from 'react';
import './Body.css';

import { useHistory } from "react-router-dom";
import NotesIcon from '@material-ui/icons/Notes';
import RateReviewIcon from '@material-ui/icons/RateReview';

function Body() {
  const history = useHistory();
  const notesHandler=()=>{
    history.push('/wrapper/notes');
  }
  localStorage.getItem('token')
  return (
    <div className="body1">
      {/* <Link to="https://reactjs.org/" target="_blank"> */}
        <div className="body_notes" onClick={notesHandler}>
          <h3>
            <NotesIcon className="body_icon" /> Notes
          </h3>
        </div>
      {/* </Link> */}
      {/* <Link to="https://reactjs.org/" target="_blank"> */}
        <div className="body_discussion">
          <h3>
            <RateReviewIcon className="body_icon" /> Discussion
          </h3>
        </div>
      {/* </Link> */}
    </div>
  );
}

export default Body;
