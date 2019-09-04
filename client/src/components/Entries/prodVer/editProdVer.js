import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EditProdVer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productRegistration: [],
            productRegistrationid: "",
            installationDetails: [],
            installationDetailsid: "",
            amcRegistration: [],
            amcRegistrationid: "",
            complaint: [],
            complaintid: ""
         }
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){

        axios
          .get("http://localhost:4000/api/productregistration")
          .then(response => {
            this.setState({ productRegistration: response.data });
            console.log(this.state.productregistration)
          })
          .catch(function(error) {
            console.log(error);
          });
          
          axios
          .get("http://localhost:4000/api/installation")
          .then(response => {
            this.setState({ installationDetails: response.data });
            console.log(response.data)
          })
          .catch(function(error) {
            console.log(error);
          });
    
          axios
          .get("http://localhost:4000/api/amcregistration")
          .then(response => {
            this.setState({ amcRegistration: response.data });
            console.log(this.state.customertype)
          })
          .catch(function(error) {
            console.log(error);
          });
    
          axios
          .get("http://localhost:4000/api/complaint")
          .then(response => {
            this.setState({ complaint: response.data });
            console.log(response.data)
          })
          .catch(function(error) {
            console.log(error);
          });

          axios
          .get(
            "http://localhost:4000/api/productverification/edit/" + "5cb9bbd94ae5d83820d81726"
          )
         
          .then(response => { 
              console.log(Object.entries(response.data.servicehistory)[0].slice(1)[0])
            this.setState({
            productRegistrationid: Object.entries(response.data.serialno)[0].slice(1),
            installationDetailsid: response.data.installationdetails,
            amcRegistrationid: Object.entries(response.data.amcdetails)[0].slice(1),
            complaintid: Object.entries(response.data.servicehistory)[0].slice(1)
            })
          console.log(this.state.productid)
          })
          .catch(function(error) {
            console.log(error);
          });
        }

        onChange(e) {
            this.setState({
              [e.target.name]: e.target.value
            });
            console.log(e.target.value)
          }
    
          onSubmit(e){
            console.log('clicked')
            e.preventDefault();
          
            const {productRegistrationid, installationDetailsid, amcRegistrationid, complaintid} = this.state
      
            const obj = {
                serialno: productRegistrationid,
                installationdetails: installationDetailsid,
                amcdetails: amcRegistrationid,
                servicehistory: complaintid
          };
        
            console.log(obj)
        
            axios
              .post("http://localhost:4000/api/productverification/update/" + "5cb9bbd94ae5d83820d81726", obj)
              .then(res => console.log(res.data));
        
            this.setState({
    
                productRegistrationid: "",
                installationDetailsid: "",
                amcRegistrationid: "",
                complaintid: ""
            });
            this.props.history.push("/api/productverification");
          }
        
    render() { 

        const ProductRegistration = this.state.productRegistration.map((ProdR, i) => (
            <option key={i} value={ProdR._id}>
              {ProdR.serialno}
            </option>
          ));
    
          const InstallationDetails = this.state.installationDetails.map((installD, i) => (
            <option key={i} value={installD._id}>
              {installD.installrefno}
            </option>
          ));
    
          const amcRegistration = this.state.amcRegistration.map((amcR, i) => (
            <option key={i} value={amcR._id}>
              {amcR.amcrefno}
            </option>
          ));
    
          const Complaint = this.state.complaint.map((Comp, i) => (
            <option key={i} value={Comp._id}>
              {Comp.complaintno}
            </option>
          ));

        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }}>
        <Link to="/api/productverification" className="btn btn-info">
        Back to List
        </Link>
        <h3 className="text-center">Add Product Verification</h3>
        <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
        <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Serial No: </label>
                <select
                  className="form-control"
                  name="productRegistrationid"
                  value = {this.state.productRegistrationid}
                  onChange={this.onChange}>
                  <option >Select</option>
                  {ProductRegistration}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Installation Details: </label>
                <select
                  className="form-control"
                  name="installationDetailsid"
                  value = {this.state.installationDetailsid}
                  onChange={this.onChange}>
                  <option >Select</option>
                  {InstallationDetails}
            </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Amc Details: </label>
                <select
                  className="form-control"
                  name="amcRegistrationid"
                  value = {this.state.amcRegistrationid}
                  onChange={this.onChange}>
                  <option >Select</option>
                  {amcRegistration}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Service History: </label>
                <select
                  className="form-control"
                  name="complaintid"
                  value = {this.state.complaintid}
                  onChange={this.onChange}>
                  <option >Select</option>
                  {Complaint}
            </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
         );
    }
}
 
export default EditProdVer;