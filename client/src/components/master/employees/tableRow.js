import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
var BASE_URL = "http://localhost:3000/";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "http://localhost:4000/api/employees/delete/" + this.props.obj._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    console.log(this.props.obj._id);
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{Object.entries(this.props.obj.speciality)[1].slice(1)}</td>

        <td>{Object.entries(this.props.obj.designation)[1].slice(1)}</td>
        <td>{this.props.obj.contactno}</td>
        <td>{this.props.obj.alternatecontactno}</td>
        <td>{this.props.obj.address}</td>
        <td>
          <img
            className="img-thumbnail"
            src={BASE_URL + "employees/docs/" + this.props.obj.imageName}
            alt="No Data"
            style={{width: "90px", height: "50px"}}
          />
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            <i className="fas fa-trash" />
          </button>
        </td>
        <td>
          <Link
            to={"/api/employees/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
            <i className="fas fa-pencil-alt" />
          </Link>
        </td>
        <td>
        <Link to={"/api/employees/print/" + this.props.obj._id} className="btn btn-dark ml-1" >
        <i className="fas fa-eye" />
      </Link>
        </td>
      </tr>
    );
  }
}

export default TableRow;
