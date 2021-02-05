import React from 'react';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import './SideBarOption.css'

function SideBarOption({ Icon, title, id, OnClick, AllCategories, all }) {
  return (
    <div onClick={all ? () => AllCategories() : () => OnClick(title)} className="sidebar_option" >
      <h5>
        {' '}
        <ArrowRightRoundedIcon />
        {title}{' '}
      </h5>{' '}
    </div>
  );
}

export default SideBarOption;
