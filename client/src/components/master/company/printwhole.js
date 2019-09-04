import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";
import "../../css/printWhole.css";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: []
    };
    this.onPrint = this.onPrint.bind(this);
    // this.onCountRowsCompanies = this.onCountRowsCompanies.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onPrint = e => {
    e.preventDefault();
    document.getElementById("hide").style.visibility = "hidden";
    document.getElementById("printButton").style.visibility = "hidden";
    window.print();
    document.getElementById("hide").style.visibility = "visible";
    document.getElementById("printButton").style.visibility = "visible";

  };


  render() {
    const company = this.state.company;

    return (
      <div>
        <button
          className="btn btn-info ml-5"
          onClick={this.onPrint}
          id="printButton"
        >
          Print
        </button>
        <Link
          to="/api/company"
          className="btn btn-dark"
          style={{ marginLeft: "75%" }}
          id="hide"
        >
          Back to List
        </Link>
        <div className="mt-4 mb-4">
          <Logo />
          <h4 align="center" style={{ marginTop: "20px" }}>
            Company List
          </h4>
          <table
            className="table table-bordered mb-4 mt-4 text-center"
            id="css-serial"
          >
            <tbody>
              <tr>
                <th>No</th>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Contact Number</th>
                <th>Alternate Contact Number</th>
                <th>Email</th>
                <th>Fax</th>
                <th>Address</th>
              </tr>

              {company.map(
                ({
                  _id,
                  companyname,
                  contactperson,
                  contactno,
                  alternatecontactno,
                  email,
                  fax,
                  address
                }) => (
                  <tr key={company._id}>
                    <td />
                    <td>{companyname}</td>
                    <td>{contactperson}</td>
                    <td>{contactno}</td>
                    <td>{alternatecontactno}</td>
                    <td>{email}</td>
                    <td>{fax}</td>
                    <td>{address}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/**Display Number of Companies
          <button className="btn btn-primary" onClick={this.onCountRowsCompanies}>Result</button>
          <div id="displayMessage" className="mt-4 mb-4"></div>
          */}

          <p className="text-center">
            Copyright &copy; {new Date().getFullYear()} Nice Infotech
          </p>
        </div>
      </div>
    );
  }
}

export default printWhole;
