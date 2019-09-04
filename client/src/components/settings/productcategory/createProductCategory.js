import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class createProductCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      category: "",
      description: ""
    };
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      category: this.state.category,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/productcategory/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      category: "",
      description: ""
    });
    this.props.history.push("/api/productcategory");
  }

  render() {
    return (
      <div>
      <div
        className="card mt-5 mb-5"
        style={{ marginLeft: "15%", width: "70%" }}
      >
        <div className="card-header text-white">
          {" "}
          <h3 className="text-center">Add New Product Category</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Product Category: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.category}
                onChange={this.onChangeCategory}
              />
            </div>

            <div className="form-group">
              <label>Description: </label>
              <textarea
                col="15"
                type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-info" />
              <Link
                to="/api/productcategory"
                className="btn btn-dark"
                style={{ marginLeft: "75%" }}
              >
                Back to List
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
    );
  }
}
