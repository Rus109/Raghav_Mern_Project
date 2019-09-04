import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class editCompany extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      providername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: ""
    };
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/serviceprovider/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          providername: response.data.providername,
          contactperson: response.data.contactperson,
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          email: response.data.email,
          fax: response.data.fax,
          address: response.data.address
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      providername: this.state.providername,
      contactperson: this.state.contactperson,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      email: this.state.email,
      fax: this.state.fax,
      address: this.state.address
    };
    axios
      .post(
        "http://localhost:4000/api/serviceprovider/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.props.history.push("/api/serviceprovider");
  }

  render() {
    return (
      <div className="card mt-5 mb-5" style={{marginLeft: "10%", width: "80%"}}>
        <div className="card">
          <div className="card-header text-white">
            {" "}
            <h3 className="text-center">Edit Service Provider Details</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Provider Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="providername"
                      value={this.state.providername}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Contact Person: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactperson"
                      value={this.state.contactperson}
                      onChange={this.onChange}
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
                      name="contactno"
                      value={this.state.contactno}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Alternate Contact Number: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="alternatecontactno"
                      value={this.state.alternatecontactno}
                      onChange={this.onChange}
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
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
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
                      name="fax"
                      value={this.state.fax}
                      onChange={this.onChange}
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
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Update" className="btn btn-info" />
                <Link to="/api/serviceprovider" className="btn btn-dark" style={{marginLeft: "78%"}}>
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
