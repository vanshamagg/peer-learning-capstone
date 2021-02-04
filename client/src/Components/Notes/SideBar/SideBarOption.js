import React from 'react';

function SideBarOption({ Icon, title, id, OnClick }) {
  return (
    <div>
      <h5 onClick={() => OnClick(title)}>{title}</h5>
    </div>
  );
}

export default SideBarOption;
