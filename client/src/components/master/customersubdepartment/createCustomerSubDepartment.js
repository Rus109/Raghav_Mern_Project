import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CSDModal from "./modal";

class createCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      department: "",
      customer: [],
      cstrid: "",
      description: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
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
      cstrid: e.target.value
    });
    console.log(this.state.customer);
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      department: this.state.department,
      customerid: this.state.cstrid,
      description: this.state.description
    };
    axios
      .post("http://localhost:4000/api/customersubdepartment/add", obj)
      .then(res => console.log(res.data));
    this.setState({
      department: "",
      customer: "",
      description: ""
    });
    this.props.history.push("/api/customersubdepartment");
  }

  render() {
    const cstrid = this.state.customer.map(CUST => (
      <option value={CUST._id}>{CUST.customername}</option>
    ));
    return (
      <div style={{ marginTop: "3%", marginLeft: "6%", width: "85%" }}>
        <div className="card">
          <div className="card-header text-white">
            {" "}
            <h3 className="text-center">Add Customer Sub Department Details</h3>
          </div>
          <div className="card-body">
            <form
              onSubmit={this.onSubmit}
              style={{ marginTop: "3%", marginLeft: "20%" }}
            >
              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      name="department"
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label>Customer</label>
                    <select
                      className="form-control"
                      onChange={this.onChangeKey}
                      value={this.state.customerid}
                    >
                      <option value="select">Select</option>
                      {cstrid}
                    </select>
                  </div>
                </div>
                <div className="col-4" style={{ marginTop: "30px" }}>
                  <CSDModal />
                </div>
              </div>
              <div className="row">
                <div className="col-9">
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
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info"
                />
                <Link
                  to="/api/customersubdepartment"
                  className="btn btn-dark"
                  id="link-button"
                  style={{ marginLeft: "50%" }}
                >
                  Back to List
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer text-white"></div>
        </div>
      </div>
    );
  }
}
export default createCustomer;
