import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import {Link} from "react-router-dom";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = { customertype: [] };
    this.onPrint = this.onPrint.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customertype")
      .then(response => {
        this.setState({ customertype: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
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
    document.getElementById("hide").style.visibility="hidden";
    window.print();
    document.getElementById("hide").style.visibility="visible";
  };

  render() {
    const customertype = this.state.customertype;
    return (
      <div className="mt-5 mb-5">
          <button className="btn btn-info ml-5" onClick={this.onPrint}>
          Print
        </button>
         <Link
                to="/api/customertype"
                className="btn btn-dark"
                style={{ marginLeft: "75%" }}
                id="hide"
              >
                Back to List
              </Link>
              <div className="mt-4" style={{ border: "1px solid black", padding: "10px"}}>
      <Logo/>
        <h4 className="text-center mt-5">
          Customer Type List
        </h4>
        <table className="table table-bordered mb-4" style={{ marginTop: 20 }} id="css-serial">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Customer Type</th>
              <th>Description</th>
            </tr>
          </thead>
          {customertype.map(
            ({
              _id,
              customertype,
              description
            }) => (
              <tbody key={customertype._id}>
                <tr>
                <td></td>
                  <td>{customertype}</td>
                  <td>{description}</td>
                </tr>
              </tbody>
            )
          )}
        </table>
        <p className="text-center">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
      </div>
      </div>
     
    );
  }
}

export default printWhole;

