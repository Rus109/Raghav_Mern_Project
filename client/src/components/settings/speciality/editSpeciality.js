import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default class editSpeciality extends Component {
  constructor(props) {
    super(props);
    this.onChangeSpeciality = this.onChangeSpeciality.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      speciality: "",
      description: ""
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/speciality/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          speciality: response.data.speciality,
          description: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeSpeciality(e) {
    this.setState({
      speciality: e.target.value
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
      speciality: this.state.speciality,
      description: this.state.description
    };
    axios
      .post(
        "http://localhost:4000/api/speciality/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      speciality: "",
      description: ""
    });

    this.props.history.push("/api/speciality");
  }

  render() {
    return (
      <div style={{ marginTop: 10, marginLeft: "6%" }}>
      <div
        className="card"
        style={{ marginTop: "3%", marginLeft: "10%", width: "70%" }}
      >
        <div className="card-header text-white">
          {" "}
          <h3 className="text-center">Edit Speciality Details</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Speciality: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.speciality}
                onChange={this.onChangeSpeciality}
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
                to="/api/speciality"
                className="btn btn-dark"
                style={{ marginLeft: "73%" }}
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
