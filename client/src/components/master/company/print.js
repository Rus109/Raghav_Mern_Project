import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";

class printCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname: "",
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
        "http://localhost:4000/api/company/edit/" + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          companyname: response.data.companyname,
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
    document.getElementById("hide").style.visibility = "hidden";
    document.getElementById("main").style.fontSize = "x-large";
    document.getElementById("printButton").style.visibility = "hidden";
    window.print();
    document.getElementById("hide").style.visibility = "visible";
    document.getElementById("printButton").style.visibility = "visible";
    document.getElementById("main").style.fontSize = "14px";
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={this.onPrint}
          id="printButton"
        >
          Print
        </button>
        <Link to="/api/company" className="btn btn-dark ml-1" id="hide">
          Back to List
        </Link>
        <div className="mb-4 mt-2" style={{ border: "2px solid black" }}>
          <Logo />
          <h3 className="text-center mt-3" style={{ fontWeight: "bold" }}>
            Company Details
          </h3>
          <div
            className="mt-5"
            style={{ paddingLeft: "25%", fontSize: "14px" }}
            id="main"
          >
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Company Name:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "200px"
                }}
              >
                {this.state.companyname}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Contact Person:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "200px"
                }}
              >
                {this.state.contactperson}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Contact Number:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "200px"
                }}
              >
                {this.state.contactno}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4">
                <p>Alternate Contact Number:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  paddingLeft: "5px",
                  width: "200px"
                }}
              >
                {this.state.alternatecontactno}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Email:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "200px"
                }}
              >
                {this.state.email}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Fax:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "200px"
                }}
              >
                {this.state.fax}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}>
                <p>Address:</p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid black",
                  padding: "5px",
                  width: "300px"
                }}
              >
                {this.state.address}
              </div>
            </div>
          </div>
          <p className="text-center mt-5">
            Copyright &copy; {new Date().getFullYear()} Nice Infotech
          </p>
        </div>
      </div>
    );
  }
}

export default printCompany;
