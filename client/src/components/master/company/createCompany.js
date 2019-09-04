import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class createCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeContactPerson = this.onChangeContactPerson.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeAlternateContactNumber = this.onChangeAlternateContactNumber.bind(
      this
    );
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFax = this.onChangeFax.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyname: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: ""
    };
  }
  onChangeCompanyName(e) {
    this.setState({
      companyname: e.target.value
    });
  }
  onChangeContactPerson(e) {
    this.setState({
      contactperson: e.target.value
    });
  }
  onChangeContactNumber(e) {
    this.setState({
      contactno: e.target.value
    });
  }
  onChangeAlternateContactNumber(e) {
    this.setState({
      alternatecontactno: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeFax(e) {
    this.setState({
      fax: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      companyname: this.state.companyname,
      contactperson: this.state.contactperson,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      email: this.state.email,
      fax: this.state.fax,
      address: this.state.address
    };
    axios
      .post("http://localhost:4000/api/company/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      companyname: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: ""
    });
    this.props.history.push("/api/company");
  }

  render() {
    return (
      <div>
        <div className="card mt-5 mb-5">
          <div className="card-header">
            <h3 className="text-center text-white">Add New Company</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Company Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companyname}
                      onChange={this.onChangeCompanyName}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Contact Person: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.contactperson}
                      onChange={this.onChangeContactPerson}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Contact Number: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.contactno}
                      onChange={this.onChangeContactNumber}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Alternate Contact Number: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.alternatecontactno}
                      onChange={this.onChangeAlternateContactNumber}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Email: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                </div>
                <div className="col-6">
                  {" "}
                  <div className="form-group">
                    <label>Fax: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.fax}
                      onChange={this.onChangeFax}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Address: </label>
                <textarea
                  col="15"
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                />
              </div>

              <div className="row">
                <div className="col-sm-4 col-sm-push-8 pl-4">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info"
                  />
                </div>
                <div className="col-sm-8 col-sm-pull-4">
                  <Link
                    to="/api/company"
                    className="btn btn-dark"
                    style={{ marginLeft: "86%" }}
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer pb-5" />
        </div>
      </div>
    );
  }
}
