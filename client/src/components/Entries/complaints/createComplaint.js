import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import InstProRegDetails from './instaProRegDetails';

  let caseid;
  let tabOne;
  let triggerer;
  let proreid;

class CreateComplaint extends Component {
    constructor(props) {
        super(props);
        this.state = { 

            caseid: "",
            complaintdate: "",
            complainttime: "",
            serialno: "",
            servicetype: "",
            calltype: [],
            calltypeid: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",
            department: [],
            departmentid: "",
            name: "",
            designation: "",
            contactno: "",
            persontovisit: "",
            address: "",
            problemdetails: "",
            isresolvedonphone: "",
            status: "",
            remarks: "",

            proregdetailsmap: [],
            complaintId: "",
            tabone: []
         }
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.loadDateSerialno = this.loadDateSerialno.bind(this);
         this.getComplaintId = this.getComplaintId.bind(this);
         this.getTableRow = this.getTableRow.bind(this);
         this.blank = this.blank.bind(this);
    }
    componentDidMount(){

        axios
        .get("http://localhost:4000/api/customer")
        .then(response => {
          this.setState({ customer: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
  
        axios
        .get("http://localhost:4000/api/calltype")
        .then(response => {
          this.setState({ calltype: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });

        axios
        .get("http://localhost:4000/api/customertype")
        .then(response => {
          this.setState({ customertype: response.data });
          console.log(this.state.customertype)
        })
        .catch(function(error) {
          console.log(error);
        });
  
        axios
        .get("http://localhost:4000/api/customersubdepartment")
        .then(response => {
          this.setState({ department: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });

        let tempnumber = Math.random().toString();
        let number = tempnumber.split(".");
        let randomnumber = "CP-" + number[1];
        this.setState({caseid: randomnumber})

      }

      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
      }

    loadDateSerialno(e){
    
    const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/complaint/serialno", obj)
        .then(res => {
          if(isEmpty(res.data)){
            alert("The Serial no does not exist!")
          }
          else{
            axios
          .get("http://localhost:4000/api/complaint")
          .then(response => {
            console.log(response.data);
            let tempArr = response.data;

            tempArr.map(i2 => {
              if(i2.multpleamcandref === undefined){
                console.log("Enter !st entry")
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
                        return true;
                     })
                     return true;
                  })
                }
                else{
                    i2.multpleamcandref.map(i3 => {
                    if(i3.arnserialno === this.state.serialno){
                      alert("The Serial No's AMC already renewed!");
                      triggerer = true;
                    }

                    if(triggerer === false){
                      console.log(res.data)
                        let temptab = res.data
                        temptab.map(item => {

                          item.products.map(i2 => {
                            tabOne = {
                              category: i2.category,
                              subcategory: i2.subcategory,
                              oem: i2.oem,
                              modelno: i2.modelno,
                              serialno: i2.serialno
                            }
                            return true;
                        })
                      })
                      }
                      return true;
                    })
                }
              return true;
              })
              if(triggerer === false){
              this.setState({
                  tabone: [...this.state.tabone, tabOne]
                  })

               let newobj1 = {
                  proregid: proreid,
                  complaints_serialno: this.state.serialno,
                  dataamc: "single"
                  }

                  console.log(newobj1)
                  axios
                  .post("http://localhost:4000/api/complaint/product/" + caseid, newobj1)
                  .then(response => response.data) 
                }
            })     
          }
           console.log(res.data)
        })
        .catch(function(error) {
          console.log(error);
      });

      console.log("here")
      this.setState({
        showme: true
      })

      triggerer = false;
    }

    getComplaintId(){
            axios
              .get("http://localhost:4000/api/complaint/")
              .then(response => {
                console.log(response.data)
                response.data.map((item, i) => {
                  if(item.caseid === this.state.caseid){
                    
                    console.log(item._id)
                    this.setState({complaintId: item._id})
                    caseid = item._id;
                  }
                  return true;
                })
        })
        console.log(caseid)
    }

      onSubmit(e){
        console.log('clicked')
        e.preventDefault();
        
        const {
        caseid,
        complaintdate,
        complainttime,
        servicetype,
        calltypeid,
        customerid,
        customertypeid,
        departmentid,
        name,
        designation,
        contactno,
        persontovisit,
        problemdetails,
        address,
        isresolvedonphone,
        status,
        remarks
      } = this.state
  
        const obj = {
          caseid: caseid,
          complaintdate: complaintdate,
          complainttime: complainttime,
          servicetype: servicetype,
          calltypeid: calltypeid,
          customerid: customerid,
          customertypeid: customertypeid,
          customersubdepartmentid: departmentid,
          name: name,
          designation: designation,
          contactno: contactno,
          address: address,
          persontovisit: persontovisit,
          problemdetails: problemdetails,
          isresolvedonphone: isresolvedonphone,  
          status: status,
          remarks: remarks
      };
    
        console.log(obj)
    
        axios
          .post("http://localhost:4000/api/complaint/add", obj)
          .then(res => console.log(res.data));


      }

       getTableRow(e){
        e.preventDefault();

        var myArray1 = this.state.tabone;
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            alert(this.rowIndex);
            myArray1.splice(this.rowIndex, 1);

              axios
                .get("http://localhost:4000/api/complaint/edit/" + caseid)
                .then(response =>{
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                    console.log(item)
                  item.complaints_pro_details.map(i2 => {    
                  axios
                    .delete("http://localhost:4000/api/complaint/product/" + caseid + "/" + i2._id)
                    .then(res => res.data)
                    return true;
                  })
                  return true;
                })
              })  
        }
      }
      console.log(myArray1)
      this.setState({
        tabone : myArray1
      })
      console.log(this.statetabone)
      }

    blank(){
        axios
              .get("http://localhost:4000/api/complaint/")
              .then(response => {
                console.log(response.data)
                response.data.map((item, i) => {
                  if(item.caseid === this.state.caseid){
                    
                    console.log(item._id)
                    this.setState({complaintId: item._id})
                    caseid = item._id;
                  }
                  return true;
              })
        })
        console.log(caseid)
    }
    render() { 

        const CallTpye = this.state.calltype.map((calT, i) => (
            <option key={i} value={calT._id}>
              {calT.calltype}
            </option>
          ));

        const Customer = this.state.customer.map((cus, i) => (
            <option key={i} value={cus._id}>
              {cus.customername}
            </option>
          ));
    
          const CustomerT = this.state.customertype.map((cusT, i) => (
            <option key={i} value={cusT._id}>
              {cusT.customertype}
            </option>
          ));
    
          const Department = this.state.department.map((dep, i) => (
            <option key={i} value={dep._id}>
              {dep.department}
            </option>
          ));
    
          const rows = this.state.tabone.map((item, i) => {
			        return <InstProRegDetails obj={item} />;
          });
          
        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }} onMouseMove={this.blank}>
      <Link to="/api/complaint" className="btn btn-info">
      Back to List
    </Link>
        <h3 className="text-center">Add Complaint</h3>
        <form style={{ marginTop: "5%" }}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Case ID: </label>
                <input
                type="text"
                name="caseid"
                className="form-control"
                value = {this.state.caseid}
                onChange={this.onChange}
              />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Call Date: </label>
                <input type="date" 
                          className="form-control"
                          name="complaintdate" 
                          onChange={this.onChange}>
                          </input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Call Time: </label>
                <input type="time" 
                          className="form-control"
                          name="complainttime" 
                          onChange={this.onChange}>
                          </input>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Service Type: </label>
                <select
                  className="form-control"
                  name="servicetype"
                  onChange={this.onChange}>
                  <option>Select</option>
                  <option id= "1" value="In House">In House</option>
                  <option id= "2" value="On Site">Off Site</option>
            </select>
              </div>
            </div>
            </div>

          <div className="row">
            
            <div className="col-6">
              <div className="form-group">
                <label>Call Type:</label>
                <select
                  className="form-control"
                  name="calltypeid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {CallTpye}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Client Type:</label>
                <select
                  className="form-control"
                  name="customertypeid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {CustomerT}
            </select>
              </div>
            </div>
          </div>
          <div className="row">
            
            <div className="col-6">
              <div className="form-group">
                <label>Client:</label>
                <select
                  className="form-control"
                  name="customerid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {Customer}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Department Name:</label>
                <select
                  className="form-control"
                  name="departmentid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {Department}
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
          <h3 className="text-center">Caller Details :</h3>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" 
                className="form-control"
                name="name" 
                value={this.state.amcstartdate}
                onChange={this.onChange} />              
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Designation: </label>
                <input type="text" 
                className="form-control"
                name="designation" 
                value={this.state.amcexpiredate}
                onChange={this.onChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Contact No:</label>
                <input type="text" 
                className="form-control"
                name="contactno" 
                onChange={this.onChange} />              
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Person To Vist: </label>
                <input type="text" 
                className="form-control"
                name="persontovisit" 
                onChange={this.onChange} />
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
                onChange={this.onChange} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Problem Details: </label>
                <textarea 
                className="form-control"
                name="problemdetails" 
                onChange={this.onChange} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Is Resolved On Phone: </label>
                <div class="radio">
                <label><input type="radio" name="isresolvedonphone"  value = "true" checked = {this.state.isresolvedonphone === "true"} onChange = {this.onChange} />&nbsp;Yes</label>
                </div>
                <div class="radio">
                <label><input type="radio" name="isresolvedonphone" value = "false" checked = {this.state.isresolvedonphone === "false"} onChange = {this.onChange} />&nbsp;No</label>
                </div>             
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Status: </label>
                <select 
                  className="form-control"
                  name="status"
                  onChange={this.onChange}>
                  <option>Select</option>
                  <option id ="1" value = "Unassigned">Unassigned</option>
                  <option id = "2" value = "Complete">Complete</option> 
                  </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Remarks: </label>
                <textarea 
                className="form-control"
                name="remarks" 
                onChange={this.onChange} />
              </div>
            </div>
          </div>
          <div className="form-group">

            <input type="button" value="Submit" className="btn btn-primary" onMouseDown = {this.onSubmit} onMouseUp={this.getComplaintId} onKeyDown = {this.onSubmit} onKeyUp={this.getComplaintId} 
            disabled = {!(this.state.complaintdate && this.state.complaintdate && this.state.complainttime && this.state.servicetype && this.state.calltypeid && this.state.customertypeid
            && this.state.customerid && this.state.departmentid && this.state.name && this.state.designation && this.state.contactno && this.state.persontovisit && this.state.address && this.state.problemdetails
            && this.state.isresolvedonphone && this.state.status && this.state.remarks)}/>

          </div>

          <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Serial No: </label>
                      <input type="text"
                      className="form-control"
                      name="serialno"
                      rows="5"
                      placeholder="Enter Serialno"
                      onChange={this.onChange}/>
                     </div>
                  </div>
                    <div className="col-6">
                    <div className="form-group">
                      <label>. </label><br />
                      <input type="button"
                    className="btn btn-info"
                    value = "Check Serial No"
                    onClick={this.loadDateSerialno}
                    disabled = {!(this.state.serialno)}
                  />
                  </div>
                  </div>
            </div>

                  <div className="row">
                    {this.state.showme?<div>
				<table id="tab1" className="table table-bordered mb-4" onMouseOver = {this.getTableRow}>
                    <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Serial No</td>
                        <td>Model No</td>
                        <td>Product Category</td>
                        <td>Sub Category</td>
						<td>Oem</td>
                    </thead>
                    <tbody>
     					{rows}
                    </tbody>
                </table>
			</div>:null} 
                  </div>
        </form>
      </div>
         );
    }
}
 
export default CreateComplaint;