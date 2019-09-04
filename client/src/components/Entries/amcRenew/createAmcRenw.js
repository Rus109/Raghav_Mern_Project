import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import isEmpty from '../../../validation/is-empty';
import AMCRenProReg from './amcRenProReg';
import AMCRenProReg2 from './amcRenProreg2';
import AMCDetailsTable from './amcDetailsTable';

  let amcrenewid;
  let TabListOne;
  let tabOne;
  let tabTwo;
  let triggerer = false;

class CreateAmcRenw extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amcrenewno: "",
            amcrenewno: "",
            amcrenewid: "",
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
            proregdetailsmap: [],
            serialno: "",

            amcregedit: [],
            tabone: [],
            tabtwo: [],

            showme: false,
            showamc: false
         }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.getAmcRenewId = this.getAmcRenewId.bind(this);
        this.onSelectAmc = this.onSelectAmc.bind(this);
        this.loadDateSerialno = this.loadDateSerialno.bind(this);
        this.getTableRow = this.getTableRow.bind(this);
        this.blank = this.blank.bind(this);
        this.clearDate = this.clearDate.bind(this);
        this.done = this.done.bind(this);
    }
    componentDidMount(){

      let tempnumber = Math.random().toString();
      let number = tempnumber.split(".");
      let randomnumber = "AMCR-" + number[1];
      this.setState({amcrenewno: randomnumber}) 

        axios
        .get("http://localhost:4000/api/amcregistration")
        .then(response => {
          this.setState({ amcregistration: response.data });
          console.log("amcRegistration", response.data)
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
        .get("http://localhost:4000/api/serviceprovider")
        .then(response => {
          this.setState({ serviceprovider: response.data });
          console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        });

    }

    componentDidUpdate(){

    }
    onChange(e) {
      console.log(e.target.value)
        this.setState({
          [e.target.name]: e.target.value
        });
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

    loadDateSerialno(e){
    
    const obj = {serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/amcrenewal/serialno", obj)
        .then(res => {
          console.log(res.data)
          if(isEmpty(res.data)){
            alert("The Serial no does not exist!")
          }
          else{
            axios
          .get("http://localhost:4000/api/amcrenewal")
          .then(response => {
            console.log(response.data);
            // let tempArr = response.data;

            // tempArr.map(i2 => {
            //   i2.multpleamcandref.map(i3 => {
            //     if(i3.arnserialno === this.state.serialno){
            //       alert("The Serial No's AMC already renewed!");
            //       triggerer = true;
            //     }
                if(triggerer === false){
                  console.log(res.data)
                    let temptab = res.data
                    temptab.map(item => {
                      tabTwo = {
                        amcRefId: item._id,
                        amcrefno: item.amcrefno,
                        date: item.amcregdate,
                        customertype: item.customertype,
                        customer: item.customer,
                        department: item.department
                      }
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
              //   })
              // })
              if(triggerer === false){
              this.setState({
                  // proregdetailsmap: [...this.state.proregdetailsmap, response.data],
                  tabtwo: [...this.state.tabtwo, tabTwo],
                  tabone: [...this.state.tabone, tabOne]
                  })

               let newobj1 = {
                  amcregid: tabTwo.amcRefId,
                  arnserialno: this.state.serialno,
                  dataamc: "single"
                  }

                  console.log(newobj1)
                  axios
                  .post("http://localhost:4000/api/amcrenewal/product/" + this.state.amcrenewid, newobj1)
                  .then(response => response.data) 
                }
            })     
          }
           console.log(res.data)
        })
        .catch(function(error) {
          console.log(error);
      });

      this.setState({
        showme: true
      })

      triggerer = false;
    }


      getTableRow(e){
        e.preventDefault();

        var myArray1 = this.state.tabone;
        var myArray2 = this.state.tabtwo;
        var rows = document.getElementById('tab1').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
            alert(this.rowIndex);
            myArray1.splice(this.rowIndex, 1);
            myArray2.splice(this.rowIndex, 1);

            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
            let retrievedserialno = tempArr[3];
              axios
                .get("http://localhost:4000/api/amcrenewal/edit/" + amcrenewid)
                .then(response =>{
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                    console.log(item)
                  item.multpleamcandref.map(i2 => {
                    if(retrievedserialno === i2.arnserialno){                  
                      axios
                      .delete("http://localhost:4000/api/amcrenewal/product/" + amcrenewid + "/" + i2._id)
                      .then(res => res.data)
                      alert("Details has be deleted");
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
      console.log(this.statetabone)
      }

      blank(){
        // axios
        // .get("http://localhost:4000/api/serviceprovider")
        // .then(response => {
        //   this.setState({ serviceprovider: response.data });
        //   console.log(response.data)
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
      }

      onSubmit(e){
        console.log('clicked')
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
    
        console.log(obj)
    
        axios
          .post("http://localhost:4000/api/amcrenewal/add", obj)
          .then(res => console.log(res.data));
    
      }

      onUpdate(e){

        e.preventDefault();
          
        const {amcrenewno, amcregdate, customerid, customertypeid, 
            departmentid, serviceproviderid, remarks, amcstartdate, amcexpiredate} = this.state;
  
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
    
        console.log(obj)
    
        axios
          .post("http://localhost:4000/api/amcrenewal/update/" + this.state.amcrenewid, obj)
          .then(res => console.log(res.data));
    
      }

    getAmcRenewId(){
            axios
              .get("http://localhost:4000/api/amcrenewal")
              .then(response => {
                response.data.map((item, i) => {
                  if(item.amcrenewno === this.state.amcrenewno){
                    
                    console.log(item._id)
                    this.setState({amcrenewid: item._id})
                    amcrenewid = item._id;
                  }
              })
        })
    }

    clearDate(){

      amcrenewid = "";
      TabListOne = "";
      tabOne = "";
      tabTwo = "";

      this.setState({
        amcrenewno: "",
            amcrenewno: "",
            amcrenewid: "",
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
            proregdetailsmap: [],
            serialno: "",

            amcregedit: [],
            tabone: [],
            tabtwo: []
      })

    }

    done(){

      amcrenewid = "";
      TabListOne = "";
      tabOne = "";
      tabTwo = "";

      this.setState({
        amcrenewno: "",
            amcrenewno: "",
            amcrenewid: "",
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
            proregdetailsmap: [],
            serialno: "",

            amcregedit: [],
            tabone: [],
            tabtwo: []
      })

      this.props.history.push("/api/amcrenewal");
    }
    render() { 

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

          let temp = [this.state.amcregedit];
          console.log(this.state.amcregistrationid)

          TabListOne = this.state.tabone.map((item, i) => {
              return <AMCRenProReg obj={item} />;
          })

          const TabListTwo = this.state.tabtwo.map((item, i) => {
			        return <AMCRenProReg2 obj={item} />;
          });

          let Amc = temp.map((item, i) => {
            return <AMCDetailsTable obj={item} amcid = {this.state.amcregistrationid} amcrenewid ={amcrenewid} />;
           })

           console.log(Amc)

    return ( 
    <div style={{ marginTop: 10, marginLeft: "10%" }} onMouseMove={this.blank}>
    <Link to="/api/amcrenewal" className="btn btn-info">
      Back to List
    </Link>
        <h3 className="text-center">Add AMC Renewal Registration</h3>
        <form style={{ marginTop: "5%" }} onMouseMove = {this.getAmcRenewId}>
        <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>AMC Renewal No: </label>
                <input type="text" 
                className="form-control"
                name="amcrenewno" 
                value = {this.state.amcrenewno}
                placeholder = "AMC Renewal No"
                onChange={this.onChange} />
                          
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>AMC Registration Date: </label>
                <input type="date" 
                className="form-control"
                name="amcregdate" 
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
                <label>Department: </label>
                <select
                  className="form-control"
                  name="departmentid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {Department}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Service Provider: </label>
                <select
                  className="form-control"
                  name="serviceproviderid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {ServiceProvider}
            </select>
              </div>
            </div>
           
          </div>
          <div className="row">
             <div className="col-6">
              <div className="form-group">
                <label>Remarks: </label>
                <input type="text"
                  className="form-control"
                  name="remarks"
                  placeholder = "Remarks"
                  onChange={this.onChange} />
              </div>
            </div>
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
            
          </div>
          <div className="row">
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
          <div className="row">
            &nbsp;&nbsp;&nbsp;<input type="button" value="Submit Above Details" className="btn btn-primary" onMouseDown={this.onSubmit} onMouseUp={this.getAmcRenewId} 
            disabled = {!(this.state.amcrenewno && this.state.amcregdate && this.state.customerid && this.state.customertypeid && this.state.departmentid &&
            this.state.serviceproviderid && this.state.remarks && this.state.amcstartdate && this.state.amcexpiredate)}/>

             &nbsp;&nbsp;&nbsp;<input type="button" value="Update Above Details" className="btn btn-primary" onMouseDown={this.onUpdate} onMouseUp={this.getAmcRenewId} 
            disabled = {!(this.state.amcrenewno && this.state.amcregdate && this.state.customerid && this.state.customertypeid && this.state.departmentid &&
            this.state.serviceproviderid && this.state.remarks && this.state.amcstartdate && this.state.amcexpiredate)}/>
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
 
export default CreateAmcRenw;
