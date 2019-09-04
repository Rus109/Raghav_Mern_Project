import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  componentWillMount() {
    // this.setState({ post: this.props.obj.productcategoryid });
    console.log(this.props.obj.customer);
  }
  delete() {
    axios
      .delete(
        "http://localhost:4000/api/customersubdepartment/delete/" +
          this.props.obj._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.department}</td>
        <td>
          {Object.entries(this.props.obj.customer)[1]
            .slice(1)
            .map(function(object, i) {
              return <p key={i}>{object}</p>;
            })}
        </td>
        <td>{this.props.obj.description}</td>
        <td style={{ paddingTop: "2%" }}>
          <button onClick={this.delete} className="btn btn-danger">
            <i className="fas fa-trash" />
          </button>
        </td>
        <td style={{ paddingTop: "2%" }}>
          <Link
            to={"/api/customersubdepartment/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
            <i className="fas fa-pencil-alt" />
          </Link>
        </td>
        <td>
        <Link to={"/api/customersubdepartment/print/" + this.props.obj._id} className="btn btn-dark ml-1" >
        <i className="fas fa-eye" />
      </Link>
        </td>
      </tr>
    );
  }
}
