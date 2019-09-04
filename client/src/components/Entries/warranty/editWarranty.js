import React, { Component } from 'react'
import axios from 'axios';

class EditWarranty extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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

        axios
        .get(
          "http://localhost:4000/api/warranty/edit/" + this.props.match.params.id
        )
       
        .then(response => { 
            
          var dateWarrantystartdate = new Date(response.data.warrantystartdate);
          var dateWarranyexpiredate = new Date(response.data.warrantyexpiredate);
        //   console.log(response.data.warrantystartdate)
          var dataDateWarrantystartdate = dateWarrantystartdate.toISOString().substr(0, 10);
          var dataDateWarranyexpiredate = dateWarranyexpiredate.toISOString().substr(0, 10);

        //   var timeDate = response.data.warrantystartdate;
        //   var year = timeDate.slice(0, 4);
        //   var month = timeDate.slice(5, 7);
        //   var day = timeDate.slice(8, 10);

        //   var formatedDate = day + '-' + month + '-' + year;
        //   console.log(formatedDate)
          
          this.setState({
              productregistrationid:  (Object.entries(response.data.product)[0].slice(1)).toString(),
              serviceproviderid: response.data.warrantyprovider,
              customerid: (Object.entries(response.data.customer)[0].slice(1)).toString(),
              customertypeid: (Object.entries(response.data.customertype)[0].slice(1)).toString(),
              departmentid: (Object.entries(response.data.department)[0].slice(1)).toString(),
              warrantystartdate: dataDateWarrantystartdate,
              warranyexpiredate: dataDateWarranyexpiredate,
              remarks: response.data.remarks    
          })
        console.log(this.state.warrantystartdate)
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
        
        e.preventDefault();

        const {productregistrationid, serviceproviderid, customerid, customertypeid, departmentid, remarks, warrantystartdate, 
            warranyexpiredate} = this.state

        const obj = {
            product: productregistrationid,
            warrantyprovider: serviceproviderid,
            customer: customerid,
            customertype: customertypeid,
            department: departmentid,
            warrantystartdate: warrantystartdate,
            warrantyexpiredate: warranyexpiredate,
            remarks: remarks,
        };
    
        console.log(obj)
    
        axios
          .post("http://localhost:4000/api/warranty/update/" + this.props.match.params.id, obj)
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
            <div>
            <h3 className="text-center">Edit Warranty Registration</h3>
        <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
        <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Serial No: </label>
                <select
                  className="form-control"
                  name="productregistrationid"
                  value={this.state.productregistrationid}
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
                  value={this.state.serviceproviderid}
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
          </div>
          <div className="row">
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
                name="warrantystartdate" 
                value={this.state.warrantystartdate}
                onChange={this.onChange} />
                          
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>AMC Expire Date: </label>
                <input type="date" 
                className="form-control"
                name="warranyexpiredate" 
                value={this.state.warranyexpiredate}
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
 
export default EditWarranty;