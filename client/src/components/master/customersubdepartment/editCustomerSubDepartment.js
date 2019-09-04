import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CSDModal from "./modal";

export default class EditCSD extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      department: "",
      customer: [],
      cstrid: "",
      description: "",    
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/customersubdepartment/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          department: response.data.department,
          cstrid:  Object.entries(response.data.customer)[0].slice(1),
          description: response.data.description
        });
        console.log(Object.entries(response.data.customer)[0].slice(1))
      });

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
    console.log('walla');
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      department: this.state.department,
      customer: this.state.cstrid,
      description: this.state.description
    };

    axios
      .post(
        "http://localhost:4000/api/customersubdepartment/update/" +
          this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));
    this.setState({
      department: "",
      customer: [],
      cstrid: "",
      description: ""
    });
    this.props.history.push("/api/customersubdepartment");
  }

  render() {
    const custSelect = this.state.customer.map(CUST => (
      <option value={CUST._id}>{CUST.customername}</option>
    ));
    return (
      <div style={{ marginTop: "3%", marginLeft: "8%", width: "85%" }}>
      <div className="card">
        <div className="card-header text-white">
          {" "}
          <h3 className="text-center">Edit Customer Sub Department List</h3>
        </div>
        <div className="card-body">
        
        <form onSubmit={this.onSubmit} style={{ marginLeft: "17%" }}>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>Department:</label>
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  value={this.state.department}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Customer:</label>
                <select
                  className="form-control"
                  name="customer"
                  value={this.state.cstrid}
                  onChange={this.onChangeKey}
                >
                  {custSelect}
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
            value="Update"
            className="btn btn-primary"
           
          />
          <Link to="/api/customersubdepartment" className="btn btn-dark"  style={{ marginLeft: "52%" }}>
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
