import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import isEmpty from '../../../../validation/is-empty';
import AssignAddProReg from './assignAddProReg'

let employees;
let proreid;
let tabOne;
let assignId;
let tabone = [];
let rows;

export default class AssignAdd extends Component {

    constructor(props) {
    super(props);

    this.state = {
            caseid: "",
            complaintdate: "",
            complainttime: "",
            servicetype: "",
            calltype: "",
            customer: "",
            customerid: "",
            customertype: "",
            department: "",
            departmentid: "",
            address: "",
            name: "",
            designation: "",
            contactno: "",
            PToV: "",
            pd: "",
            complaintsRemarks: "",
            refno: "",
            assignmentDate: "",
            engineer: "",
            remarks: "",
            compliant: [],

            showme: false,
            assignId: ""
            
    };
this.onChange = this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.getAssignId = this.getAssignId.bind(this);
this.loadDateSerialno = this.loadDateSerialno.bind(this);
this.getTableRow = this.getTableRow.bind(this);
this.blank = this.blank.bind(this);
this.updateComplaint = this.updateComplaint.bind(this);
  }
componentDidMount(){
    console.log(this.props.obj)
    axios
      .get("http://localhost:4000/api/complaint/edit/" + this.props.match.params.id)
      .then(response => {
    console.log("edit Complaint", response.data)
    
    var datecomplaintdate = new Date(response.data.complaintdate);
    var dataDatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);

		this.setState({
            complaint: response.data,
            caseid: response.data.caseid,
            complaintdate: dataDatecomplaintdate,
            complainttime: response.data.complainttime,
            servicetype: response.data.servicetype,
            calltype: (Object.entries(response.data.calltype)[0].slice(1))[0],
            customer: response.data.client.customername,
            customerid: (Object.entries(response.data.client)[0].slice(1))[0],
            customertype: (Object.entries(response.data.clienttype)[0].slice(1))[0],
            department: response.data.departmentname.department,
            departmentid: (Object.entries(response.data.departmentname)[0].slice(1))[0],
            address: response.data.address,
            name: response.data.name,
            designation: response.data.designation,
            contactno: response.data.contactno,
            PToV: response.data.persontovisit,
            pd: response.data.problemdetails,
            complaintsRemarks: response.data.remarks
        }, () => {
          let productdetails = response.data.complaints_pro_details;
          productdetails.map(i1 => {
            let tempArr = [i1.complaints_prod];
            tempArr.map(i2 => {
              i2.products.map(i3 => {
                if(i1.complaints_serialno === i3.serialno){
                  tabOne = {
                              category: i3.category,
                              subcategory: i3.subcategory,
                              oem: i3.oem,
                              modelno: i3.modelno,
                              serialno: i3.serialno
                            }
                            tabone.push(tabOne);
                          }
              })
              
            })
          })
          this.setState({showme: true})
        })
      })
      .catch(function(error) {
        console.log(error);
      });
      
      axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        console.log("employees", response.data)
        employees = response.data
	
      })
      .catch(function(error) {
        console.log(error);
    });
    
    	  let tempnumber = Math.random().toString();
        let number = tempnumber.split(".");
        let randomnumber = "CA-" + number[1];
        this.setState({refno: randomnumber})
}

