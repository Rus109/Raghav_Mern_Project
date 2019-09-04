import React  from "react";
import "../../css/ToggleButton.css";

const ToggleButton = props =>  (
      <div className="toggle-button" onClick={ props.drawerClickHandler }>
        <button className="toggle-button_line" />
        <button className="toggle-button_line" />
        <button className="toggle-button_line" />
      </div>
    );

export default ToggleButton;
