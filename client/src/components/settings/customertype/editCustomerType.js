import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default class editCustomerType extends Component {
  constructor(props) {
    super(props);
    this.onChangeCustomerType = this.onChangeCustomerType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customertype: "",
      description: ""
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/customertype/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          customertype: response.data.customertype,
          description: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeCustomerType(e) {
    this.setState({
      customertype: e.target.value
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
      customertype: this.state.customertype,
      description: this.state.description
    };
    axios
      .post(
        "http://localhost:4000/api/customertype/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      customertype: "",
      description: ""
    });

    this.props.history.push("/api/customertype");
  }

  render() {
    return (
      <div>
      <div
        className="card mt-5 "
        style={{ marginLeft: "16%", width: "70%" }}
      >
        <div className="card-header text-white">
          {" "}
          <h3 className="text-center">Edit Customer Type Details</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Customer Type: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.customertype}
                onChange={this.onChangeCustomerType}
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
              <input type="submit" value="Update" className="btn btn-info" />
              <Link
                to="/api/customertype"
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
