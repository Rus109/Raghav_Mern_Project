import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import InstProRegDetails from './instProRegDetails';
import isEmpty from './../../../validation/is-empty';
import InsProReg1 from './insProReg1';
import InsProReg2 from './insProreg2';

let tabOne;
let tabTwo;
let installId;
class CreateInstall extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            installrefno: "",
            installdate: "",
            serialno: "",
            proregdetailsmap: [],
            proreg: [],
            proregid: "", // this is needed later
            employees: [],
            employeesid: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",
            customersubdepartment: [],
            customersubdepartmentid: "",
            contactperson: "",
            contactno: "",
            address: "",
            remarks: "",
            installdoc: "",
            installid: "",

            showme: false,
            proreg: [],
            tabone: [],
            tabtwo: []
         }
         this.onChange = this.onChange.bind(this);
         this.onFileSelect = this.onFileSelect.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onChangeSerial = this.onChangeSerial.bind(this);
         this.loadDateSerialno = this.loadDateSerialno.bind(this);
         this.getTableRow = this.getTableRow.bind(this);
         this.blank = this.blank.bind(this);
         this.getInstallationId = this.getInstallationId.bind(this);
         this.clearDate = this.clearDate.bind(this); 
         this.done = this.done.bind(this);
    }

    componentDidMount(){

      let tempnumber = Math.random().toString();
      let number = tempnumber.split(".");
      let randomnumber = "INST-" + number[1];
      this.setState({installrefno: randomnumber}) 
    
      axios
      .get("http://localhost:4000/api/proreg")
      .then(response => {
        this.setState({ proreg: response.data });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });

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
      .get("http://localhost:4000/api/customertype")
      .then(response => {
        this.setState({ customertype: response.data });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersubdepartment: response.data });
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error);
      });
      
    }
    onChange(e) {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value);
    }

    loadDateSerialno(e){
      let arrProReg = [];
      let installid = this.state.installid;
      arrProReg = this.state.proreg;

      let ProRegId;
      const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/installation/serialno", obj)
        .then(response => {
          if(isEmpty(response.data)){
            alert("The Serial no does not exist!")
          }
          else{
                        console.log(response.data)
            let temptab = response.data
            temptab.map(item => {
              ProRegId = item._id;
              console.log(ProRegId)
              tabTwo = {
                ProRegId: item._id,
                prodfno1: item.refno1,
                prodfno2: item.refno1,
                date: item.date,
                customertype: item.customertype,
                customer: item.customer,
                department: item.department
              }

              item.products.map(i2 => {
                tabOne = {
                  productdetails: i2._id,
                  category: i2.category,
                  subcategory: i2.subcategory,
                  oem: i2.oem,
                  modelno: i2.modelno,
                  serialno: i2.serialno
                }

              })
            })

            console.log(tabTwo)
            console.log(tabOne)
            this.setState({
            tabtwo: [...this.state.tabtwo, tabTwo],
            tabone: [...this.state.tabone, tabOne]
            })

      let formData = new FormData();
        formData.append('proregid', ProRegId);
        formData.append('newserialno', this.state.serialno);

      axios
      .post("http://localhost:4000/api/installation/product/" + this.state.installid, formData)
      .then(response => response.data) 
    
      }   
      
      console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
      });
  
      this.setState({
        showme: true
      });


    }
      
        getTableRow(e){
        e.preventDefault();
        let installationId = this.state.installid;
        var myArray1 = this.state.tabone;
        var myArray2 = this.state.tabtwo;
        
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            myArray1.splice(this.rowIndex, 1);
            myArray2.splice(this.rowIndex, 1);

            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[3]
            // console.log(retrievedserialno)
            axios
            .get("http://localhost:4000/api/installation/edit/" + installationId)
            .then(response =>{
              // console.log(response.data)
              let tempArr = [response.data]
              tempArr.map((item, i) => {
                // console.log(item)
              item.productdetails.map(i2 => {
      
                if(retrievedserialno === i2.newserialno){    
                    axios
                    .delete("http://localhost:4000/api/installation/product/" + installationId + "/" + i2._id)
                    .then(response => console.log(response.data))
                    alert("Deleted!") 
                    // window.location.reload(); 
                    }
                  })
                })
              })
          }
        }
      }

    blank(){
            axios
              .get("http://localhost:4000/api/installation")
              .then(response => {
                response.data.map((item, i) => {
                  // console.log(item.installrefno)
                  // console.log(this.state.installrefno)
                  if(item.installrefno === this.state.installrefno){
                    // console.log(item._id)
                    this.setState({installid: item._id})
                    installId = item._id;
                  }
                })
        })
    }

    onChangeSerial(e){
      var mainId = e.target.value.split("#")
      this.setState({
        proregid: mainId[0]
      })
      console.log(mainId[0]);
    }

    onFileSelect(e){
      console.log(e.target.files[0])
      this.setState({ installdoc: e.target.files[0]});
    }

    onSubmit(e){
      e.preventDefault();

      const {installrefno, installdate, employeesid, customerid, customertypeid, 
        customersubdepartmentid, contactperson, contactno, address, remarks, installdoc} = this.state

        let formData = new FormData();
        formData.append('installrefno', installrefno);
        formData.append('installdate', installdate);
        formData.append('employeesid', employeesid);
        formData.append('customerid', customerid);
        formData.append('customertypeid', customertypeid);
        formData.append('customersubdepartmentid', customersubdepartmentid);
        formData.append('contactperson', contactperson);
        formData.append('contactno', contactno);
        formData.append('address', address);
        formData.append('remarks', remarks);
        formData.append('installdoc', installdoc);
  
        console.log(formData)

      // const headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // };
  
      axios.post("http://localhost:4000/api/installation/add", formData)
      // ,{headers};
    }

    getInstallationId(){

    }

    clearDate(){

      let tempnumber = Math.random().toString();
      let number = tempnumber.split(".");
      let randomnumber = "INST-" + number[1];
      this.setState({installrefno: randomnumber}) 

      console.log(randomnumber)
      tabOne;
      tabTwo;
      installId;

      this.setState({
            installdate: "",
            serialno: "",
            proregdetailsmap: [],
            proregid: "", // this is needed later
            employeesid: "",
            customerid: "",
            customertypeid: "",
            customersubdepartmentid: "",
            contactperson: "",
            contactno: "",
            address: "",
            remarks: "",
            installdoc: "",
            installid: "",

            showme: false,
            proreg: [],
            tabone: [],
            tabtwo: []
      })
    }

    done(){
      this.props.history.push("/api/installation");
    }
    render() { 

      console.log(this.state.installid)

          const Employees = this.state.employees.map((emp, i) => (
            <option key={i} value={emp._id}>
              {emp.name}
            </option>
          ));

          const Customer = this.state.customer.map((cus, i) => (
            <option key={i} value={cus._id}>
              {cus.customername}
            </option>
          ));

           const CustomerType = this.state.customertype.map((cusT, i) => (
            <option key={i} value={cusT._id}>
              {cusT.customertype}
            </option>
          ));

          const CustomerSubDepartment = this.state.customersubdepartment.map((cusSubD, i) => (
            <option key={i} value={cusSubD._id}>
              {cusSubD.department}
            </option>
          ));

          
          const TabListOne = this.state.tabone.map((item, i) => {
              return <InsProReg1 obj={item} />;
          })

          const TabListTwo = this.state.tabtwo.map((item, i) => {
			        return <InsProReg2 obj={item} />;
          });

        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }} onMouseMove={this.blank}>
            <Link to="/api/installation" className="btn btn-info">
            Back to List
          </Link>
              <h3 className="text-center">Add New Installation</h3>
              <form style={{ marginTop: "5%" }}>
              <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Installation Reference No: </label>
                      <input type="text"
                      className="form-control"
                      name="installrefno"
                      rows="5"
                      placeholder="Installation Reference No"
                      value = {this.state.installrefno}
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Installation Date: </label>
                      <input
                      type="date"
                      className="form-control"
                      name="installdate"
                      value = {this.state.installdate}
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                </div>

                   
                  
                  <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Installed by:</label>
                      <select
                        className="form-control"
                        name="employeesid"
                        value = {this.state.employeesid}
                        onChange={this.onChange}>
                        <option >Select</option>
                        {Employees}
                  </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Customer: </label>
                      <select
                        className="form-control"
                        name="customerid"
                        value = {this.state.customerid}
                        onChange={this.onChange}>
                        <option >Select</option>
                        {Customer}
                  </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Customer Type: </label>
                      <select
                      name="customertypeid"
                      value = {this.state.customertypeid}
                      className="form-control"
                      placeholder="Customer Type"
                      onChange={this.onChange}>
                      <option>Select</option>
                      {CustomerType}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Department: </label>
                      <select
                        className="form-control"
                        name="customersubdepartmentid"
                        value = {this.state.customersubdepartmentid}
                        onChange={this.onChange}>
                        <option >Select</option>
                        {CustomerSubDepartment}
                  </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Contact Person: </label>
                      <input
                      type="text"
                      name="contactperson"
                      className="form-control"
                      placeholder="Contact Person"
                      value = {this.state.contactperson}
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                  <div>
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
                      value = {this.state.contactno}
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Document: </label>
                      <input type="file"
                        className="form-control"
                        name="installdoc"
                        placeholder="Select a Document.."
                        onChange={this.onFileSelect} />
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
                        placeholder="Address"
                        value = {this.state.address}
                        onChange={this.onChange} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Remark: </label>
                      <textarea
                      type="text"
                      name="remarks"
                      className="form-control"
                      placeholder="Remarks"
                      value = {this.state.remarks}
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <input type="button" value="Submit" onClick={this.onSubmit} className="btn btn-primary"
                  disabled = {!(this.state.installdate && this.state.employeesid && this.state.customerid && this.state.customertypeid && 
                  this.state.contactperson && this.state.contactno && this.state.installdoc && this.state.address && this.state.remarks)} />
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
                    value = "Add Serial No"
                    onClick={this.loadDateSerialno}
                  />
                  </div>
                  </div>  
                </div>

                 {this.state.showme?
                      
                <div className="row"><div>
								<ul class="nav nav-tabs" id="myTab" role="tablist">
									<li class="nav-item">
										<a
											class="nav-link active"
											id="home-tab"
											data-toggle="tab"
											href="#home"
											role="tab"
											aria-controls="home"
											aria-selected="true"
										>
											Product Details
										</a>
									</li>
									<li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#profile"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Delivery Details
										</a>
									</li>
								</ul>
								<div class="tab-content" id="myTabContent">
									<div
										class="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab">

										<table id="tab1" className="table table-bordered mb-4" onMouseOver={this.getTableRow}>
                        <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Product Category</td>
                        <td>Sub Category</td>
                        <td>OEM</td>
                        <td>Serial No</td>
                        <td>Model No</td>
                        </thead>
                        <tbody>
                          {TabListOne}
                        </tbody>
                    </table>
									</div>

									<div
										class="tab-pane fade"
										id="profile"
										role="tabpanel"
										aria-labelledby="profile-tab">
										<table id="tab2" className="table table-bordered mb-4">
                        <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Ref No 1</td>
                        <td>Ref No 2</td>
                        <td>Delivery Date</td>
                        <td>Customer type</td>
                        <td>Customer</td>
                        <td>Department</td>
                        </thead>
                        <tbody>
                          {TabListTwo}
                        </tbody>
                    </table>
									</div>
								</div>
              </div>  
             </div>
     :null}
              </form>

              <input type="button" onClick = {this.done} value="Done" className="btn btn-info" /> &nbsp; &nbsp;  <input type="button" onClick = {this.clearDate} value="Clear Data" className="btn btn-info" />
            </div>
         );
    }
}
 
export default CreateInstall;