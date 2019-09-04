import React, { Component } from 'react';
import axios from "axios";
import Logo from '../../common/logo';
import { Link } from "react-router-dom";

class printService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      companyid: "",
      serviceprovider: [],
      srvprd: "",
      centername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      zipcode: "",
      fax: "",
      address: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        "http://localhost:4000/api/servicecenter/edit/" +
        this.props.match.params.id
      )
      .then(response => {
        this.setState({
          companyid: Object.entries(response.data.company)[1].slice(1),
          srvprd: Object.entries(response.data.serviceprovider)[1].slice(1),
          centername: response.data.centername,
          contactperson: response.data.contactperson,
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          zipcode: response.data.zipcode,
          fax: response.data.fax,
          address: response.data.address
        });
        // console.log(Object.entries(response.data.company)[1].slice(1));
        // console.log(Object.entries(response.data.serviceprovider)[1].slice(1));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
      })
      .catch(function (error) {
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
          to="/api/servicecenter"
          className="btn btn-dark mt-4 ml-4"
          id="hide"
        >
          Back to List
                </Link>
        <div className="mb-4 mt-4" style={{ border: "2px solid black", marginTop: "4%" }}>
          <Logo />
          <h3 className="text-center mt-3">Service Center Details</h3>
          <div className="mt-5" style={{ paddingLeft: "25%", fontSize: "14px" }}>
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>OEM:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.companyid}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Service Provider:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.srvprd}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Center Name:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.centername}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Contact Person:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.contactperson}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Contact Number:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.contactno}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Alternate Contact Number:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.alternatecontactno}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Zip Code:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.zipcode}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Fax:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.fax}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Address:</p>
              </div>
              <div style={{ border: "1px solid black", padding: "5px", width: "300px" }}>{this.state.address}</div>
            </div>
            <br />
          </div>
          <p className="text-center">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
        </div>
      </div>
    )
  }
}

export default printService;
