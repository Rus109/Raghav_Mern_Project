import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class createCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      designation: "",
      description: ""
    };
  }
  onChangeDesignation(e) {
    this.setState({
      designation: e.target.value
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
      designation: this.state.designation,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/designation/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      designation: "",
      description: ""
    });
    this.props.history.push("/api/designation");
  }

  render() {
    return (
      <div>
      <div
        className="card mt-5 mb-5"
        style={{marginLeft: "15%", width: "70%" }}
      >
        <div className="card-header text-white">
          {" "}
          <h3 className="text-center">Add New Designation</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Designation: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.designation}
                onChange={this.onChangeDesignation}
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
                to="/api/designation"
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
