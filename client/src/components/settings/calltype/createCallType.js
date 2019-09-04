import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default class createCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeCallType = this.onChangeCallType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      calltype: "",
      description: ""
    };
  }
  onChangeCallType(e) {
    this.setState({
      calltype: e.target.value
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
      calltype: this.state.calltype,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/calltype/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      calltype: "",
      description: ""
    });
    this.props.history.push("/api/calltype");
  }

  render() {
    return (
      <div>
        <div
          className="card mt-5 mb-5"
          style={{ marginTop: "3%", marginLeft: "10%", width: "70%" }}
        >
          <div className="card-header text-white">
            {" "}
            <h3 className="text-center">Add New Call Type</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Call Type: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.calltype}
                  onChange={this.onChangeCallType}
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
                  to="/api/calltype"
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
