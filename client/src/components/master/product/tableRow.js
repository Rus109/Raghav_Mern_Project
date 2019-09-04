import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:3000/";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete("http://localhost:4000/api/product/delete/" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    console.log(this.props.obj.specification);
  }
  render() {
    return (
      <tr>
        <td>{Object.entries(this.props.obj.oem)[1].slice(1)}</td>
        <td>{Object.entries(this.props.obj.category)[1].slice(1)}</td>
        <td>{Object.entries(this.props.obj.subcategory)[1].slice(1)}</td>

        <td>{this.props.obj.modelno}</td>
        <td>{this.props.obj.description}</td>
        <td>
          <a
            href={BASE_URL + "products/docs/" + this.props.obj.specification}
            target="_blank"
          >
            Download
          </a>
        </td>
        {/** <td>
          <img
            src={BASE_URL + "products/docs/" + this.props.obj.specification}
            className="img-thumbnail"
            alt="No Data"
            style={{ width: "250px", height: "100px" }}
          />
        </td> */}
        <td style={{ paddingTop: "2%" }}>
          <button onClick={this.delete} className="btn btn-danger">
            <i className="fas fa-trash" />
          </button>
        </td>
        <td style={{ paddingTop: "2%" }}>
          <Link
            to={"/api/product/edit/" + this.props.obj._id}
            className="btn btn-primary"
          >
            <i className="fas fa-pencil-alt" />
          </Link>
        </td>
        <td>
        <Link to={"/api/product/print/" + this.props.obj._id} className="btn btn-dark ml-1" >
        <i className="fas fa-eye" />
      </Link>
        </td>
      </tr>
    );
  }
}

export default TableRow;
