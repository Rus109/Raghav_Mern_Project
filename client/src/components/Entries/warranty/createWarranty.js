import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import WarrantyProReg from './warrantyProreg';

class CreateWarranty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          warrantyrefno: "",
          warrantydate: "",
          productregistration: [],
          productregistrationid: "",
          serviceprovider: [],
          serviceproviderid: "",
          customer: [],
          customerid: "",
          customertype: [],
          customertypeid: "",
          department: [],
          departmentid: "",
          remarks: "",
          warrantystartdate: "",
          warranyexpiredate: ""
         }
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
      axios
      .get("http://localhost:4000/api/productregistration")
      .then(response => {
        this.setState({ productregistration: response.data });
        console.log(this.state.productregistration)
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

    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(e.target.value)
    }

    onSubmit(e){
      console.log('clicked')
      e.preventDefault();
             
      const {productregistrationid, serviceproviderid, customerid, customertypeid, departmentid, remarks, 
        warrantystartdate, warranyexpiredate} = this.state

      const obj = {
        productid: productregistrationid,
        serviceproviderid: serviceproviderid,
        customerid: customerid,
        customertypeid: customertypeid,
        customersubdepartmentid: departmentid,
        warrantystartdate: warrantystartdate,
        warrantyexpiredate: warranyexpiredate,
        remarks: remarks,
    };
  
      console.log(obj)
  
      axios
        .post("http://localhost:4000/api/warranty/add", obj)
        .then(res => console.log(res.data));
  
      this.setState({
        productregistrationid: "",
        serviceproviderid: "",
        customerid: "",
        customertypeid: "",
        departmentid: "",
        remarks: "",
        warrantystartdate: "",
        warranyexpiredate: ""
      });
      this.props.history.push("/api/warranty");
    }

    render() { 
      const ProductRefNo = this.state.productregistration.map((proRefNo, iPRN) => (  
        proRefNo.product.map((item, i) => (
          <option key={iPRN} value={proRefNo._id}>
          {proRefNo.refno1}
          </option>
        )) 
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
        return ( 
            <div style={{ marginTop: 10, marginLeft: "10%" }}>
      <Link to="/api/amcregistration" className="btn btn-info">
      Back to List
    </Link>
        <h3 className="text-center">Add Warranty Registration</h3>
        <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
          <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Warranty Reference No: </label>
                      <input type="text"
                      className="form-control"
                      name="warrantyrefno"
                      rows="5"
                      placeholder="Warranty Reference No"
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Warranty Date: </label>
                      <input
                      type="date"
                      className="form-control"
                      name="warrantydate"
                      onChange={this.onChange}
                    />
                    </div>
                  </div>
                </div>
        <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Serial No: </label>
                <select
                  className="form-control"
                  name="productregistrationid"
                  onChange={this.onChange}>
                  <option >Select</option>
                  {ProductRefNo}
            </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Warranty Provider: </label>
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
   <div>

<WarrantyProReg/>

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
                <label>Remarks: </label>
                <input type="text"
                  className="form-control"
                  name="remarks"
                  onChange={this.onChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Warranty Start Date: </label>
                <input type="date" 
                className="form-control"
                name="warrantystartdate" 
                value={this.state.amcstartdate}
                onChange={this.onChange} />
                          
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Warranty Expire Date: </label>
                <input type="date" 
                className="form-control"
                name="warranyexpiredate" 
                value={this.state.amcexpiredate}
                onChange={this.onChange} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
         );
    }
}
 
export default CreateWarranty;