import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var des = "";
class CreateEmployees extends Component {
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

         }
         this.onChange = this.onChange.bind(this);
         this.onChangeKey =this.onChangeKey.bind(this);
         this.onFileSelect = this.onFileSelect.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios
          .get("http://localhost:4000/api/speciality")
          .then(response => {
            this.setState({ speciality: response.data });
            console.log(response.data)
          })
          .catch(function(error) {
            console.log(error);
          });
    
          axios
          .get("http://localhost:4000/api/designation")
          .then(response => {
            this.setState({ designation: response.data });
    
          })
          .catch(function(error) {
            console.log(error);
          });
    
    }
    onChangeKey(e) {
        if(e.target.name === "specialityId"){
        this.setState({
            specialityid: e.target.value
        });
       }
    else{
        des = e.target.value;
        this.setState({designationid: e.target.value})
        console.log(des)
    }
       
      }
    
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });

      }
      
      onFileSelect(e){

        this.setState({ employeeImage: e.target.files[0]});
      }

      onSubmit(e){
        console.log('clicked')
        e.preventDefault();
        const {name, email, specialityid, contactno, alternatecontactno, address, employeeImage} = this.state
        
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('specialityid', specialityid);
        formData.append('designationid', des);
        formData.append('contactno', contactno);
        formData.append('alternatecontactno', alternatecontactno);
        formData.append('address', address);
        formData.append('employeeImage', employeeImage);
    
        console.log(formData)
    
        axios
          .post("http://localhost:4000/api/employees/add", formData)
          .then(res => console.log(res.data));
    
        this.setState({
            name: "",
            email: "",
            specialityid: "",
            des: "",
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
            <div>
            <div
            className="card"
            style={{ marginTop: "3%", marginLeft: "10%", marginBottom: "5%",  width: "80%"}}
          >
          <div className="card-header"><h3 className="text-center text-white">Add New Employee</h3></div>
          <form onSubmit={this.onSubmit} style={{ marginTop: "5%", paddingLeft: "2rem", paddingRight: "2rem" }}>
          <div className="row">
              <div className="col-6">
              <div className="form-group">
                  <label>Name: </label>
                  <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="name"
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
                  onChange={this.onChangeKey}>
                  <option >Select</option>
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
                  onChange={this.onChangeKey}>
                  <option >Select</option>
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
                  onChange={this.onChange}
              />
              </div>
              </div>
          </div>
          <div className="row">
              <div className="col-6">
              <div className="form-group">
                  <label>Address: </label>
                  <textarea
                  className="form-control"
                  name="address"
                  rows="5"
                  placeholder="Address"
                  onChange={this.onChange}
              />
              </div>
              </div>
              <div className="col-6">
              <div className="form-group">
                  <label>Employee Image: </label>
                  <input
                  type="file"
                  className="form-control"
                  name="employeeimage"
                  placeholder="Choose a file..."
                  onChange={this.onFileSelect}
              />
              </div>
              </div>
          </div>
          
          <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-info" />
              <Link to="/api/employees" className="btn btn-dark" style={{marginLeft: "75%"}}>
              Back to List
              </Link>
          </div>
          </form>
          <div className="card-footer"></div>
          </div>

            </div>
         );
    }
}
 
export default CreateEmployees;