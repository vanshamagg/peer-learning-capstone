import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './SideBar.css';
import SideBarOption from './SideBarOption.js';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentRoundedIcon from '@material-ui/icons/InsertCommentRounded';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function Sidebar({ OnClick }) {
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState(['']);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://studygram-dev.herokuapp.com/api/resource/categories`,
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
      {categories.map((category) => (
        <SideBarOption title={category.name} OnClick={OnClick} />
      ))}
      {/* <SideBarOption Icon={InsertCommentRoundedIcon} title="Threads" />
      <SideBarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SideBarOption Icon={DraftsIcon} title="Saved items" />
      <SideBarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SideBarOption Icon={PeopleAltIcon} title="People & user groups" /> */}
    </div>
  );
}

export default Sidebar;
