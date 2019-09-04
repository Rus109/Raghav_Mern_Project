import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000/";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      companyId: "",
      productCategory: [],
      productCategoryId: "",
      productSubCategory: [],
      productSubCategoryId: "",
      modelno: "",
      description: "",
      productdoc: "",
      imageName: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/productcategory")
      .then(response => {
        this.setState({ productCategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/productsubcategory")
      .then(response => {
        this.setState({ productSubCategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(
        "http://localhost:4000/api/product/edit/" + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          companyId: Object.entries(response.data.oem)[0].slice(1),
          productCategoryId: Object.entries(response.data.category)[0].slice(1),
          productSubCategoryId: Object.entries(
            response.data.subcategory
          )[0].slice(1),
          modelno: response.data.modelno,
          description: response.data.description,
          imageName: response.data.specification
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeKey(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFileSelect(e) {
    console.log(e.target.files[0]);
    this.setState({ productdoc: e.target.files[0] });
  }
  onSubmit(e) {
    console.log("clicked");
    e.preventDefault();
    const {
      companyId,
      productCategoryId,
      productSubCategoryId,
      modelno,
      description,
      productdoc
    } = this.state;

    let formData = new FormData();
    formData.append("oem", companyId);
    formData.append("category", productCategoryId);
    formData.append("subcategory", productSubCategoryId);
    formData.append("modelno", modelno);
    formData.append("description", description);
    formData.append("productdoc", productdoc);

    console.log(formData);

    axios
      .post(
        "http://localhost:3000/api/product/update/" +
          this.props.match.params.id,
        formData
      )
      .then(res => console.log(res.data));

    this.setState({
      companyId: "",
      productCategoryId: "",
      productSubCategoryId: "",
      modelno: "",
      description: "",
      productdoc: ""
    });
    this.props.history.push("/api/product");
  }
  render() {
    const Company = this.state.company.map((com, i) => (
      <option key={i} id={com.companyname} value={com._id}>
        {com.companyname}
      </option>
    ));

    const ProductCategory = this.state.productCategory.map((com, i) => (
      <option key={i} value={com._id}>
        {com.category}
      </option>
    ));

    const ProductSubCategory = this.state.productSubCategory.map((com, i) => (
      <option key={i} value={com._id}>
        {com.subcategory}
      </option>
    ));
    return (
      <div
        style={{
          marginTop: "3%",
          marginLeft: "5%",
          marginBottom: "5%"
        }}
        className="card"
      >
        <h3 className=" card-header text-center text-white">
          Edit Product Details
        </h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Oem: </label>
                  <select
                    className="form-control"
                    name="companyId"
                    value={this.state.companyId}
                    onChange={this.onChangeKey}
                  >
                    <option>Select</option>
                    {Company}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Product Category: </label>
                  <select
                    className="form-control"
                    name="productCategoryId"
                    value={this.state.productCategoryId}
                    onChange={this.onChangeKey}
                  >
                    <option>Select</option>
                    {ProductCategory}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Product Sub-Category: </label>
                  <select
                    className="form-control"
                    name="productSubCategoryId"
                    value={this.state.productSubCategoryId}
                    onChange={this.onChangeKey}
                  >
                    <option>Select</option>
                    {ProductSubCategory}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Model No: </label>

                  <input
                    type="text"
                    name="modelno"
                    className="form-control"
                    placeholder="Model Number"
                    value={this.state.modelno}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Description: </label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="5"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="col-6">
                {" "}
                <div className="form-group">
                  <label>Product Document: </label>
                  <img
                    src={BASE_URL + "products/docs/" + this.state.imageName}
                    alt="No Data"
                  />
                  <input
                    type="file"
                    className="form-control"
                    name="productdoc"
                    placeholder="Choose a file..."
                    onChange={this.onFileSelect}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Update" className="btn btn-info" />
              <Link
                to="/api/product"
                className="btn btn-dark"
                style={{ marginLeft: "80%" }}
              >
                Back to List
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer" />
      </div>
    );
  }
}

export default EditProduct;
