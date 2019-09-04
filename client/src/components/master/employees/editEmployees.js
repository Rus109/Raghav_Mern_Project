import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const BASE_URL = "http://localhost:3000/";

class EditEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      speciality: [],
      specialityid: "",
      designation: [],
      designationid: "",
      contactno: "",
      alternatecontactno: "",
      address: "",
      employeeImage: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeKeySpe = this.onChangeKeySpe.bind(this);
    this.onChangeKeyDes = this.onChangeKeyDes.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    axios
      .get(
        "http://localhost:4000/api/employees/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          specialityid: Object.entries(response.data.speciality)[0].slice(1),
          designationid: Object.entries(response.data.designation)[0].slice(1),
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          address: response.data.address,
          employeeImage: response.data.imageName
        });
        console.log(Object.entries(response.data.speciality)[0].slice(1))
        console.log(Object.entries(response.data.designation)[0].slice(1))
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/speciality")
      .then(response => {
        this.setState({ speciality: response.data });
        console.log(this.state.speciality);
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/designation")
      .then(response => {
        this.setState({ designation: response.data });
        console.log(this.state.designation);
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

  onChangeKeySpe(e){
    this.setState({
      specialityid: e.target.value
    });
    console.log('speciality walla');
  }

  onChangeKeyDes(e){
    this.setState({
      designationid: e.target.value
    });
    console.log('designation walla');
  }


  onFileSelect(e) {
    this.setState({ employeeImage: e.target.files[0] });
  }
  onSubmit(e) {
    console.log("clicked");
    e.preventDefault();
    const {
      name,
      email,
      specialityid,
      designationid,
      contactno,
      alternatecontactno,
      address,
      employeeImage
    } = this.state;

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("speciality", specialityid);
    formData.append("designation", designationid);
    formData.append("contactno", contactno);
    formData.append("alternatecontactno", alternatecontactno);
    formData.append("address", address);
    formData.append("employeeImage", employeeImage);

    console.log(formData);

    axios
      .post(
        "http://localhost:4000/api/employees/update/" +
          this.props.match.params.id,
        formData
      )
      .then(res => console.log(res.data));

    this.setState({
      name: "",
      email: "",
      speciality: [],
      specialityid: "",
      designation: [],
      designationid: "",
      contactno: "",
      alternatecontactno: "",
      address: "",
      employeeImage: ""
    });
    this.props.history.push("/api/employees");
  }
  render() {
    const Speciality = this.state.speciality.map((spec, i) => (
      <option key={i} value={spec._id}>
        {spec.speciality}
      </option>
    ));

    const Designation = this.state.designation.map((des, i) => (
      <option key={i} value={des._id}>
        {des.designation}
      </option>
    ));
    return (
      <div
        className="card"
        style={{ marginTop: "3%", marginBottom:"3%", marginLeft: "2%"}}
      >
        <div className="card-header text-center">
          <h3 className="mt-3 text-white">Edit Employee Details</h3>
        </div>
        <form onSubmit={this.onSubmit} style={{  padding: "20px"  }}>
          <div className="col-6" id="image">
            <div className="form-group">
              <img
                className="rounded-circle mb-2"
                src={BASE_URL + "employees/docs/" + this.state.employeeImage}
                alt="No Data"
                style={{ width: "200px", height: "150px", marginLeft: "30%" }}
              />
              <input
                type="file"
                className="form-control"
                name="employeeimage"
                placeholder="Choose a file..."
                onChange={this.onFileSelect}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Email: </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Speciality: </label>
                <select
                  className="form-control"
                  name="specialityId"
                  value={this.state.specialityid}
                  onChange={this.onChangeKeySpe}
                >
                  <option>Select</option>
                  {Speciality}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Designation: </label>
                <select
                  className="form-control"
                  name="designationId"
                  value={this.state.designationid}
                  onChange={this.onChangeKeyDes}
                >
                  <option>Select</option>
                  {Designation}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Contact No: </label>
                <input
                  type="text"
                  name="contactno"
                  className="form-control"
                  placeholder="Contact No"
                  value={this.state.contactno}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Alt Contact No: </label>
                <input
                  type="text"
                  name="alternatecontactno"
                  className="form-control"
                  placeholder="Alt. Contact No"
                  value={this.state.alternatecontactno}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <div className="form-group">
                <label>Address: </label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="5"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-info" />
            <Link to="/api/employees" className="btn btn-dark" style={{marginLeft: "80%"}}>
              Back to List
            </Link>
          </div>
        </form>
        <div className="card-footer"></div>
      </div>
    );
  }
}

export default EditEmployees;
