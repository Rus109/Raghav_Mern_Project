import React, { Component } from 'react';
import axios from "axios";
import Logo from "../../common/logo";
import { Link } from "react-router-dom";

var BASE_URL = "http://localhost:3000/";

class printWhole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/product")
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.props.employeeImage);
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/product")
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(function (error) {
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
    const product = this.state.product;
    return (
      <div className="mt-5 mb-5">
        <button className="btn btn-info ml-5" onClick={this.onPrint}>
          Print
    </button>
        <Link
          to="/api/product"
          className="btn btn-dark"
          style={{ marginLeft: "75%" }}
          id="hide"
        >
          Back to List
          </Link> 
        <div className="mt-4 mb-4" style={{ border: "1px solid black", padding: "10px 20px" }}>
          <Logo />
          <h4 align="center" className="mt-4 mb-4">
            Product List
        </h4>
          <table
            className="table table-bordered mb-4 text-center"
            id="css-serial"
            style={{ marginTop: 20 }}
          >
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Company</th>
                <th>Product Category</th>
                <th>Product Sub Category</th>
                <th>Model No</th>
                <th>Description</th>
                <th>Documents</th>
              </tr>
            </thead>
            {product.map(
              ({ _id, oem, category, subcategory, modelno, description, specification }) => (
                <tbody key={_id}>
                  <tr>
                    <td />
                   
                    <td>{Object.entries(oem)[1].slice(1)}</td>
                    <td>{Object.entries(category)[1].slice(1)}</td>
                    <td>{Object.entries(subcategory)[1].slice(1)}</td>
                    <td>{modelno}</td>
                    <td>{description}</td>
                    <td>
                      <a
                        href={BASE_URL + "products/docs/" + specification}
                        target="_blank"
                      >
                        Download
          </a>
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>
</div>
      </div>
    )
  }
}

export default printWhole;
