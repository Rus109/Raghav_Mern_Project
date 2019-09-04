import React, { Component } from 'react';
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";

var BASE_URL = "http://localhost:3000/";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
      console.log(this.props.employeeImage);
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
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

  number = row => {
    return <div>{row.index + 1}.</div>;
  };

  render() {
    const employees = this.state.employees;

    return (
      <div className="mt-5 mb-5" style={{ fontSize: "15px" }}>
      <button className="btn btn-info ml-5" onClick={this.onPrint}>
      Print
    </button>
     <Link
            to="/api/employees"
            className="btn btn-dark"
            style={{ marginLeft: "75%" }}
            id="hide"
          >
            Back to List
          </Link> 
        
        <Logo />
        <h4 align="center" className="mt-4 mb-4">
          Employees List
        </h4>
        <table
        className="table table-bordered mb-4 mt-5 text-center"
        id="css-serial"
        style={{ padding: "10px 15px"}}
      >
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Speciality</th>
            <th>Designation</th>
            <th>Contact Number</th>
            <th>Alternate Contact Number</th>
            <th>Address</th>
            <th>Image</th>
          </tr>
        </thead>
        {employees.map(
          ({ _id, name, email, speciality, designation, contactno, alternatecontactno, address, imageName  }) => (
            <tbody key={_id}>
              <tr>
                <td />
                <td>{name}</td>
                <td>{email}</td>
                <td>{Object.entries(speciality)[1].slice(1)}</td>
                <td>{Object.entries(designation)[1].slice(1)}</td>
                <td>{contactno}</td>
                <td>{alternatecontactno}</td>
                <td>{address}</td>
                <td>{
                  <img
                  className="img-thumbnail"
                  src={BASE_URL + "employees/docs/" + imageName}
                  alt="No Data"
                  style={{ width: "100px", height: "50px" }}
                />
              }
                </td>
              </tr>
            </tbody>
          )
        )}
        </table>
       
      </div>
    )
  }
}

export default printWhole;