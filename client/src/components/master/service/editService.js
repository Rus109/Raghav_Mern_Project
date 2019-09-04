import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CompanyModal from "./companyModal";
import SrvPrdModal from "./srvPrvModal";


export default class EditServiceCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      companyid: "",
      serviceprovider: [],
      srvprd: "",
      centername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      zipcode: "",
      fax: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeKeyCompany = this.onChangeKeyCompany.bind(this);
    this.onChangeKeySrv = this.onChangeKeySrv.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  componentWillMount() {
    axios
      .get(
        "http://localhost:4000/api/servicecenter/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          companyid: Object.entries(response.data.company)[0].slice(1),
          srvprd: Object.entries(response.data.serviceprovider)[0].slice(1),
          centername: response.data.centername,
          contactperson: response.data.contactperson,
          contactno: response.data.contactno,
          alternatecontactno: response.data.alternatecontactno,
          zipcode: response.data.zipcode,
          fax: response.data.fax,
          address: response.data.address
        });
        console.log(Object.entries(response.data.company)[0].slice(1));
        console.log(Object.entries(response.data.serviceprovider)[0].slice(1));
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeKeyCompany(e) {
    this.setState({
      companyid: e.target.value
    });
  }
  onChangeKeySrv(e) {
    this.setState({
      srvprd: e.target.value
    });
  }

  checkData() {
    if (this.state.companyid === "") {
      this.state.companyid = "5c94b65a0c5c2404d8956fef";
      //this.state.companyid =  "5ca3985064edb02f14cd61ec";
    } else {
      this.state.companyid;
    }

    if (this.state.srvprd === "") {
       this.state.srvprd = "5c7a18a6c9f64813cc7db302";
      //this.state.srvprd = "5ca398c43a2ec823781202e9";
    } else {
      this.state.srvprd;
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      company: this.state.companyid,
      serviceprovider: this.state.srvprd,
      centername: this.state.centername,
      contactperson: this.state.contactperson,
      contactno: this.state.contactno,
      alternatecontactno: this.state.alternatecontactno,
      zipcode: this.state.zipcode,
      fax: this.state.fax,
      address: this.state.address
    };
    console.log(obj);

    axios
      .post(
        "http://localhost:4000/api/servicecenter/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.setState({
      company: [],
      companyid: "",
      serviceprovider: [],
      srvprd: "",
      centername: "",
      contactperson: "",
      contactno: "",
      alternatecontactno: "",
      zipcode: "",
      fax: "",
      address: ""
    });
    this.props.history.push("/api/servicecenter");
  }
  render() {
    const companySelect = this.state.company.map((COMP, i) => (
      <option key={i} value={COMP._id}>
        {COMP.companyname}
      </option>
    ));
    const servicesSelect = this.state.serviceprovider.map((SER, i) => (
      <option key={i} value={SER._id}>
        {SER.providername}
      </option>
    ));

    return (
      <div className="container">
      <div className="card" style={{marginTop: "3%", marginBottom: "3%"}}>
        <div className="card-header text-white">
          <h3 className="text-center">Edit Service Center Details</h3>
        </div>
        <div className="card-body">
        <form
        className="form-group"
        style={{ marginTop: "2%" }}
        onSubmit={this.onSubmit}
      >
        <div className="row">
          <div className="column-sel">
            <div className="form-group">
              <label>OEM:</label>
              <select
                className="form-control"
                value={this.state.companyid}
                onLoad={this.onChangeKeyCompany}
                onChange={this.onChangeKeyCompany}
              >
                <option value="select">Select</option>
                {companySelect}
              </select>
            </div>
          </div>
          <div className="column-plus">
            <CompanyModal />
          </div>
          <div className="column-service">
            <div className="form-group">
              <label>Service Provider:</label>
              <select
                className="form-control"
                name="srvprd"
                value={this.state.srvprd}
                onLoad={this.onChangeKeySrv}
                onChange={this.onChangeKeySrv}
              >
                <option value="Select">Select</option>
                {servicesSelect}
              </select>
            </div>
          </div>
          <div className="column-plus">
            <SrvPrdModal />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <label>Center Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Center Name"
              name="centername"
              value={this.state.centername}
              onChange={this.onChange}
            />
          </div>
          <div className="col-6">
            <label>Contact Person:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Contact Person"
              name="contactperson"
              value={this.state.contactperson}
              onChange={this.onChange}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <label>Contact Number:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Contact Number"
              name="contactno"
              value={this.state.contactno}
              onChange={this.onChange}
            />
          </div>
          <div className="col-6">
            <label>Alternate Contact Number:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Alternate Contact Number"
              name="alternatecontactno"
              value={this.state.alternatecontactno}
              onChange={this.onChange}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <label>Zipcode:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Zip Code"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
          </div>
          <div className="col-6">
            <label>Fax:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Fax"
              name="fax"
              value={this.state.fax}
              onChange={this.onChange}
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <label>Address:</label>
          <textarea
            className="form-control"
            placeholder="Address"
            name="address"
            value={this.state.address}
            onChange={this.onChange}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update"
            className="btn btn-primary"
            onClick={this.checkData}
          />
          <Link to="/api/servicecenter" className="btn btn-dark" style={{marginLeft: "80%" }}>
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
