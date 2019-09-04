import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CustModal from "./modal";

export default class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      customername: "",
      customertype: [],
      customertypeid: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: "",
    };
  }
  componentWillMount() {
    axios
      .get(
        "http://localhost:4000/api/customer/edit/" + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          customername: response.data.customername,
          customertypeid:  Object.entries(response.data.customertype)[0].slice(1),
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          email: response.data.email,
          fax: response.data.fax,
          address: response.data.address
        });
        console.log(Object.entries(response.data.customertype)[0].slice(1))
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/customertype")
      .then(response => {
        this.setState({ customertype: response.data });
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
      customertypeid: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      customername: this.state.customername,
      customertype: this.state.customertypeid,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      email: this.state.email,
      fax: this.state.fax,
      address: this.state.address
    };

    axios
      .post(
        "http://localhost:4000/api/customer/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      customername: "",
      customertype: [],
      customertypeid: "",
      contactno: "",
      alternatecontactno: "",
      email: "",
      fax: "",
      address: "",
    });

    this.props.history.push("/api/customer");
  }
  render() {
    const custType = this.state.customertype.map((PC, i) => (
      <option key={i} value={PC._id}>
        {PC.customertype}
      </option>
    ));
    return (
      <div style={{ marginTop: 10, marginLeft: "10%" }}>
      
          <div className="card" style={{ marginTop: "3%", marginBottom: "3%", marginLeft: "6%", width: "80%" }}>
            <div className="card-header text-white">
              {" "}
              <h3 className="text-center">Edit Customer Details</h3>
            </div>
            <div className="card-body">
              <form
                onSubmit={this.onSubmit}
                style={{ marginTop: "5%", marginLeft: "5%" }}
              >
                
          <div className="row">
          <div className="custname-input">
            <div className="form-group">
              <label>Customer Name:</label>
              <input
              type="text"
                className="form-control"
                name="customername"
                value={this.state.customername}
                onChange={this.onChange}
              />    
            </div>
          </div>
          <div className="custtype-sel">
          <div className="form-group">
          <label>Customer Type: </label>
          <select
            type="text"
            className="form-control"
            value={this.state.customertypeid}
            onChange={this.onChangeKey}
          >
            <option value="select">Select</option>
            {custType}
          </select>
        </div>
          </div>
          <div className="column-plus">
          <CustModal />
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
                      <label>Contact Number 2: </label>
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
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                  <div className="col-6">
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

                <div className="row">
                  <div className="col-12">
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
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-info"
                  />
                  <Link to="/api/customer" className="btn btn-dark"  style={{ marginLeft: "73%" }}>
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
