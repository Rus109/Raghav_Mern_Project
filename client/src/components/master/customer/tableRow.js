import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // post: []
    };
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "http://localhost:4000/api/customer/delete/" +
          this.props.obj._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.customername}</td>
        <td>
        {Object.entries(this.props.obj.customertype)[1]
            .slice(1)
            .map(function(object, i) {
              return <p key={i}>{object}</p>;
            })} 
        </td>
        <td>{this.props.obj.contactno}</td>
        <td>{this.props.obj.alternatecontactno}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.fax}</td>
        <td>{this.props.obj.address}</td>
        <td  style={{ paddingTop: "2%" }}>
          <button onClick={this.delete} className="btn btn-danger">
          <i className="fas fa-trash" />
          </button>
        </td>
        <td  style={{ paddingTop: "2%" }}>
          <Link
            to={"/api/customer/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
          <i className="fas fa-pencil-alt" />
          </Link>
        </td>
        <td>
        <Link to={"/api/customer/print/" + this.props.obj._id} className="btn btn-dark ml-1" >
        <i className="fas fa-eye" />
      </Link>
        </td>
      </tr>
    );
  }
}
export default TableRow;
