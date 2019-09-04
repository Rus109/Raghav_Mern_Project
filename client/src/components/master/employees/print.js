import React, { Component } from 'react';
import axios from "axios";
import Logo from '../../common/logo';
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class printEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      speciality: [],
      specialityid: "",
      designation: [],
      designationid: "",
      contactno: "",
      alternatecontactno: "",
      address: "",
      employeeImage: ""
    };
  }
  componentWillMount() {
    axios
      .get("http://localhost:4000/api/employees/edit/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          specialityid: Object.entries(response.data.speciality)[1].slice(1),
          designationid: Object.entries(response.data.designation)[1].slice(1),
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          address: response.data.address,
          employeeImage: response.data.imageName
        });
        // console.log(Object.entries(response.data.speciality)[0].slice(1))
        // console.log(Object.entries(response.data.designation)[0].slice(1))
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/speciality")
      .then(response => {
        this.setState({ speciality: response.data });
        console.log(this.state.speciality);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/designation")
      .then(response => {
        this.setState({ designation: response.data });
        console.log(this.state.designation);
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
          to="/api/employees"
          className="btn btn-dark mt-4 ml-4"
          id="hide"
        >
          Back to List
                </Link> 
        <div className="mb-4 mt-4" style={{ border: "2px solid black", marginTop: "4%" }}>
          <Logo />
          <h3 className="text-center mt-3">Employee Details</h3>
          <div className="form-group">
            <img
              className="rounded-circle mb-2 mt-4"
              src={BASE_URL + "employees/docs/" + this.state.employeeImage}
              alt="No Data"
              style={{ width: "250px", height: "200px", marginLeft: "40%" }}
            />
          </div>
          <div className="mt-5" style={{ paddingLeft: "25%", fontSize: "14px" }}>
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Name:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.name}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Email:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.email}</div>
            </div>
            <br/>
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Speciality:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.specialityid}</div>
            </div>
            <br />
            <div className="row">
              <div className="col-4" style={{ fontWeight: "bold" }}><p>Designation:</p></div>
              <div style={{ border: "1px solid black", padding: "5px", width: "200px" }}>{this.state.designationid}</div>
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

export default printEmployees;
