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
        "http://localhost:4000/api/servicecenter/delete/" + this.props.obj._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  componentWillMount() {
    // this.setState({ post: this.props.obj.productcategoryid });
    console.log(this.props.obj.company);
    console.log(this.props.obj.serviceprovider);
  }
  render() {
    return (
      <tr>
        <td>
          {Object.entries(this.props.obj.company)[1]
            .slice(1)
            .map(function(item, i) {
              return <p key={i}>{item}</p>;
            })}
        </td>
        <td>
          {Object.entries(this.props.obj.serviceprovider)[1]
            .slice(1)
            .map(function(item, i) {
              return <p key={i}>{item}</p>;
            })}
        </td>
        <td>{this.props.obj.centername}</td>
        <td>{this.props.obj.contactperson}</td>
        <td>{this.props.obj.contactno}</td>
        <td>{this.props.obj.alternatecontactno}</td>
        <td>{this.props.obj.zipcode}</td>
        <td>{this.props.obj.fax}</td>
        <td>{this.props.obj.address}</td>
        <td style={{ paddingTop: "2%" }}>
          <button onClick={this.delete} className="btn btn-danger">
            <i className="fas fa-trash" />
          </button>
        </td>
        <td style={{ paddingTop: "2%" }}>
          <Link
            to={"/api/servicecenter/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
            <i className="fas fa-pencil-alt" />
          </Link>
        </td>
        <td>
        <Link to={"/api/servicecenter/print/" + this.props.obj._id} className="btn btn-dark ml-1" >
        <i className="fas fa-eye" />
      </Link>
        </td>
      </tr>
    );
  }
}
export default TableRow;
