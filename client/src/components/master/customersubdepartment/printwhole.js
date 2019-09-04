import React, { Component } from 'react';
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = { customersd: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersd: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersd: response.data });
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
    const customersd = this.state.customersd;

    return (
      <div className="mt-5 mb-5">
      <button className="btn btn-info ml-5" onClick={this.onPrint}>
      Print
    </button>
     <Link
            to="/api/customersubdepartment"
            className="btn btn-dark"
            style={{ marginLeft: "75%" }}
            id="hide"
          >
            Back to List
          </Link> 
          <div className="mt-4 mb-4 p-3" style={{ border: "1px solid black" }}>
        <Logo />
        <h4 align="center" className="mt-4 mb-5">
          Customer Sub Department List
        </h4>
        <table
          className="table table-bordered mb-4 text-center"
          id="css-serial"
          style={{ marginTop: 20 }}
        >
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Department</th>
              <th>Customer</th>
              <th>Description</th>
            </tr>
          </thead>
          {customersd.map(
            ({ _id, department, customer, description }) => (
              <tbody key={_id}>
                <tr>
                  <td />
                  <td>{department}</td>
                  <td>{Object.entries(customer)[1].slice(1)}</td>
                  <td>{description}</td>
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
    )
  }
}

export default printWhole;