import React, { Component } from "react";
import header from "../layout/SideDrawer/logo_main.png";

var dateObj = new Date();
var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
var date = ('0' + dateObj.getDate()).slice(-2);
var year = dateObj.getFullYear();
var shortDate = date + '/' + month + '/' + year;

class LogoNice extends Component {
  render() {
    return (
      <div>
        <div className="row  mt-2">
          
            <img className="ml-3" src={header} alt="Header" style={{ width: "150px", height: "150px"}} />
          
          <div className="col">
            <div>
              <h4>Nice Infotech</h4>
              
             <p> 2nd Floor Geeta Bhawan, Thana Road, Police Bazaar, Shillong.</p>
             
              <p><i className="fas fa-phone"></i> 03642500260</p>
              
              <p><i className="fas fa-envelope-square"></i> admin@niceinfotech.co</p>
            </div>
          </div>
          <div className="col" style={{ padding: "10px", marginLeft: "20rem" }}>
            <p>Date: {shortDate}</p>
          </div>
        </div>
        <div style={{ borderBottom: "2px solid black"}} />
        
      </div>
    );
  }
}

export default LogoNice;
