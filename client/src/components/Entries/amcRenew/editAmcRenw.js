import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'; 
import UpdateAmcDetailsTable from './updateAmcDeatilsTable';
import UpdateAmcRenProReg1 from './updateAmcRenProReg1';
import UpdateAmcRenProReg2 from './updateAmcRenProReg2';
import isEmpty from '../../../validation/is-empty';

let amcrenewid;
let arrSavedSerialno = [];
let tabOne;
let tabTwo;
let tabone= [];
let tabtwo= [];
let TabListOne;

class EditAmcRenw extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amcrenewno: "",
            amcregdate: "",
            amcregistration: [],
            amcregistrationid: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",  
            department: [],
            departmentid: "",
            serviceprovider: [],
            serviceproviderid: "",
            remarks: "",
            amcstartdate: "",
            amcexpiredate: "",

            amcregedit: [],
            tabone: [],
            tabtwo: [],

            showme: false,
            showamc: false
         }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onSelectAmc = this.onSelectAmc.bind(this);
         this.loadDateSerialno = this.loadDateSerialno.bind(this);
         this.getTableRow = this.getTableRow.bind(this);
         this.done - this.done.bind(this);

    }

    onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
    }

    componentDidMount(){
        axios
        .get("http://localhost:4000/api/amcregistration")
        .then(response => {
          this.setState({ amcregistration: response.data });
        })
        .catch(function(error) {
        });

        axios
        .get("http://localhost:4000/api/customer")
        .then(response => {
          this.setState({ customer: response.data });
        })
        .catch(function(error) {
        });
  
        axios
        .get("http://localhost:4000/api/customertype")
        .then(response => {
          this.setState({ customertype: response.data });

        })
        .catch(function(error) {

        });
  
        axios
        .get("http://localhost:4000/api/customersubdepartment")
        .then(response => {
          this.setState({ department: response.data });
        })
        .catch(function(error) {
        });
        
        axios
        .get("http://localhost:4000/api/serviceprovider")
        .then(response => {
          this.setState({ serviceprovider: response.data });
 
        })
        .catch(function(error) {

        });

        axios
          .get(
            "http://localhost:4000/api/amcrenewal/edit/" + this.props.match.params.id
          )
         
          .then(response => { 

            var dateAmcRegDate = new Date(response.data.amcrenewaldate);
            var dateAmcAtartDate = new Date(response.data.arnstartdate);
            var dateAmcExpiredate = new Date(response.data.arnexpiredate);

            var dataDateAmcRegDate = dateAmcRegDate.toISOString().substr(0, 10);
            var dataDateAmcAtartDate = dateAmcAtartDate.toISOString().substr(0, 10);
            var dataDateAmcExpiredate = dateAmcExpiredate.toISOString().substr(0, 10);

            this.setState({
                amcrenewno: response.data.amcrenewno,
                amcregdate: dataDateAmcRegDate,
                // amcregistrationid: Object.entries(response.data.amcrefno)[0].slice(1),
                customerid: Object.entries(response.data.arncustomer)[0].slice(1),
                customertypeid: Object.entries(response.data.arncustomertype)[0].slice(1),
                departmentid: Object.entries(response.data.arndepartment)[0].slice(1),
                serviceproviderid: Object.entries(response.data.arnserviceprovider)[0].slice(1),
                amcstartdate: dataDateAmcAtartDate,
                amcexpiredate: dataDateAmcExpiredate,
                remarks: response.data.arnremarks
            }, () => {
              let amcRegistrationId;
              response.data.multpleamcandref.map(i1 => {
                let tempi1 = [i1.amcrefno]
                  if(i1.dataamc === "multi"){
                      tempi1.map(i2 => {
                      amcRegistrationId = i2._id;
                      arrSavedSerialno.push(i1.arnserialno);  
                    })

                    axios
                      .get("http://localhost:4000/api/amcregistration/edit/" + amcRegistrationId)
                      .then(response => {
                          this.setState({ amcregedit: response.data });

                          })
                      .catch(function(error) {
       
                          });

                          this.setState({
                            showamc: true,
                            amcregistrationid: amcRegistrationId
                          })
                    }
                    else{
                      this.setState({amcregistrationid: "Select"})
                    }
                    if(i1.dataamc === "single"){
                        tempi1.map(i2 => {
                          i2.products.map(i3 => {
                            if(i1.arnserialno === i3.serialno){

                            tabTwo = {
                            amcRefId: i2._id,
                            amcrefno: i2.amcrefno,
                            date: i2.amcregdate,
                            customertype: i2.customertype,
                            customer: i2.customer,
                            department: i2.department
                            }
                            console.log(i3)
                            tabOne = {
                              category: i3.category,
                              subcategory: i3.subcategory,
                              oem: i3.oem,
                              modelno: i3.modelno,
                              serialno: i3.serialno
                              
                            }
                            tabtwo.push(tabTwo);
                            tabone.push(tabOne);
                          }
                        })
                      })

            

            this.setState({
                // proregdetailsmap: [...this.state.proregdetailsmap, response.data],
                tabtwo: [...this.state.tabtwo, tabTwo],
                tabone: [...this.state.tabone, tabOne],
                showme: true
                  })
                  }
              })
            })
          })
          .catch(function(error) {
          });
    }
    
    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)

      }

    onSelectAmc(e){
      console.log(e.target.value)
      this.setState({ 
        amcregistrationid: e.target.value
      })
      let AmcId = e.target.value;

      axios
        .get("http://localhost:4000/api/amcregistration/edit/" + AmcId)
        .then(response => {
          this.setState({ amcregedit: response.data });
          console.log("amcregedit", response.data)

        })
        .catch(function(error) {
          console.log(error);
        });

        this.setState({showamc: true});
      }
      onSubmit(e){

        e.preventDefault();
          
        const {amcrenewno, amcregdate, customerid, customertypeid, 
            departmentid, serviceproviderid, remarks, amcstartdate, amcexpiredate} = this.state
  
        const obj = {
        amcrenewno: amcrenewno,
        amcrenewaldate: amcregdate,
        customerid: customerid,
        customertypeid: customertypeid,
        customersubdepartmentid: departmentid,
        serviceproviderid: serviceproviderid,
        arnstartdate: amcstartdate,
        arnexpiredate: amcexpiredate,
        arnremarks: remarks,
      };
    
 
        axios
          .post("http://localhost:4000/api/amcrenewal/update/" + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      }

    loadDateSerialno(e){
    
    const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/amcrenewal/serialno", obj)
        .then(response => {
          if(isEmpty(response.data)){
            alert("The Serial no does not exist!")
          }
          else{
            let temptab = response.data
            temptab.map(item => {
              tabTwo = {
                amcRefId: item._id,
                amcrefno: item.amcrefno,
                date: item.amcregdate,
                customertype: item.customertype,
                customer: item.customer,
                department: item.department
              }
              tabtwo.push(tabTwo)

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

            this.setState({
            tabtwo: [...this.state.tabtwo, tabTwo],
            tabone: [...this.state.tabone, tabOne]
            })

                  let newobj1 = {
                  amcregid: tabTwo.amcRefId,
                  arnserialno: this.state.serialno,
                  dataamc: "single"
                  }

      axios
      .post("http://localhost:4000/api/amcrenewal/product/" + this.props.match.params.id, newobj1)
      .then(response => response.data) 
      }

        })
        .catch(function(error) {
      });

      this.setState({
        showme: true
      })
    }

    getTableRow(e){
        e.preventDefault();

        console.log(this.props.match.params.id)
        let AmcRenId = this.props.match.params.id;
        var myArray1 = tabone;
        var myArray2 = tabtwo;
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            alert(this.rowIndex);
            myArray1.splice(this.rowIndex, 1);
            myArray2.splice(this.rowIndex, 1);

            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[3]

              axios
                .get("http://localhost:4000/api/amcrenewal/edit/" + AmcRenId)
                .then(response =>{
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                  
                  item.multpleamcandref.map(i2 => {
                    
                    if(retrievedserialno === i2.arnserialno){    
                  axios
                    .delete("http://localhost:4000/api/amcrenewal/product/" + AmcRenId + "/" + i2._id)
                    .then(res => res.data)

                    }
                  })
                })
              })  
        }
      }
        this.setState({
        tabone : myArray1,
        tabtwo : myArray2
      })
    }

      done(){

      amcrenewid;
      arrSavedSerialno = [];
      tabOne;
      tabTwo;
      TabListOne;

      this.setState({
            amcrenewno: "",
            amcregdate: "",
            amcregistration: [],
            amcregistrationid: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",  
            department: [],
            departmentid: "",
            serviceprovider: [],
            serviceproviderid: "",
            remarks: "",
            amcstartdate: "",
            amcexpiredate: "",

            amcregedit: [],
            tabone: [],
            tabtwo: [],

            showme: false,
            showamc: false
      })

      this.props.history.push("/api/amcrenewal");
    }

    render() { 

        amcrenewid = this.props.match.params.id;

        const AmcRefNo = this.state.amcregistration.map((proRefNo, iPRN) => (  
            <option key={iPRN} value={proRefNo._id}>
          {proRefNo.amcrefno}
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

          const ServiceProvider = this.state.serviceprovider.map((serP, i) => (
          <option key={i} value={serP._id}>
          {serP.providername}
          </option>
          ));

          TabListOne = tabone.map((item, i) => {
              return <UpdateAmcRenProReg1 obj={item} />;
          })

          const TabListTwo = tabtwo.map((item, i) => {
			        return <UpdateAmcRenProReg2 obj={item} />;
          });

          let temp = [this.state.amcregedit];

          let Amc = temp.map((item, i) => {
              return <UpdateAmcDetailsTable obj={item} amcid = {this.state.amcregistrationid} amcrenewid ={amcrenewid} mapserialno = {arrSavedSerialno} />;
          })

        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }}>
            <Link to="/api/amcrenewal" className="btn btn-info">
            Back to List
          </Link>
              <h3 className="text-center">Add AMC Renewal Registration</h3>
              <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
              <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>AMC Renewal No: </label>
                      <input type="text" 
                      className="form-control"
                      name="amcrenewno" 
                      value={this.state.amcrenewno}
                      onChange={this.onChange} />
                                
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>AMC Registration Date: </label>
                      <input type="date" 
                      className="form-control"
                      name="amcregdate" 
                      value={this.state.amcregdate}
                      onChange={this.onChange} />
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
                        value={this.state.customerid}
                        onChange={this.onChange}>
                        <option >Select</option>
                        {Customer}
                  </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-6">
                    <div className="form-group">
                      <label>Customer Type: </label>
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
                  <div className="col-6">
                    <div className="form-group">
                      <label>Department: </label>
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
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Service Provider: </label>
                      <select
                        className="form-control"
                        name="serviceproviderid"
                        value={this.state.serviceproviderid}
                        onChange={this.onChange}>
                        <option >Select</option>
                        {ServiceProvider}
                  </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Remarks: </label>
                      <input type="text"
                        className="form-control"
                        name="remarks"
                        value={this.state.remarks}
                        onChange={this.onChange} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>AMC Start Date: </label>
                      <input type="date" 
                      className="form-control"
                      name="amcstartdate" 
                      value={this.state.amcstartdate}
                      onChange={this.onChange} />
                                
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>AMC Expire Date: </label>
                      <input type="date" 
                      className="form-control"
                      name="amcexpiredate" 
                      value={this.state.amcexpiredate}
                      onChange={this.onChange} />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input type="button" value="Update" className="btn btn-primary" onClick= {this.onSubmit} />
                </div>
             <br />
            <div className="row" style={{borderBottom: "2px solid #d6d6d6"}}>
            &nbsp;&nbsp;&nbsp;<h3>Select Serial No :</h3>
            </div>
            <br />
             <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>AMC Ref No: </label>
                <select
                  className="form-control"
                  name="amcregistrationid"
                  value={this.state.amcregistrationid}
                  onChange={this.onSelectAmc}>
                  <option >Select</option>
                  {AmcRefNo}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <br />
                <label>Or </label>
              </div>
            </div>
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
                  />
                  </div>
                  </div>
            </div>
            <div className="row">
              {this.state.showamc?

              <table id="tab3" className="table table-bordered mb-4">
                              <thead style={{backgroundColor: "#d8d8d8"}}>
                                  <td>Ref No 1</td>
                                  <td>Delivery Date</td>
                                  <td>Customer type</td>
                                  <td>Customer</td>
                                  <td>Department</td>
                                  <td>Product Category</td>
                                  <td>Sub Category</td>
                                  <td>OEM</td>
                                  <td>Model No</td>
                                  <td>Serial No</td>
                                  <td>Action</td>
                              </thead>
                              <tbody>
                                {Amc}
                                {/* {temp.map((item, i) => {return <AMCDetailsTable obj={item} amcid = {Amcid} />; })} */}
                              </tbody>
                              </table>

                              : null}
                          	
            </div>
                    <div className="row">
                    {this.state.showme? 

                     <div>
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
										aria-labelledby="home-tab"
									>
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
              
              :null}

                  </div>
                  <br />
        </form>
        <div>
          <input type="button" value="Done" className="btn btn-primary" onClick={this.done} /> &nbsp;&nbsp; <input type="button" value="Clear Date" className="btn btn-primary" onClick={this.clearDate} />
        </div>
            </div>
            );
    }
}
 
export default EditAmcRenw;