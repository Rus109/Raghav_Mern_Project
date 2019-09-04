import React, { Component } from 'react';
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicecenter: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/servicecenter")
      .then(response => {
        this.setState({ servicecenter: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/servicecenter")
      .then(response => {
        this.setState({ servicecenter: response.data });
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

  number = row => {
    return <div className="mr-5">{row.index + 1}.</div>;
  };

  render() {
    const servicecenter = this.state.servicecenter;
    return (
      <div className="mt-5 mb-5">
        <button className="btn btn-info ml-5" onClick={this.onPrint}>
          Print
    </button>
        <Link
          to="/api/servicecenter"
          className="btn btn-dark"
          style={{ marginLeft: "75%" }}
          id="hide"
        >
          Back to List
  </Link>
        <div className="mt-4 mb-4 p-3" style={{ border: "1px solid black" }}>
          <Logo />
          <h4 align="center" style={{ marginTop: "20px" }}>
            Service Center List
        </h4>
          <table
            className="table table-bordered mb-4 text-center"
            id="css-serial"
            style={{ marginTop: 20 }}
          >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>OEM</th>
                <th>Service Provider</th>
                <th>Center Name</th>
                <th>Contact Person</th>
                <th>Contact Number</th>
                <th>Alternate Contact Number</th>
                <th>Zipcode</th>
                <th>Fax</th>
                <th>Address</th>
              </tr>
            </thead>
            {servicecenter.map(({ _id, company, serviceprovider, centername, contactperson, contactno, alternatecontactno, zipcode, fax, address}) => (
              <tbody id={_id}>
              <tr>
                  <td></td>
                  <td>{Object.entries(company)[1].slice(1)}</td>
                  <td>{Object.entries(serviceprovider)[1].slice(1)}</td>
                  <td>{centername}</td>
                  <td>{contactperson}</td>
                  <td>{contactno}</td>
                  <td>{alternatecontactno}</td>
                  <td>{zipcode}</td>
                  <td>{fax}</td>
                  <td>{address}</td>
              </tr>
              </tbody>
            ))}
            </table>
          </div>
      </div>
    )
  }
}

export default printWhole;
