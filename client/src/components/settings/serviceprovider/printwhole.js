import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import {Link} from "react-router-dom";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = { serviceprovider: [] };
    this.onPrint = this.onPrint.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
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
    const serviceprovider = this.state.serviceprovider;
    return (
      <div> 
      <button className="btn btn-success mt-5 mb-4" onClick={this.onPrint}>
   Print
 </button>
      <Link to="/api/serviceprovider" className="btn btn-dark mt-4 ml-4" id="hide">
      Back to List
      </Link>
      <div className="mt-4" style={{ border: "1px solid black", padding: "10px"}}>
      <Logo/>
        <h4 align="center" style={{ marginTop: "20px" }}>
         Service Provider List
        </h4>
        <table className="table table-bordered mb-4" style={{ marginTop: 20 }} id="css-serial">
          <thead className="text-center">
            <tr>
            <th>No</th>
              <th>Provider Name</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Alternate Contact Number</th>
              <th>Email</th>
              <th>Fax</th>
              <th>Address</th>
            </tr>
          </thead>
          {serviceprovider.map(
            ({
              _id,
              providername,
              contactperson,
              contactno,
              alternatecontactno,
              email,
              fax,
              address
            }) => (
              <tbody key={serviceprovider._id}>
                <tr>
                <td></td>
                  <td>{providername}</td>
                  <td>{contactperson}</td>
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
        <p className="text-center">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
      </div>
      </div>
     
    );
  }
}

export default printWhole;
