import React, { Component } from 'react';
import axios from "axios";
import Logo from '../../common/logo';
import {Link} from "react-router-dom";

class printCustomer extends Component {
  constructor(props){
    super(props);
    this.state = {
      customername: "",
      customertype: [],
      customertypeid: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: "",
    };

  }
 
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/customer/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          customername: response.data.customername,
          customertypeid:  Object.entries(response.data.customertype)[1].slice(1),
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          email: response.data.email,
          fax: response.data.fax,
          address: response.data.address
        });
        console.log(Object.entries(response.data.customertype)[1].slice(1))
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/customertype")
      .then(response => {
        this.setState({ customertype: response.data });
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
        <Link
                  to="/api/customer"
                  className="btn btn-dark mt-4 ml-4"
                  id="hide"
                >
                  Back to List
                </Link>  
                <div className="mb-4 mt-4" style={{border: "2px solid black", marginTop: "4%"}}> 
       <Logo/>
       <h3 className="text-center mt-3">Customer Details</h3>
       <div className="mt-5" style={{paddingLeft:"25%", fontSize: "14px"}}>
       <div className="row">
      <div className="col-4" style={{fontWeight: "bold"}}><p>Customer Name:</p></div>
      <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.customername}</div>
       </div>
       <br/>
       <div className="row">
       <div className="col-4" style={{fontWeight: "bold"}}><p>Customer Type:</p></div>
       <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.customertypeid}</div>
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
       <br/>
       </div>
       <p className="text-center">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
       </div>
      </div>
    )
  }
}

export default printCustomer;