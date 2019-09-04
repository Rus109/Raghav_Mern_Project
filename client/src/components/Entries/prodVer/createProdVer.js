import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';
import PVProductDetails from './pvProductdetails';
import PVDeliveryDetails from './pvDeliveryDetails';
import PVInstallDetails from './pvInstallDetails';
import PVAmcDetails from './pvAmcDetails';
import PVWarrantyDetails from './pvWarrantyDetails';
import PVServiceHistory from './pvServiceHistory';

class CreateProdVer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          serialno: "",
		  proregdetailsmap: [],
		  installdetailmap: [],
		  amcdetailsmap: [],
		  complaintdetailsmap: []
         }
         this.onChange = this.onChange.bind(this);
         this.loadDateSerialno = this.loadDateSerialno.bind(this);
    }
    componentDidMount(){

    }

    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value)
      }

    loadDateSerialno(e){
      let arrProReg = [];
      arrProReg = this.state.proreg;

      
	  const obj = {serialno: this.state.serialno}
	  const obj1 = {newserialno: this.state.serialno}
	  const obj2 = {complaints_serialno: this.state.serialno}
     axios
        .post("http://localhost:4000/api/productverification/serialnoproreg", obj)
        .then(response => {
          if(isEmpty(response.data)){
            alert("The Serial no does not exist!")
          }
          else{
			console.log("proreg", response.data)
            this.setState({proregdetailsmap: response.data}, ()=> {
				axios
				.post("http://localhost:4000/api/productverification/installation/newserialno", obj1)
				.then(resinst => {
					console.log("installation", resinst.data)
					this.setState({installdetailmap: resinst.data}, ()=>{

						axios
						.get("http://localhost:4000/api/productverification/amc/" + this.state.serialno)
						.then(resamc => {
							console.log("amc", resamc.data)
							this.setState({amcdetailsmap: resamc.data}, ()=>{

								axios
								.post("http://localhost:4000/api/productverification//complaint/newserialno", obj2)
								.then(rescomplaint => {
									console.log("complaint", rescomplaint.data)
									this.setState({complaintdetailsmap: rescomplaint.data})
								})
								.catch(function(error) {
								console.log(error);
								});
							})
						})
						.catch(function(error) {
						console.log(error);
						});
					})
				})
				.catch(function(error) {
          		console.log(error);
      			});
		})
        }  
        })
        .catch(function(error) {
          console.log(error);
      });
  
      this.setState({
        showme: true
      })

      }

    render() { 

		let Result = "";
		let proregdetails = "";
		let currDate = new Date().toISOString().slice(0, 10);

		if(!isEmpty(this.state.proregdetailsmap)){
			proregdetails = this.state.proregdetailsmap.map(item => {
				return <PVProductDetails obj={item} />
			})
		}

		let proregdeliverydetails = "";
		if(!isEmpty(this.state.proregdetailsmap)){
			proregdeliverydetails = this.state.proregdetailsmap.map(item => {
				return <PVDeliveryDetails obj={item} />
			})
		}

		let installdetails = "";
		if(!isEmpty(this.state.installdetailmap)){
			installdetails = this.state.installdetailmap.map(item => {
				return <PVInstallDetails obj={item} />
			})
		}

		let Amcdetails = "";
		if(!isEmpty(this.state.amcdetailsmap)){
			Amcdetails = this.state.amcdetailsmap.map(item => {
				return <PVAmcDetails obj={item} />
			})
		}

		let Warrantydetails = "";
		if(!isEmpty(this.state.proregdetailsmap)){
			Warrantydetails = this.state.proregdetailsmap.map(item => {
				return <PVWarrantyDetails obj={item} />
			})
		}

		let Servicedetails = "";
		if(!isEmpty(this.state.complaintdetailsmap)){
			Servicedetails = this.state.complaintdetailsmap.map(item => {
				return <PVServiceHistory obj={item} />
			})
		}

		let AmcStartDate = "";
		let AmcEndDate = "";
		if(!isEmpty(this.state.amcdetailsmap)){
			this.state.amcdetailsmap.map(item => {
				AmcStartDate = item.amcstartdate;
				AmcEndDate = item.amcexpiredate;
			})
		}

		
		let checkdetails = "";
			if(!isEmpty(this.state.proregdetailsmap)){
			checkdetails = this.state.proregdetailsmap.map(item => {
				return item.products[0]
			})

			const temp = checkdetails.map(item2 => {
				return item2
			})
			
			if(currDate <= temp[0].oemwarrantyto){
				Result = "The Products is Under warranty";
			}
			else if(temp[0].warrantyto >= currDate && temp[0].warrantyfrom <= currDate){
				Result = "The Product is Under Company Warranty";
			}
			else{
				if(AmcEndDate >= currDate && AmcStartDate <= currDate){
					Result = "The Product is under AMC"
				}
				else{
					Result = "The Product is out of warranty"
				}
			}
		}

        return ( 
        <div style={{ marginTop: 10, marginLeft: "10%" }}>
        <h3 className="text-center">Add Product Verification</h3>
        <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
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
                 <div>
								<ul class="nav nav-tabs" id="myTab" role="tablist">
									<li class="nav-item">
										<a
											class="nav-link active"
											id="home-tab"
											data-toggle="tab"
											href="#productdetails"
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
											href="#deliverydetails"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Delivery Details
										</a>
									</li>
                  <li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#installdetails"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											installation Details
										</a>
									</li>
                  <li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#amcdetails"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											AMC Details
										</a>
									</li>
                  <li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#warrantydetails"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Warranty Deatils
										</a>
									</li>
                  <li class="nav-item">
										<a
											class="nav-link"
											id="profile-tab"
											data-toggle="tab"
											href="#servicehistory"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Service History
										</a>
									</li>
								</ul>
								<div class="tab-content" id="myTabContent">
									<div
										class="tab-pane fade show active"
										id="productdetails"
										role="tabpanel"
										aria-labelledby="home-tab"
									>
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>Product Category</td>
		<td>sub Category</td>
		<td>OEM</td>
		<td>Model No</td>
	</tr>
	<tr>
		{proregdetails}
	</tr>
</table>
										</div>
									<div
										class="tab-pane fade"
										id="deliverydetails"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>Ref No 1</td>
		<td>Ref no 2</td>
		<td>Delivery Date</td>
		<td>Customer Type</td>
		<td>Customer</td>
		<td>Department</td>
	</tr>
	<tr>
		{proregdeliverydetails}
	</tr>
</table>
										
									</div>
                  <div
										class="tab-pane fade"
										id="installdetails"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
										
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>Installation Ref No</td>
		<td>Installation Date</td>
		<td>Serial No</td>
		<td>Installed by</td>
		<td>Customer Name</td>
		<td>Department</td>
		<td>Contact Person</td>
		<td>Contact No</td>
		<td>Address</td>
		<td>Remarks</td>
	</tr>
<tr>
	{installdetails}
</tr>
</table>
									</div>
                  <div
										class="tab-pane fade"
										id="amcdetails"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>AMC Ref No</td>
		<td>AMC Regt Date</td>
		<td>AMC Provider</td>
		<td>Period From</td>
		<td>Period to</td>
	</tr>
	<tr>
		{Amcdetails}
	</tr>
</table>
										
									</div>
                  <div
										class="tab-pane fade"
										id="warrantydetails"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>Warranty Type</td>
		<td>Warranty Regt Date</td>
		<td>Warranty Provider</td>
		<td>Period From</td>
		<td>Period to</td>
	</tr>
	{Warrantydetails}
</table>
										
									</div>
                  <div
										class="tab-pane fade"
										id="servicehistory"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
<table id="tab" className="table table-bordered mb-4">
	<tr>
		<td>Reporting Date</td>
		<td>Problem</td>
		<td>Status</td>
		<td>closed Date</td>
	</tr>
	<tr>
		{Servicedetails}
	</tr>
</table>
										
									</div>
								</div>
							</div>

              
            </div>
          <div className="form-group">
            
            <label id="result">{Result}</label>
          </div>
        </form>
      </div>
         );
    }
}
 
export default CreateProdVer;