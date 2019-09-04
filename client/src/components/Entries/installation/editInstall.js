import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import InstProRegDetails from './updateInstProRegDetails';
import isEmpty from '../../../validation/is-empty';
import UpdateInstProReg1 from './updateInstProreg1';
import UpdateInstProReg2 from './updateInstProReg2';

const BASE_URL = "http://localhost:3000/"
var Proregdetails = "";

let tabOne;
let tabTwo;
let tabone = [];
let tabtwo = []; 
let TabListOne;
let TabListTwo;

class EditInstall extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            installrefno: "",
            installdate: "",
            proregdetailsmap: [],
            proreg: [],
            proregid: "",
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
            imageName: [],
            showme: false,

            tabone: [],
            tabtwo: [],
            triggerer: ''
         }
         this.onChange = this.onChange.bind(this);
         this.onFileSelect = this.onFileSelect.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.loadDateSerialno = this.loadDateSerialno.bind(this);
         this.getTableRow = this.getTableRow.bind(this);
         this.done = this.done.bind(this);
    }

    componentDidMount(){

      console.log(this.props.match.params.id)
        axios
      .get("http://localhost:4000/api/proreg")
      .then(response => {
        this.setState({ proreg: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

      axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
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

      axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersubdepartment: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

      let ProRegId;
      let installationId = this.props.match.params.id;
      axios
          .get("http://localhost:4000/api/installation/edit/" + installationId)
         
          .then(response => { 
            var dateInstalldate = new Date(response.data.installdate);
            var dataDateInstalldate = dateInstalldate.toISOString().substr(0, 10);

            this.setState({
                installrefno: response.data.installrefno,
                installdate: dataDateInstalldate,
                serialno: response.data.serialno,
                proregdetailsmap: response.data.productdetails,
                employeesid: (Object.entries(response.data.installedby)[0].slice(1)).toString(),
                customerid: (Object.entries(response.data.customer)[0].slice(1)).toString(),
                customertypeid: (Object.entries(response.data.customertype)[0].slice(1)).toString(),
                customersubdepartmentid: (Object.entries(response.data.department)[0].slice(1)).toString(),
                contactperson:  response.data.contactperson,
                contactno: response.data.contactno,
                address: response.data.address,
                remarks: response.data.remarks,
                imageName: response.data.filename
            }, ()=>{
             response.data.productdetails.map(i1 => {
               let serialno = i1.newserialno;
              let tempdetails = [i1.proregtn]
              tempdetails.map(i2 => {
                  tabTwo = {
                    ProRegId: i2._id,
                    prodfno1: i2.refno1,
                    prodfno2: i2.refno1,
                    date: i2.date,
                    customertype: i2.customertype,
                    customer: i2.customer,
                    department: i2.department
              }

              i2.products.map(i3 => {
                if(serialno === i3.serialno){
                  console.log("triggered")
                tabOne = {
                  productdetails: i3._id,
                  category: i3.category,
                  subcategory: i3.subcategory,
                  oem: i3.oem,
                  modelno: i3.modelno,
                  serialno: i3.serialno
                }

                tabone.push(tabOne)
                this.setState({
                tabone: [...this.state.tabone, tabOne]
                })
              }
              })
              tabtwo.push(tabTwo)
              this.setState({
              tabtwo: [...this.state.tabtwo, tabTwo],
              })
            })
            })
          })

            this.setState({showme: true})
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
        console.log(e.target.name);
    }

    onFileSelect(e){
        console.log(e.target.files[0])
        this.setState({ installdoc: e.target.files[0]});
    }

    componentDidUpdate(){

    }

    loadDateSerialno(e){

      let ProRegId = "";
      const obj = {serialno: this.state.serialno}
      axios
        .post("http://localhost:4000/api/installation/serialno", obj)
        .then(response => {
          if(isEmpty(response.data)){
            alert("Serial No does not exist");
          }
          else{
            let temptab = response.data
            temptab.map(item => {
            ProRegId = item._id

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
              console.log(tabTwo)
            })

            tabone.push(tabOne)
            tabtwo.push(tabTwo)
            this.setState({
            tabtwo: [...this.state.tabtwo, tabTwo],
            tabone: [...this.state.tabone, tabOne]
            })

          let formData = new FormData();
          formData.append('proregid', tabTwo.ProRegId);
          formData.append('newserialno', this.state.serialno);

          console.log(this.state.serialno)

      axios
      .post("http://localhost:4000/api/installation/product/" + this.props.match.params.id, formData)
      .then(response => response.data) 
          }

        })
        .catch(function(error) {
          console.log(error);
      });

      }

        getTableRow(e){
        e.preventDefault();
        let instrefno = this.state.installrefno;
        let installationId = this.props.match.params.id;
        var myArray1 = tabone;
        var myArray2 = tabtwo;
        
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {

            myArray1.splice(this.rowIndex, 1);
            myArray2.splice(this.rowIndex, 1);

            tabone = myArray1;
            tabtwo = myArray2;

            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[3]
            console.log(retrievedserialno)
            axios
            .get("http://localhost:4000/api/installation/edit/" + installationId)
            .then(response =>{
              console.log(response.data)
              let tempArr = [response.data]
              tempArr.map((item, i) => {
              item.productdetails.map(i2 => {
      
                if(retrievedserialno === i2.newserialno){    
                    axios
                    .delete("http://localhost:4000/api/installation/product/" + installationId + "/" + i2._id)
                    .then(response => console.log(response.data))
                    alert("Deleted!") 
                    window.location.reload(); 
                    }
                  })
                })
              })
          }
           
        }
      }

    onSubmit(e){

        console.log('clicked')
      e.preventDefault();

      let innstallationID = this.props.match.params.id;

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

      const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
      };
  
      axios.post("http://localhost:4000/api/installation/update/" + innstallationID, formData), {headers};

      }

    done(){
      this.props.history.push("/api/installation");
    }

    componentWillUnmount(){
      tabOne;
      tabTwo;
      tabone = [];
      tabtwo = []; 
      TabListOne;
      TabListTwo;
    }

    render() { 
           
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

          TabListOne = tabone.map((item, i) => {
              return <UpdateInstProReg1 obj={item} />;
          })

          TabListTwo = tabtwo.map((item, i) => {
			        return <UpdateInstProReg2 obj={item} />;
          });
         
        return ( 
           <div style={{ marginTop: 10, marginLeft: "10%" }}>
            <Link to="/api/installation" className="btn btn-info">
            Back to List
          </Link>
              <h3 className="text-center">Add New Installation</h3>
              <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
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
                      className="form-control"
                      placeholder="Customer Type"
                      value = {this.state.customertypeid}
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
                  <input type="submit" value="Update" className="btn btn-primary" disabled = {!(this.state.installdoc)} />
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
               <input type="button" onClick = {this.done} value="Done" className="btn btn-info" />
            </div>
         );
    }
}
 
export default EditInstall;