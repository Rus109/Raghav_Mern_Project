import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import UpdateCompProReg from './updateCompProReg';

  let caseid;
  let tabOne;
  let tabone = [];
  let triggerer;
  let proreid;
  let rows;

class EditComplaint extends Component {
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

        axios
        .get("http://localhost:4000/api/complaint/edit/" + this.props.match.params.id)
       
        .then(response => { 
         
          var datecomplaintdate = new Date(response.data.complaintdate);
          var dataDatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);

          console.log(response.data.remarks)

          this.setState({

              caseid: response.data.caseid,
              complaintdate: dataDatecomplaintdate,
              complainttime: (response.data.complainttime).toString(),
              serialno: response.data.serialno,
              proregdetailsmap: response.data.productdetails,
              servicetype: response.data.servicetype,
              calltypeid: Object.entries(response.data.calltype)[0].slice(1),
              customerid: Object.entries(response.data.client)[0].slice(1),
              customertypeid: Object.entries(response.data.clienttype)[0].slice(1),
              departmentid:  Object.entries(response.data.departmentname)[0].slice(1),
              name: response.data.name,
              designation: response.data.designation,
              contactno: response.data.contactno,
              persontovisit: response.data.persontovisit,
              problemdetails: response.data.problemdetails,
              address: response.data.address,
              isresolvedonphone: response.data.isresolvedonphone,
              status: response.data.status,
              remarks: response.data.remarks
          }
          , ()=> {
    
            tabone = [];
            var tempArr = response.data.complaints_pro_details;
              // var serialNo = response.data.serialno;

                  tempArr.map((i1, i) => {
                  var serianNo = i1.complaints_serialno
                  let tempArr2 = [i1.complaints_prod];
                  
                  tempArr2.map(i2 => {
                    i2.products.map(i3 => {
                      console.log(i3)
                      if(serianNo === i3.serialno){
                      tabOne = {
                              category: i3.category,
                              subcategory: i3.subcategory,
                              oem: i3.oem,
                              modelno: i3.modelno,
                              serialno: i3.serialno
                            }
                            tabone.push(tabOne);
                            this.setState({
                              tabone: [...this.state.tabone, tabOne]
                            })
                          }
                    })
                  })
                // return <UpdateCompProReg obj={tabone}/>;
              })
            }
            
            )

            this.setState({showme: true})

            if(response.data.isresolvedonphone === true){
              console.log("yes")
              document.getElementById("radio1").checked = true;
            }
            else {
              console.log("No")
              document.getElementById("radio2").checked = true;
            }
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
                     })
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
                        })
                      })
                      }
                    })
                }
              
              })
              if(triggerer === false){
              tabone.push(tabOne);
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
                  .post("http://localhost:4000/api/complaint/product/" + this.props.match.params.id, newobj1)
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
          .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.id, obj)
          .then(res => console.log(res.data));


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

              axios
                .get("http://localhost:4000/api/complaint/edit/" + Id)
                .then(response =>{
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                  item.complaints_pro_details.map(i2 => {
                    console.log(i2)    
                  axios
                    .delete("http://localhost:4000/api/complaint/product/" + Id + "/" + i2._id)
                    .then(res => res.data)
                })
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
       if(this.state.isresolvedonphone === true){
              console.log("yes")
              document.getElementById("radio1").checked = true;
            }
            else {
              console.log("No")
              document.getElementById("radio2").checked = true;
            }

        axios
        .get("http://localhost:4000/api/serviceprovider")
        .then(response => {
          this.setState({ serviceprovider: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
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
    
          rows = tabone.map((item, i) => {
			        return <UpdateCompProReg obj={item} />;
          });
          
        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }} onMouseMove={this.blank}>
      <Link to="/api/complaint" className="btn btn-info">
      Back to List
    </Link>
        <h3 className="text-center">Edit Complaint</h3>
        <form style={{ marginTop: "5%" }}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Case ID: </label>
                <input
                type="text"
                name="caseid"
                className="form-control"
                placeholder="Complain No"
                value={this.state.caseid}
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
                          value={this.state.complaintdate}
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
                          value={this.state.complainttime}
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
                  value={this.state.servicetype}
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
                  value={this.state.calltypeid}
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
                  value={this.state.customertypeid}
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
                  value={this.state.customerid}
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
                  value={this.state.departmentid}
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
                value={this.state.name}
                onChange={this.onChange} />              
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Designation: </label>
                <input type="text" 
                className="form-control"
                name="designation" 
                value={this.state.designation}
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
                value={this.state.contactno}
                onChange={this.onChange} />              
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Person To Vist: </label>
                <input type="text" 
                className="form-control"
                name="persontovisit"
                value={this.state.persontovisit} 
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
                value={this.state.address} 
                onChange={this.onChange} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Problem Details: </label>
                <textarea 
                className="form-control"
                name="problemdetails"
                value={this.state.problemdetails}  
                onChange={this.onChange} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Is Resolved On Phone: </label>
                <div class="radio">
                <label><input id="radio1" type="radio" name="isresolvedonphone"  value = "true" checked = {this.state.isresolvedonphone === "true"} onChange = {this.onChange} />&nbsp;Yes</label>
                </div>
                <div class="radio">
                <label><input id="radio2" type="radio" name="isresolvedonphone" value = "false" checked = {this.state.isresolvedonphone === "false"} onChange = {this.onChange} />&nbsp;No</label>
                </div>             
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Status: </label>
                <select 
                  className="form-control"
                  name="status"
                  value={this.state.status}  
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
                value={this.state.remarks}  
                onChange={this.onChange} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input type="button" value="Update" className="btn btn-primary" onMouseDown = {this.onSubmit} onMouseUp={this.getComplaintId} onKeyDown = {this.onSubmit} onKeyUp={this.getComplaintId} 
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
 
export default EditComplaint;