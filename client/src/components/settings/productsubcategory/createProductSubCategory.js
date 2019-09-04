import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProSubModal from "./modal";

export default class createProductSubCategory extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      subcategory: "",
      parentcategory: [],
      productcategory: "",
      description: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/productcategory")
      .then(response => {
        this.setState({ parentcategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeKey(e) {
    this.setState({
      productcategory: e.target.value
    });
    // console.log(this.state.productcategory);
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      subcategory: this.state.subcategory,
      productcategoryid: this.state.productcategory,
      description: this.state.description
    };
    // console.log(obj);
    axios
      .post("http://localhost:4000/api/productsubcategory/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      subcategory: "",
      parentcategory: "",
      description: ""
    });
    this.props.history.push("/api/productsubcategory");
  }

  render() {
    const productCategory = this.state.parentcategory.map((PC, i) => (
      <option key={i} value={PC._id}>
        {PC.category}
      </option>
    ));
    return (
      <div>
        <div
          className="card mt-5 mb-5">
          <div className="card-header text-white">
            {" "}
            <h3 className="text-center">Add New Product Sub Category</h3>
          </div>
          <div className="card-body">
            <form
              onSubmit={this.onSubmit}
              className="mt-4"
              style={{marginLeft: "18%"}}
            >
              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label>Sub Category: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subcategory"
                      value={this.state.subcategory}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label>Parent Category: </label>
                    <select
                      type="text"
                      className="form-control"
                      value={this.state.productcategory}
                      onChange={this.onChangeKey}
                    >
                      <option value="select">Select</option>
                      {productCategory}
                    </select>
                  </div>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <ProSubModal />
                </div>
              </div>

              <div className="row">
                <div className="col-9">
                  <div className="form-group">
                    <label>Description: </label>
                    <textarea
                      col="20"
                      type="text"
                      className="form-control"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-info" />
                <Link
                  to="/api/productsubcategory"
                  className="btn btn-dark"
                  style={{ marginLeft: "53%" }}
                >
                  Back to List
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer" />
        </div>
      </div>
    );
  }
}
