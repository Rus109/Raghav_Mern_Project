import React from 'react';
import '../css/DrawerToggleButton.css';

const drawerToggleButton = props =>(
  <button className="toggle-button" onClick={ props.click }>
  <div className="toggle-button_line"/>
  <div className="toggle-button_line"/>
  <div className="toggle-button_line"/>
  
  </button>
);

export default drawerToggleButton;  