import React, { Component } from "react";
import axios from "axios";
import Logo from '../../common/logo';
import {Link} from "react-router-dom";

class printServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: ""
    };
    this.onPrint = this.onPrint.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/serviceprovider/edit/" + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          providername: response.data.providername,
          contactperson: response.data.contactperson,
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          email: response.data.email,
          fax: response.data.fax,
          address: response.data.address
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onPrint = e => {
    e.preventDefault();
    document.getElementById("hide").style.visibility = "hidden";
    window.print();
    document.getElementById("hide").style.visibility = "visible";
  };

  render() {
    return (
      <div> 
      <button className="btn btn-success mt-5 mb-4" onClick={this.onPrint}>
   Print
 </button>
      <Link to="/api/serviceprovider" className="btn btn-dark mt-4 ml-4" id="hide">
      Back to List
      </Link>
      <div className="mb-4" style={{border: "2px solid black", marginTop: "4%"}}> 
       <Logo/>
       <h3 className="text-center mt-3">Service Provider Details</h3>
     <div className="mt-5" style={{paddingLeft:"25%", fontSize: "14px"}}>
     <div className="row">
    <div className="col-4" style={{fontWeight: "bold"}}><p>Provider Name:</p></div>
    <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.providername}</div>
     </div>
     <br/>
     <div className="row">
    <div className="col-4" style={{fontWeight: "bold"}}><p>Contact Person:</p></div>
    <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.contactperson}</div> 
    </div>
     <br/>
     <div className="row">
     <div className="col-4" style={{fontWeight: "bold"}}><p>Contact Number:</p></div>
     <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.contactno}</div> 
     </div>
      <br/>
     <div className="row">
     <div className="col-4" style={{fontWeight: "bold"}}><p>Alternate Contact Number:</p></div>
     <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.alternatecontactno}</div>
      </div>
      <br/>
      <div className="row">
      <div className="col-4" style={{fontWeight: "bold"}}><p>Email:</p></div>
      <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.email}</div>
      </div>
       <br/>
      <div className="row">
      <div className="col-4" style={{fontWeight: "bold"}}><p>Fax:</p></div>
      <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.fax}</div>
       </div>
        <br/>
    <div className="row">
    <div className="col-4" style={{fontWeight: "bold"}}>
    <p>Address:</p>
    </div>
    <div style={{border: "1px solid black", padding: "5px",  width: "300px"}}>{this.state.address}</div>
    </div>
     </div>
     <p className="text-center mt-5 mb-5">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
      </div>
      </div>
      
    );
  }
}

export default printServiceProvider;

