import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProSubModal from "./modal";


class EditProductSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategory: "",
      parentcategory: [],
      productcategory: "",
      description: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    axios
      .get(
        "http://localhost:4000/api/productsubcategory/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          subcategory: response.data.subcategory,
          productcategory: Object.entries(response.data.parentcategory)[0].slice(1),
          description: response.data.description
        });
        console.log(Object.entries(response.data.parentcategory)[0].slice(1))
      })
      .catch(function(error) {
        console.log(error);
      });

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
    console.log('walla');
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      subcategory: this.state.subcategory,
      parentcategory: this.state.productcategory,
      description: this.state.description
    };
    console.log(obj)
    axios
      .post(
        "http://localhost:4000/api/productsubcategory/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      subcategory: "",
      parentcategory: [],
      productcategory: "",
      description: "",
      edit: true
    });

    this.props.history.push("/api/productsubcategory");
  }

  render() {
    const pcSelect = this.state.parentcategory.map((PC, i) => (
      <option key={i} value={PC._id}>
        {PC.category}
      </option>
    ));

    return (
      <div>
        <div
          className="card mt-5 mb-5"
          style={{ marginLeft: "15%", width: "70%" }}
        >
          <div className="card-header text-white">
            {" "}
            <h3 className="text-center">Edit Product Sub Category Details</h3>
          </div>
          <div className="card-body">
            <form
              onSubmit={this.onSubmit}
              style={{ marginTop: "5%", marginLeft: "2%" }}
            >
            <div className="row">
            <div className="custname-input">
              <div className="form-group">
                <label>Sub Category:</label>
                <input
                type="text"
                  className="form-control"
                  name="subcategory"
                  value={this.state.subcategory}
                  onChange={this.onChange}
                />    
              </div>
            </div>
            <div className="custtype-sel">
            <div className="form-group">
            <label>Product Sub Category: </label>
            <select
              type="text"
              className="form-control"
              value={this.state.productcategory}
              onChange={this.onChangeKey}
            >
              <option value="select">Select</option>
              {pcSelect}
            </select>
          </div>
            </div>
            <div className="column-plus">
            <ProSubModal />
            </div>
          </div>

              <div className="row">
                <div className="col-12">
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
                <input type="submit" value="Update" className="btn btn-info" />
                <Link
                  to="/api/productsubcategory"
                  className="btn btn-dark"
                  style={{ marginLeft: "71%" }}
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
export default EditProductSubCategory;
