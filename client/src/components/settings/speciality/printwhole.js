import React, { Component } from "react";
import axios from "axios";
import Logo from "../../common/logo";
import {Link} from "react-router-dom";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = { speciality: [] };
    this.onPrint = this.onPrint.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/speciality")
      .then(response => {
        this.setState({ speciality: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/speciality")
      .then(response => {
        this.setState({ speciality: response.data });
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
    const speciality = this.state.speciality;
    return (
      <div> 
      <button className="btn btn-success mt-5 mb-4" onClick={this.onPrint}>
   Print
 </button>
      <Link to="/api/speciality" className="btn btn-dark mt-4 ml-4" id="hide">
      Back to List
      </Link>
      <div className="mt-4 mb-4" style={{ border: "1px solid black", padding: "10px"}}>
      <Logo/>
        <h4 align="center" style={{ marginTop: "20px" }}>
         Speciality List
        </h4>
        <table className="table table-bordered mb-4" style={{ marginTop: 20 }} id="css-serial">
          <thead className="text-center">
            <tr>
            <th>No</th>
              <th>Speciality</th>
              <th>Description</th>
            </tr>
          </thead>
          {speciality.map(
            ({
              _id,
              speciality,
              description
            }) => (
              <tbody key={speciality._id}>
                <tr>
                <td></td>
                  <td>{speciality}</td>
                  <td>{description}</td>
                </tr>
              </tbody>
            )
          )}
        </table>
        <p className="text-center mt-4 mb-4">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
      </div>
      </div>
     
    );
  }
}

export default printWhole;