componentWillUnmount(){
employees;
proreid;
tabOne;
assignId;
tabone = [];
// rows;
}
onChange(e) {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value);
}

      onSubmit(e){
        console.log('clicked')
        e.preventDefault();
        
        const {
            refno,
            assignmentDate,
            engineer,
            remarks
      } = this.state
  
        const obj = {
            complaintid: this.props.match.params.id,
            assignrefno: refno,
            assigndatetime: assignmentDate,
            employeesid: engineer,
            assignremarks: remarks
      };
    
        console.log(obj)
    
        axios
          .post("http://localhost:4000/api/complaintstatus/assign/add", obj)
          .then(res => console.log(res.data));


      }

      getAssignId(){
            axios
              .get("http://localhost:4000/api/complaintstatus/assign/")
              .then(response => {
                console.log(response.data)
                response.data.map((item, i) => {
                  if(item.assignrefno === this.state.refno){
                    
                    console.log(item._id)
                    this.setState({assignId: item._id})
                    assignId = item._id;
                    console.log(assignId)
                  }
                })
        })
    }

    loadDateSerialno(e){
      this.setState({showme: false})
    console.log(assignId)
    console.log(this.state.serialno)
    const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/complaintstatus/assign/serialno", obj)
        .then(res => {
          if(isEmpty(res.data)){
            alert("The Serial no does not exist!")
          }
          else{
                let temptab = res.data
                    temptab.map(item => {
                      proreid = item._id
                      item.products.map(i2 => {
                        tabOne = {
                          category: i2.category,
                          subcategory: i2.subcategory,
                          oem: i2.oem,
                          modelno: i2.modelno,
                          serialno: i2.serialno
                        }
                        tabone.push(tabOne);
                     })
                  })  
                  console.log(tabOne)
                  this.setState({showme: true})

               let newobj1 = {
                  proregid: proreid,
                  assignserialno: this.state.serialno,
                  }

                  console.log(newobj1)
                  axios
                  .post("http://localhost:4000/api/complaintstatus/assign/product/" + assignId, newobj1)
                  .then(response => response.data) 
                }
            })       
       .catch(function(error) {
          console.log(error);
      });

      this.setState({
        showme: true
      })

    }

    getTableRow(e){

        e.preventDefault();

        let Id = this.props.match.params.id
        var myArray1 = tabone;
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            alert(this.rowIndex);
            myArray1.splice(this.rowIndex, 1);

            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[3];

            console.log(retrievedserialno)

              axios
                .get("http://localhost:4000/api/complaintstatus/assign/edit/" + assignId)
                .then(response =>{
                  let tempArr = [response.data]
                  console.log(response.data)
                  tempArr.map((item, i) => {
                    console.log(item)
                  item.assign_productdetails.map(i2 => {
                    console.log(i2._id)
                    if(retrievedserialno === i2.assignserialno){    
                  axios
                    .delete("http://localhost:4000/api/complaintstatus/assign/product/" + assignId + "/" + i2._id)
                    .then(res => res.data)
                  }
                })
              })
           })  
        }
      }
    }

    
      blank(){
            axios
              .get("http://localhost:4000/api/complaintstatus/assign/")
              .then(response => {
                console.log(response.data)
                response.data.map((item, i) => {
                  if(item.assignrefno === this.state.refno){
                    
                    console.log(item._id)
                    this.setState({assignId: item._id})
                    assignId = item._id;
                  }
              })
        })
        console.log(assignId)
    }

    updateComplaint(){

    const obj = {
          caseid: this.state.caseid,
          complaintdate: this.state.complaintdate,
          complainttime: this.state.complainttime,
          servicetype: this.state.servicetype,
          calltypeid: this.state.calltype,
          customerid: this.state.customerid,
          customertypeid: this.state.customertype,
          customersubdepartmentid: this.state.departmentid,
          name: this.state.name,
          designation: this.state.designation,
          contactno: this.state.contactno,
          address: this.state.address,
          persontovisit: this.state.PToV,
          problemdetails: this.state.pd,
          isresolvedonphone: false,  
          status: "Assigned",
          remarks: this.state.complaintsRemarks
      }

      console.log(obj)
          axios
          .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.id, obj)
          .then(res => console.log(res.data));

          this.props.history.push("/api/complaintstatus");
    }

  render() {
      const lblStyle = {
          fontWeight: "normal"
      }

      let Emp;
      if(!isEmpty(employees)){
            Emp = employees.map(item => {
                return (<option value = {item._id}>{item.name}</option>)
            })
      }

      rows = tabone.map((item, i) => {
			        return <AssignAddProReg obj={item} />;
          });

    return (
      <div style={{ marginTop: 10, marginLeft: "10%" }} onMouseMove={this.blank}>
            <Link to="/api/complaintstatus" className="btn btn-info">
            Back to List
            </Link>
              <h3 className="text-center">Assign Complaints</h3>
              <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
                  <h5 className="text-center" style={{fontWeight: "bold"}}>Complaints Details</h5>
                  <hr />
              <div className="row">
                <div className="col-6">
                    <div className="form-group">
                    <label style = {lblStyle}>Complaint No :</label>&nbsp;&nbsp;
                    <label>{this.state.caseid}</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                    <label style = {lblStyle}>Complaint Date : </label>&nbsp;&nbsp;
                    <label>{this.state.complaintdate}</label>
                    </div>
                </div>
            </div>
             <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Customer :</label>&nbsp;&nbsp;
                    <label>{this.state.customer}</label>
                    </div>
                  </div>
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Department :</label>&nbsp;&nbsp;
                    <label>{this.state.department}</label>
                  </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Address :</label>&nbsp;&nbsp;
                    <label>{this.state.address}</label>
                  </div>
                </div>
                </div>
                <h5 className="text-center" style={{fontWeight: "bold"}}>Caller Details</h5>
                  <hr />
                <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Name :</label>&nbsp;&nbsp;
                    <label>{this.state.name}</label>
                    </div>
                  </div>
                   <div className="col-6">
                       <div className="form-group">
                    <label style = {lblStyle}>Designation :</label>&nbsp;&nbsp;
                    <label>{this.state.designation}</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Contact No :</label>&nbsp;&nbsp;
                    <label>{this.state.contactno}</label>
                    </div>
                  </div>
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Person Tos Visit :</label>&nbsp;&nbsp;
                    <label>{this.state.PToV}</label>
                    </div>
                  </div>
                </div>
                <h5 className="text-center" style={{fontWeight: "bold"}}>Assignment Details</h5>
                  <hr />
                <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label>Ref No</label>
                    {/* <input type="text" placeholder="Enter Ref No" name="refno" /> */}
                    <input
                      type="text"
                       className="form-control"
                      placeholder="Enter Ref No"
                      value={this.state.refno}
                      name="refno"
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                  <div className="col-6">
                      <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                       className="form-control"
                      placeholder="Enter Date"
                      value={this.state.assignmentDate}
                      name="assignmentDate"
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                </div>
                <div className="row">
                   <div className="col-6">
                       <div className="form-group">
                    <label>Engineer</label>
                    <select
                        className="form-control"
                        name="engineer"
                        onChange={this.onChange}>
                        <option >Select</option>
                        {Emp}
                  </select>
                    </div>
                  </div>
                  <div className="col-6">
                      <div className="form-group">
                    <label>Remarks</label>
                    <input
                  type="textarea"
                  name="remarks"
                   className="form-control"
                  placeholder="Add Remarks"
                  onChange={this.onChange}
                />
                </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input type="button" value = "Save Above Details" className="btn btn-primary" onMouseDown = {this.onSubmit} onMouseUp = {this.getAssignId}
                            disabled = {!(this.state.assignmentDate && this.state.engineer && this.state.remarks)}/>
                        </div>
                    </div>    
                </div>
                <h5 className="text-center" style={{fontWeight: "bold"}}>Product Details</h5>
                  <hr />
                <div className="row">
                <div className="col-6">
                    <div className="form-group">
                    <label>Serial No</label>
                    <input
                      type="text"
                       className="form-control"
                      placeholder="Enter Serial No"
                      name="serialno"
                      onChange={this.onChange}
                    />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <div className="form-group">
                            <label>.</label><br />
                        <input type="button" value = "Save Serial No" className="btn btn-primary" onClick = {this.loadDateSerialno} 
                        disabled = {!(this.state.serialno)} />
                        </div>
                    </div>
                </div>
                </div>
                <div className="row">
                  {this.state.showme?<div>
				<table id="tab1" className="table table-bordered mb-4" onMouseOver = {this.getTableRow}>
                    <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Product Category</td>
                        <td>Sub Category</td>
						            <td>Oem</td>
                        <td>Serial No</td>
                        <td>Model No</td>
                    </thead>
                    <tbody>
     					          {rows}
                    </tbody>
                </table>
			</div>:null} 
                </div>
                <div className="row">
                   <input type="button" value = "Save Updated Data" className="btn btn-primary" onClick = {this.updateComplaint} 
                   disabled = {!(this.state.assignmentDate && this.state.engineer && this.state.remarks)}/>
                </div>
        </form>
        </div>
    )
  }
}