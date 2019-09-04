import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TableList from './tableList';
import '../../../App.css';
import isEmpty from './../../../validation/is-empty';

var OriginalItemOem = "";
var OriginalItemCategory = "";
var OriginalItemSubCategory = "";
var catagoryComboBox = "";
var subCatagoryComboBox = "";
var modelNoComboBox = "";
let Oem = "";

var productRegistrationArrId = [];

class CreateProdReg extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 

            productMapData: [],
            objArr: [],
            tableProReg: [],
            dbData: [],
            refno11:"",

            refno1: "",
            refno2: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",
            department: [],
            departmentid: "",
            prodregdate: "",

            product: [],
            productid: "",
            oem: "",
            productcategory: [],
            productcategoryid: "",
            productsubcategory: [],
            productsubcategoryid: "",
            modelno: "",
            oemwarrantydatefrom: "11=12-1111",
            oemwarrantydateto: "11=12-1111",
            warrantydatefrom: "11=12-1111",
            warrantydateto: "11=12-1111",
            serialno: "",
         }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onChangeOem = this.onChangeOem.bind(this);
         this.onChangeCategory = this.onChangeCategory.bind(this);
         this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
         this.onSubmitForm = this.onSubmitForm.bind(this);
         this.setFormFields = this.setFormFields.bind(this);
         this.onUpdateForm = this.onUpdateForm.bind(this);
         this.onEnterData = this.onEnterData.bind(this);
         this.clearDate = this.clearDate.bind(this);
    }
    
    componentDidMount() {

        let tempnumber = Math.random().toString();
        let number = tempnumber.split(".");
        let randomnumber = "PR-" + number[1];
        this.setState({refno1: randomnumber})


        let tempnumber2 = Math.random().toString();
        let number2 = tempnumber2.split(".");
        let randomnumber2 = "PR2-" + number2[1];
        this.setState({refno2: randomnumber2})

        axios
          .get("http://localhost:4000/api/product")
          .then(response => {
            this.setState({ product: response.data });
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
            this.setState({ department: response.data });
    
          })
          .catch(function(error) {
            console.log(error);
          });

    }

    onChangeOem(e){
      e.preventDefault();
      document.getElementById("divCategory").value = "Select";
      // R1.reload();
      var CategoryFromOem = "";

      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value)

      var item = e.target.value;
      Oem = this.state.product.map((spec, i) => (
               [
               Object.entries(spec.oem)[0].slice(1),
               Object.entries(spec.oem)[1].slice(1),
               Object.entries(spec.category)[1].slice(1),
               Object.entries(spec.category)[0].slice(1),
               Object.entries(spec.subcategory)[1].slice(1),
               Object.entries(spec.subcategory)[0].slice(1),
               spec.modelno
              ]              
      ));

      for(var i = 0; i<Oem.length; i++)
      {
        var check1 = Oem[i][0].toString();
        if(check1 === item){
          OriginalItemOem = Oem[i][1]
        }
      }

      for (var j = 0; j < Oem.length; j++)
      {
     
        var check2 = Oem[j][1].toString();
        if(check2 === OriginalItemOem[0]){
          CategoryFromOem = Oem[j];
        }
      }
      
      catagoryComboBox =
                        <option key={i} value={CategoryFromOem[3]}>
                        {CategoryFromOem[2]}
                        </option>;
    }

    onChangeCategory(e){

      e.preventDefault();
      document.getElementById("divSubCategory").value = "Select";

      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value)
      var item = e.target.value;
      var SubCategoryFromOem = "";

      for(var i = 0; i<Oem.length; i++)
      {
        let checkCategory = Oem[i][3].toString();

        if(checkCategory === item ){
          OriginalItemCategory = Oem[i][2]

        }
      }

      for(var j = 0; j<Oem.length; j++){
        var checkOem = Oem[j][1].toString();
        let checkCategory = Oem[j][2].toString();
        var temp1 = OriginalItemOem.toString();
        var temp2 = OriginalItemCategory.toString();

        if(checkOem === temp1 && checkCategory === temp2 ){
          SubCategoryFromOem = Oem[j]
        }
      }
          
      subCatagoryComboBox = <option key={i} value={SubCategoryFromOem[5].toString()}>
                        {SubCategoryFromOem[4].toString()}
                        </option>;
    }

    onChangeSubCategory(e){

      e.preventDefault();
      document.getElementById("divModelNo").value = "Select";

      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value)
      var item = e.target.value;
      var ModelNoFromOem = "";

      for(var i = 0; i<Oem.length; i++)
      {
        let checkCategory = Oem[i][5].toString();

        if(checkCategory === item ){
          OriginalItemSubCategory = Oem[i][4]
        }
      }

      for(var j = 0; j<Oem.length; j++){
        var checkOem = Oem[j][1].toString();
        let checkCategory = Oem[j][2].toString();
        var checksubCategory = Oem[j][4].toString();
        var temp1 = OriginalItemOem.toString();
        var temp2 = OriginalItemCategory.toString();
        var temp3 = OriginalItemSubCategory.toString();
        
        if(checkOem === temp1 && checkCategory === temp2 && checksubCategory === temp3){
          ModelNoFromOem = Oem[j]
        }
      }

      modelNoComboBox = <option key={i} value={ModelNoFromOem[6]}>
                        {ModelNoFromOem[6]}
                        </option>;

    }

  
    onSubmitForm(e){
      e.preventDefault();

      const obj1 = {
      refno1: this.state.refno1,
      refno2: this.state.refno2,
      date: this.state.prodregdate,
      customerid: this.state.customerid,
      customertypeid: this.state.customertypeid,
      customersubdepartmentid: this.state.departmentid
      }

      axios
      .post("http://localhost:4000/api/proreg", obj1)
      .then(res => {
          axios
          .get("http://localhost:4000/api/proreg")
          .then(response => {
            this.setState({dbData : response.data});
            alert("Data Saved Successfully!")
          })
          .catch(function(error) {
            console.log(error);
          });
      });

     console.log(this.state.dbData)


      
    }

    setFormFields(){
      var idArr = [];
      var tempRefNo = [];
      this.state.dbData.map((itemid) => {

              idArr.push(itemid._id);
              tempRefNo.push(itemid.refno1);
              return true;
      })
      for(var i = 0; i< idArr.length; i++){
        if(this.state.refno1 === tempRefNo[i]){
              productRegistrationArrId = idArr[i];
            }
      }
    }
    updatedFormFields(){
      axios
      .get("http://localhost:4000/api/proreg")
      .then(response => {
        this.setState({dbData : response.data});
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    onUpdateForm(){

      const obj = {
        refno1: this.state.refno1,
        refno2: this.state.refno2,
        date: this.state.prodregdate,
        customer: this.state.customerid,
        customertype: this.state.customertypeid,
        customersubdepartment: this.state.departmentid
        }

    axios
      .post("http://localhost:4000/api/proreg/" + productRegistrationArrId, obj)
      .then(res => console.log(res.data));

      this.updatedFormFields();
    }

    onEnterData(e){
      e.preventDefault();

         const obj2 = { 
        companyid: this.state.oem, 
        productcategoryid: this.state.productcategoryid, 
        productsubcategoryid: this.state.productsubcategoryid,
        modelno: this.state.modelno,
        oemwarrantyfrom: this.state.oemwarrantydatefrom,
        oemwarrantyto: this.state.oemwarrantydateto,
        warrantyfrom: this.state.warrantydatefrom,
        warrantyto: this.state.warrantydateto,
        serialno: this.state.serialno
      }
      
      axios
      .post("http://localhost:4000/api/proreg/product/" + productRegistrationArrId, obj2)
      .then(res => console.log(res.data));
     
      console.log(productRegistrationArrId)
      axios
      .get("http://localhost:4000/api/proreg/" + productRegistrationArrId)
      .then(response => {
        this.setState({ 
          productMapData: response.data.products
        })
        })
      .catch(function(error) {
        console.log(error);
      });

      this.updatedData();
    }

componentDidUpdate(){
  if(!isEmpty(productRegistrationArrId)){
    axios
          .get("http://localhost:4000/api/proreg/" + productRegistrationArrId)
          .then(response => {
            this.setState({ 
              productMapData: response.data.products
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    
}

     updatedData(){

        axios
      .get("http://localhost:4000/api/proreg/" + productRegistrationArrId)
      .then(response => {
        this.setState({ 
          productMapData: response.data.products
        });
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
 
      this.setState({
            productMapData: [],
            objArr: [],
            tableProReg: [],
            dbData: [],
            refno11:"",

            refno1: "",
            refno2: "",
            customer: [],
            customerid: "",
            customertype: [],
            customertypeid: "",
            department: [],
            departmentid: "",
            prodregdate: "",

            product: [],
            productid: "",
            oem: "",
            productcategory: [],
            productcategoryid: "",
            productsubcategory: [],
            productsubcategoryid: "",
            modelno: "",
            oemwarrantydatefrom: "",
            oemwarrantydateto: "",
            warrantydatefrom: "",
            warrantydateto: "",
            serialno: "",
      })

            OriginalItemOem = "";
            OriginalItemCategory = "";
            OriginalItemSubCategory = "";
            catagoryComboBox = "";
            subCatagoryComboBox = "";
            modelNoComboBox = "";
            Oem = "";
            productRegistrationArrId = [];

      this.props.history.push("/api/productregistration");
    }

    clearDate(){

        let tempnumber = Math.random().toString();
        let number = tempnumber.split(".");
        let randomnumber = "PR-" + number[1];
        this.setState({refno1: randomnumber})


        let tempnumber2 = Math.random().toString();
        let number2 = tempnumber2.split(".");
        let randomnumber2 = "PR2-" + number2[1];
        this.setState({refno2: randomnumber2})

       this.setState({
            productMapData: [],
            objArr: [],
            tableProReg: [],
            dbData: [],
            refno11:"",

            customerid: "",
            customertypeid: "",
            departmentid: "",
            prodregdate: "",

            productid: "",
            oem: "",
            productcategory: [],
            productcategoryid: "",
            productsubcategory: [],
            productsubcategoryid: "",
            modelno: "",
            oemwarrantydatefrom: "",
            oemwarrantydateto: "",
            warrantydatefrom: "",
            warrantydateto: "",
            serialno: "",
      })

            OriginalItemOem = "";
            OriginalItemCategory = "";
            OriginalItemSubCategory = "";
            catagoryComboBox = "";
            subCatagoryComboBox = "";
            modelNoComboBox = "";
            Oem = "";
            productRegistrationArrId = [];

    }

    render() {
        const Oem = this.state.product.map((spec, i) => (
            <option key={i} value={Object.entries(spec.oem)[0].slice(1)}>
              {Object.entries(spec.oem)[1].slice(1)}
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

          const Department = this.state.department.map((cusT, i) => (
            <option key={i} value={cusT._id}>
              {cusT.department}
            </option>
          )); 

          const tabList =  this.state.productMapData.map(function(object, i){
            return <TableList obj={object} ids = {productRegistrationArrId} key={i} ></TableList>
          })
        return (
          <div> 
            <div style={{ marginTop: 10, marginLeft: "10%" }}>
            <Link to="/api/productregistration" className="btn btn-info">
                Back to List
            </Link>
                
                    <h3 className="text-center">Product Registration</h3>
                    <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
                    <div className="row">
                        <div className="col-6">
                        <div className="form-group">
                            <label>Reference No 1: </label>
                            <input
                            type="text"
                            name="refno1"
                            className="form-control"
                            placeholder="Reference No 1"
                            value={this.state.refno1}
                            onChange={this.onChange}
                        />
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="form-group">
                            <label>Reference No 2: </label>
                            <input
                            type="text"
                            name="refno2"
                            className="form-control"
                            placeholder="Reference No 2"
                            value={this.state.refno2}
                            onChange={this.onChange}
                        />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Product Registration Date: </label>
                          <input type="date" 
                          className="form-control"
                          name="prodregdate" 
                          value={this.state.prodregdate}
                          onChange={this.onChange}>
                          </input>
                        </div>
                        </div>
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
                    <div className="form-group">
                        <input type="button" value="Submit" className="btn btn-primary" onClick = {this.onSubmitForm} onMouseOut = {this.setFormFields} onKeyPress = {this.onSubmitForm} onBlur = {this.setFormFields} disabled = {!(this.state.prodregdate && this.state.customerid && this.state.customertypeid && this.state.departmentid)}/>&nbsp;
                        <input type="button" value="Update Above Data" className="btn btn-primary" onClick = {this.onUpdateForm} disabled = {!(this.state.prodregdate && this.state.customerid && this.state.customertypeid && this.state.departmentid)} />
                    </div>
                    </form>
            </div>
            <div style={{width: "100%"}}>
            <table id="tab" className="table table-bordered mb-4 css-serial" style={{ marginTop: 20 }}>
            <thead className="text-center" style={{ backgroundColor: '#d8d8d8' }}>
            <tr>
              <th>Sl No:</th>
                <th><div id = "divOem" className="form-group"  style={{width: "100px"}}>
                          <label>OEM:</label>
                          <select
                          className="form-control"
                          name="oem"
                          onChange={this.onChangeOem}
                          placeholder= "oem"
                          >
                          <option value = "Select">Select</option>
                          {Oem}
                      </select>
                      </div></th>
                <th><div  className="form-group" style={{width: "100px"}}>
                          <label>Category:</label>
                          <select id = "divCategory"
                          className="form-control"
                          name="productcategoryid"
                          onChange={this.onChangeCategory}>
                          <option value = "Select">Select</option>
                          {catagoryComboBox}
                      </select>
                      </div></th>
                <th><div  className="form-group" style={{width: "150px"}}>
                          <label>Sub-Category:</label>
                          <select id = "divSubCategory"
                          className="form-control"
                          name="productsubcategoryid"
                          onChange={this.onChangeSubCategory}>
                          <option value = "Select">Select</option>
                      {subCatagoryComboBox}
                      </select>
                      </div></th>
                <th><div  className="form-group" style={{width: "100px"}}>
                          <label>Model No:</label>
                          <select id = "divModelNo"
                          className="form-control"
                          name="modelno"
                          onChange={this.onChange}>
                          <option value = "Select">Select</option>
                      {modelNoComboBox}
                      </select>
                      </div></th>
                <th><div className="form-group" style={{width: "150px"}}>
                          <label>OEM Warranty From: </label>
                          <input type="date" 
                          className="form-control"
                          name="oemwarrantydatefrom" 
                          value={this.state.oemwarrantydatefrom}
                          onChange={this.onChange}>
                          </input>
                    </div></th>
                <th><div className="form-group" style={{width: "150px"}}>
                          <label>OEM Warranty to: </label>
                          <input type="date" 
                          className="form-control"
                          name="oemwarrantydateto" 
                          value={this.state.oemwarrantydateto}
                          onChange={this.onChange}>
                          </input>
                    </div></th>
                <th><div className="form-group">
                          <label>Warranty From: </label>
                          <input type="date" 
                        className="form-control"
                        name="warrantydatefrom" 
                        value={this.state.warrantydatefrom}
                        onChange={this.onChange}>
                        </input>
                      </div></th>
                <th><div className="form-group">
                          <label>Warranty to: </label>
                          <input type="date" 
                        className="form-control"
                        name="warrantydateto" 
                        value={this.state.warrantydateto}
                        onChange={this.onChange}>
                        </input>
                      </div></th>
                <th><div className="form-group" style={{width: "100px"}}>
                          <label>Serial No: </label>
                          <input
                          type="text"
                          name="serialno"
                          className="form-control"
                          placeholder="Serial No"
                          value={this.state.serialno}
                          onChange={this.onChange}
                      />
                      </div></th>
              <th colSpan="2"> <div className="form-group">
                              <label>Action: </label>
                              <input type="Button" value="Enter Data" onClick={this.onEnterData} className="btn btn-primary" disabled = {!(this.state.oem && this.state.productcategoryid && this.state.productsubcategoryid && this.state.modelno && this.state.serialno)}/>
                          </div></th>
              </tr>
            </thead>
            <tbody id="tableProreg" className="text-center">
            {tabList}
            </tbody>
            </table>
            </div>
            <input type="button" onClick = {this.onSubmit} value="Done" className="btn btn-info" /> &nbsp; &nbsp;  <input type="button" onClick = {this.clearDate} value="Clear Data" className="btn btn-info" />
            </div>
         );
    }
}
 
export default CreateProdReg;