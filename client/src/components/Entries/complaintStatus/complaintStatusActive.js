import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class ComplaintStatusActive extends Component {
   constructor(props) {
    super(props);
    this.state = {
      active: [],
      assigneddate: "",
      assignedengineer: ""
    } 
  }
  componentDidMount(){
    console.log("Active", this.props.obj)
    // this.setState({active: this.props.obj})

    axios
        .get("http://localhost:4000/api/complaintstatus/assign/")
        .then(res => {
          console.log(res.data)
          res.data.map(i1 => {
            let tempassigncomplaintsdetails = [i1.assigncomplaintsdetails];
            tempassigncomplaintsdetails.map(i2 => {
              if(this.props.obj._id === i2._id){
                var dateassigndatetime = new Date(i1.assigndatetime);
                var dataDatecomplaintdate = dateassigndatetime.toISOString().substr(0, 10);
                this.setState({
                  assigneddate: dataDatecomplaintdate,
                  assignedengineer: i1.assignengineer.name
                })
              }  
              return true;
            })
          })
        });
  }

  render() {

let serialno;
var datecomplaintdate = new Date(this.props.obj.complaintdate);
var dataDatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);

this.props.obj.complaints_pro_details.map(item => {
  serialno = item.complaints_serialno
})
console.log(this.props.obj)
let path = this.props.obj.status;

switch(path){
  case "Unassigned":
    return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>Not Assigned</td>
        <td>Not Assigned</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/assign/add/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

  case "Assigned":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/complaintno/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

     case "BringInRequest":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/bringin/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

    
     case "BringIn":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/sendforservicing/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

    case "Sent":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/reciedfromservice/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

    case "Recieved":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/deliver/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

      case "Delivered":
  return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{serialno}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/closed/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

default:
    return (
      <tr>
        <td>{this.props.obj.caseid}</td>
        <td>{dataDatecomplaintdate}</td>
        <td>{this.props.obj.calltype.calltype}</td>
        <td>{this.props.obj.caseid}</td>
        <td>{this.props.obj.problemdetails}</td>
        <td>{this.state.assigneddate}</td>
        <td>{this.state.assignedengineer}</td>
        <td>Under Process</td>
        {/* <td><ACModal obj ={this.props.obj.status}/></td> */}
        <td><Link to={"/api/complaintstatus/assign/add/" + this.props.obj._id}>{this.props.obj.status}</Link></td>
      </tr>
    )

    
  }    
}
}
