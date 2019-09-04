import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";
import "../../css/printWhole.css";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onPrint = e => {
    e.preventDefault();
    document.getElementById("hide").style.visibility = "hidden";
    document.getElementById("printButton").style.visibility = "hidden";
    document.getElementById("css-serial").style.margin = "0px 10px 100px 0px";
    window.print();
    document.getElementById("hide").style.visibility = "visible";
    document.getElementById("printButton").style.visibility = "visible";
  };

  number = row => {
    return <div className="mr-5">{row.index + 1}.</div>;
  };

  render() {
    const customer = this.state.customer;

    return (
      <div>
        <button
          className="btn btn-info"
          onClick={this.onPrint}
          id="printButton"
        >
          Print
        </button>
        <Link
          to="/api/customer"
          className="btn btn-dark"
          style={{ marginLeft: "75%" }}
          id="hide"
        >
          Back to List
        </Link>
        <div>
          <Logo />
          <h4 align="center" style={{ marginTop: "20px" }}>
            Customer List
          </h4>
          <table
            className="table table-bordered mb-4 text-center"
            id="css-serial"
            style={{ marginTop: 20 }}
          >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Customer Name</th>
                <th>Customer Type</th>
                <th>Contact Number</th>
                <th>Alternate Contact Number</th>
                <th>Email</th>
                <th>Fax</th>
                <th>Address</th>
              </tr>
            </thead>
            {customer.map(
              ({
                _id,
                customername,
                customertype,
                contactno,
                alternatecontactno,
                email,
                fax,
                address
              }) => (
                <tbody key={_id}>
                  <tr>
                    <td />
                    <td>{customername}</td>
                    <td>{Object.entries(customertype)[1].slice(1)}</td>
                    <td>{contactno}</td>
                    <td>{alternatecontactno}</td>
                    <td>{email}</td>
                    <td>{fax}</td>
                    <td>{address}</td>
                  </tr>
                </tbody>
              )
            )}
          </table>
          <p className="text-center">
            Copyright &copy; {new Date().getFullYear()} Nice Infotech
          </p>
        </div>
      </div>
    );
  }
}

export default printWhole;
