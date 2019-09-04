import React, { Component, Fragment } from 'react';
import axios from 'axios';
import isEmpty from './../../../../validation/is-empty';
import { Link } from 'react-router-dom';


let ArrProdReg = [];

export default class CreateBringIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactionid: '',
			bringindate: '',
			complaintcaseid: '',
			complaintnoid: '',
			broughtby: [],
			broughtbyid: '',
			bringinremarks: '',

			/* ------------------------ Bring In ID ------------------------------ */
			bringinId: '',

			/* ------------------------ Get Requests ------------------------------- */
			complaint: [],
			assign: [],
			complaintno: [],

			complaintnumberid: '',

			/* ------------------------ Load All Tabs Data ------------------------------- */
			feedback: '',
			productdetails: '',
			assignment: '',
			callerdetails: '',

			/* ------------------------ Load All Tabs Data ------------------------------- */
			isChecked: false,

			/* ------------------------ Add Products Data ------------------------------- */
			serialno: '',
			partno: false,
			productremarks: '',
			/* ------------------------ Add New Serial No/ Part Serial No ------------------------------- */
			prodregadd: '',
			/* ------------------------ Complaint Details State ------------------------------- */

			complaintcaseid: '',
			complaintdate: '',
			complainttime: '',
			servicetype: '',
			calltype: '',
			customerid: '',
			customertype: '',
			departmentid: '',
			address: '',
			name: '',
			designation: '',
			contactno: '',
			PToV: '',
			pd: '',
			complaintsRemarks: ''
			
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getbringinid = this.getbringinid.bind(this);
		this.toggleChange = this.toggleChange.bind(this);
		this.saveserialno = this.saveserialno.bind(this);
		this.getTableRow = this.getTableRow.bind(this);
		this.updateComplaint = this.updateComplaint.bind(this);
	}
	componentDidMount() {
		let ArrFeedback = [];
		let ArrProductDetails = [];
		let ArrAssignment = [];
		let ArrCallerdetails = [];

		let tempnumber = Math.random().toString();
		let number = tempnumber.split('.');
		let randomnumber = 'BI-' + number[1];
		this.setState({ transactionid: randomnumber });

		axios.get('http://localhost:4000/api/employees/').then((response) => {
			console.log('brought by', response.data);
			this.setState({ broughtby: response.data });
		});

		axios
			.get('http://localhost:4000/api/complaint/edit/' + this.props.match.params.complaintid)
			.then((response) => {
				console.log('Complaint', response.data);
				this.setState(
					{
						complaint: response.data,
						complaintcaseid: response.data.caseid,
						complaintnoid: response.data._id.toString(),

/* ------------------------ Complaint Details Set-State ------------------------------- */
						complaintcaseid: response.data.caseid,
						complaintdate: response.data.complaintdate,
						complainttime: response.data.complainttime,
						servicetype: response.data.servicetype,
						calltype: Object.entries(response.data.calltype)[0].slice(1)[0],
						customerid: Object.entries(response.data.client)[0].slice(1)[0],
						customertype: Object.entries(response.data.clienttype)[0].slice(1)[0],
						departmentid: Object.entries(response.data.departmentname)[0].slice(1)[0],
						address: response.data.address,
						name: response.data.name,
						designation: response.data.designation,
						contactno: response.data.contactno,
						PToV: response.data.persontovisit,
						pd: response.data.problemdetails,
						complaintsRemarks: response.data.remarks
					},
					() => {
						axios.get('http://localhost:4000/api/complaintstatus/assign/').then((response2) => {
							console.log('Assign', response2.data);
							this.setState({ assign: response2.data }, () => {
								axios
									.get('http://localhost:4000/api/complaintstatus/complaintno/')
									.then((response3) => {
										this.setState({ complaintno: response3.data }, () => {
											console.log('Complaint No', response3.data);
											response3.data.map((i1) => {
												let tempArr = [ i1.feedback ];
												tempArr.map((i2) => {
													if (this.props.match.params.complaintid === i2._id) {
														let complaintnumberid = i1._id;
														this.setState({ complaintnumberid: i1._id }, () => {
															axios
																.get(
																	'http://localhost:4000/api/complaintstatus/complaintno/edit/' +
																		complaintnumberid
																)
																.then((response4) => {
																	console.log('complaint Edit', response4.data);
																	let tempComplaintEdit = [ response4.data ];
																	let tempDatacomplaintno_productdetails;
																	tempComplaintEdit.map((CE1) => {
																		tempDatacomplaintno_productdetails = CE1.complaintno_productdetails;
																		let tempFeedback = [ CE1.feedback ];
																		tempFeedback.map((CE2) => {
																			/* ---------------------------------------- FeedBack Complaints (UnAssigned)--------------------------------- */

																			let tempdataassign_productdetails;
																			let tempAssign = [ CE1.assignmentdetails ];
																			tempAssign.map((CE3) => {
																				tempdataassign_productdetails = CE3
																				/* ---------------------------------------- Assigned Complaints--------------------------------- */
																				const obj1 = {
																					Ufeedbackdate: CE2.complaintdate,
																					Ufeedback: CE2.remarks,
																					Ufeedbackstatus: 'Unassigned',
																					Afeedbackdate: CE3.assigndatetime,
																					Afeedback: CE3.assignremarks,
																					Afeedbackstatus: 'Assigned',
																					BRfeedbackdate: CE1.dateandtime,
																					BRfeedback: CE1.complaintnoremarks,
																					BRfeedbackstatus: 'Bring In Request'
																				};
																				ArrFeedback.push(obj1);

																				const Obj3 = {
																					assignrefno: CE3.assignrefno,
																					assigndate: CE3.assigndatetime,
																					assignto: CE3.assignengineer.name,
																					remarks: CE3.assignremarks
																				}

																				ArrAssignment.push(Obj3);

																				const Obj4 = {
																					callername: CE2.name,
																					callerdesignation: CE2.designation,
																					callercontactno: CE2.contactno,
																					ptv: CE2.persontovisit,
																					address: CE2.address
																				}

																				ArrCallerdetails.push(Obj4);
																			});

																			CE2.complaints_pro_details.map((CE4) => {
																				let tempcomplaints_prod = [
																					CE4.complaints_prod
																				];
																				tempcomplaints_prod.map((CE5) => {
																					CE5.products.map((CE6) => {
																						if (CE4.complaints_serialno === CE6.serialno) {
																							tempdataassign_productdetails.assign_productdetails.map(CE7 => {
																								let tempassign_pro = [CE7.assign_pro];
																								tempassign_pro.map(CE8 => {
																									CE8.products.map(CE9 => {

																										if(CE7.assignserialno === CE9.serialno){
																											tempDatacomplaintno_productdetails.map(CE10 => {
																												let tempcomplaintno_pro = [CE10.complaintno_pro];
																												console.log(tempcomplaintno_pro)
																												tempcomplaintno_pro.map(CE11 => {
																													console.log(CE11)
																													CE11.products.map(CE12 => {
																														console.log(CE10.complaintno_serialno)
																														console.log(CE12.serialno)
																														if(CE10.complaintno_serialno === CE12.serialno){
																															let Obj2 = {
																																Useialno: CE6.serialno,
																																Umodelno: CE6.modelno,
																																Uproductcategory: CE6.category.category,
																																Usubcategory: CE6.subcategory.subcategory,
																																UOEM: CE6.oem.companyname,
																																UDescription: "",
																																Aseialno: CE9.serialno,
																																Amodelno: CE9.modelno,
																																Aproductcategory: CE9.category.category,
																																Asubcategory: CE9.subcategory.subcategory,
																																AOEM: CE9.oem.companyname,
																																ADescription: "",
																																Cseialno: CE12.serialno,
																																Cmodelno: CE12.modelno,
																																Cproductcategory: CE12.category.category,
																																Csubcategory: CE12.subcategory.subcategory,
																																COEM: CE12.oem.companyname,
																																CDescription: "",
																															}

																															ArrProductDetails.push(Obj2)
																														}
																													})
																												})
																											})

																										}
																									})
																								})
																							})
																						}

																					});
																				});
																			});
																		});
																		this.setState({
																			complaintnoid: CE1._id
																		})
																	});

																	this.setState({ 
																		feedback: ArrFeedback,
																		productdetails: ArrProductDetails,
																		assignment: ArrAssignment,
																		callerdetails: ArrCallerdetails
																	});
																});
														});
													}
												});
											});
										});
									});
							});
						});
					}
				);
			});
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}

	toggleChange(){
		 this.setState({
      isChecked: !this.state.isChecked
	})
	
	let checker = document.getElementById("ispart");
	let txtpartno = document.getElementById("partno");
	checker.checked === true?
		txtpartno.disabled = false
		:txtpartno.disabled = true;

	}


	onSubmit() {
		// console.log(this.state.complaintnoid.toString());
		const submitObj = {
			transactionno: this.state.transactionid,
			date: this.state.bringindate,
			employeesid: this.state.broughtbyid,
			complaintnoid: this.state.complaintnoid,
			bringinremark: this.state.bringinremarks
		};

		console.log(submitObj);

		axios
			.post('http://localhost:4000/api/complaintstatus/bringin/add', submitObj)
			.then((response) => console.log(response.data));
	}

	getbringinid() {
		axios.get('http://localhost:4000/api/complaintstatus/bringin/').then((response) => {
			response.data.map((item, i) => {
				if (item.transactionno === this.state.transactionid) {
					this.setState({ bringinId: item._id });
				}
			});
		});
		console.log(this.state.bringinId);
	}

	saveserialno(){

		let ProdRegId;
		let checker = document.getElementById("ispart");
		const obj = {
			serialno: this.state.serialno
		}
		axios.post('http://localhost:4000/api/complaintstatus/bringin/serialno', obj)
				.then(response => {
					if(isEmpty(response.data)){
						alert("Serialno does not exist!")
					}
					else{
						console.log(response.data)
						let tempProdReg = response.data;
						tempProdReg.map(item => {
							ProdRegId = item._id;
							item.products.map(item1 => {
							
							if(checker.checked === false){
								console.log("checker False")
								const obj2 = {
									type: "",
									partno: this.state.partno,
									proserialno: item1.serialno,
									modelno: item1.modelno,
									category:item1.category.category,
									OEM:item1.oem.companyname,
									Remarks: this.state.productremarks
								}

								ArrProdReg.push(obj2);
							}
							else{
								console.log("checker true")
								const obj3 = {
									type: "Part",
									partno: this.state.partno,
									proserialno: item1.serialno,
									modelno: item1.modelno,
									category:item1.category.category,
									OEM:item1.oem.companyname,
									Remarks: this.state.productremarks
								}

								ArrProdReg.push(obj3);
							}
							})
						})
					console.log(ArrProdReg)
					this.setState({prodregadd: ArrProdReg});

					const obj4 = {
						proregid: ProdRegId,
        				partno: this.state.partno,
        				bringin_serialno: this.state.serialno,
      					bringin_remarks: this.state.productremarks
					}
					console.log(this.state.bringinId)
					axios.post('http://localhost:4000/api/complaintstatus/bringin/product/' + this.state.bringinId, obj4)
							.then(response => console.log(response.data))
					}
				})
	}


	getTableRow(e){

		let mainId  = this.state.bringinId;
        let myArray1 = this.state.prodregadd;
		var rows = document.getElementById("tab1").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
        rows[i].ondblclick = function() {
			alert(this.rowIndex);
			console.log(this.innerHTML)
            let innerhtml1 = this.innerHTML;
            let tempArr = innerhtml1.split("</td><td>")
			let retrievedserialno = tempArr[2]
			console.log(tempArr)

            myArray1.splice(this.rowIndex - 1, 1);

              axios
                .get("http://localhost:4000/api/complaintstatus/bringin/edit/" + mainId)
                .then(response =>{
					console.log(response.data)
                  let tempArr = [response.data]
                  tempArr.map((item, i) => {
                  item.bringin_productdetails.map(i2 => {
					if(i2.bringin_serialno === retrievedserialno){
						console.log(i2._id)    
						axios
							.delete("http://localhost:4000/api/complaintstatus/bringin/product/" + mainId + "/" + i2._id)
							.then(res => res.data)
					}

                })
              })
           })  
        }
      }
    }

		updateComplaint(){

		console.log( this.props.match.params.id);

		    const obj = {
		      caseid: this.state.complaintcaseid,
		      complaintdate: this.state.complaintdate,
		      complainttime: this.state.complainttime,
		      servicetype: this.state.servicetype,
		      calltypeid: this.state.calltype,
		      customerid: this.state.customerid,
		      customertypeid: this.state.customertype,
		      customersubdepartmentid: this.state.departmentid,
		      name: this.state.name,
		      designation: this.state.designation,
		      contactno: this.state.contactno,
		      address: this.state.address,
		      persontovisit: this.state.PToV,
		      problemdetails: this.state.pd,
		      isresolvedonphone: false,
		      status: "BringIn",
			  remarks: this.state.complaintsRemarks
			  

		  }

		  console.log(obj)
		      axios
		      .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.complaintid, obj)
			  .then(res => console.log(res.data));
			  
			  this.props.history.push("/api/complaintstatus");
			  window.location.reload();

	}

	render() {
		let complaintDetails;
		let feedbacksObj1;
		let productDetails1;
		let assignment1;
		let callerdetails;
		let proregdetails

		console.log(this.state.feedback);

		const BroughtBy = this.state.broughtby.map((item) => {
			return <option value={item._id}>{item.name}</option>;
		});

		if (!isEmpty(this.state.complaint)) {
			let tempComplaintArr = [ this.state.complaint ];
			complaintDetails = tempComplaintArr.map((comp) => {
				var datecomplaintdate = new Date(comp.complaintdate);
				var datadatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);
				return (
					<tr>
						<td>{comp.caseid}</td>
						<td>{datadatecomplaintdate}</td>
						<td>{comp.client.customername}</td>
						<td>{comp.departmentname.department}</td>
						<td>{comp.calltype.calltype}</td>
						<td>{comp.problemdetails}</td>
					</tr>
				);
			});
		}

		if (!isEmpty(this.state.feedback)) {
			feedbacksObj1 = this.state.feedback.map((item) => {
				var dateUfeedbackdate = new Date(item.Ufeedbackdate);
				var dateAfeedbackdate = new Date(item.Afeedbackdate);
				var dateBRfeedbackdate = new Date(item.BRfeedbackdate);
				var dataDateUfeedbackdate = dateUfeedbackdate.toISOString().substr(0, 10);
				 var dataDateAfeedbackdate = dateAfeedbackdate.toISOString().substr(0, 10);
				  var dataDateBRfeedbackdate = dateBRfeedbackdate.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{dataDateUfeedbackdate}</td>
							<td>{item.Ufeedback}</td>
							<td>{item.Ufeedbackstatus}</td>
						</tr>
						<tr>
							<td>{dataDateAfeedbackdate}</td>
							<td>{item.Afeedback}</td>
							<td>{item.Afeedbackstatus}</td>
						</tr>
						<tr>
							<td>{dataDateBRfeedbackdate}</td>
							<td>{item.BRfeedback}</td>
							<td>{item.BRfeedbackstatus}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.productdetails)) {
			productDetails1 = this.state.productdetails.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.Useialno}</td>
							<td>{item.Umodelno}</td>
							<td>{item.Uproductcategory}</td>
							<td>{item.Usubcategory}</td>
							<td>{item.UOEM}</td>
							<td>{item.UDescription}</td>
						</tr>
						<tr>
							<td>{item.Aseialno}</td>
							<td>{item.Amodelno}</td>
							<td>{item.Aproductcategory}</td>
							<td>{item.Asubcategory}</td>
							<td>{item.AOEM}</td>
							<td>{item.ADescription}</td>
						</tr>
						<tr>
							<td>{item.Cseialno}</td>
							<td>{item.Cmodelno}</td>
							<td>{item.Cproductcategory}</td>
							<td>{item.Csubcategory}</td>
							<td>{item.COEM}</td>
							<td>{item.CDescription}</td>
						</tr>
					</Fragment>
				);
			});

			
		}
		
			
		if (!isEmpty(this.state.assignment)) {
			assignment1 = this.state.assignment.map((item) => {
				var dateAssigndate = new Date(item.assigndate);
				var dataDateAssigndate = dateAssigndate.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{item.assignrefno}</td>
							<td>{dataDateAssigndate}</td>
							<td>{item.assignto}</td>
							<td>{item.remarks}</td>
						</tr>
					</Fragment>
				);
			});
		}

		
		if (!isEmpty(this.state.callerdetails)) {
			callerdetails = this.state.callerdetails.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.callername}</td>
							<td>{item.callerdesignation}</td>
							<td>{item.callercontactno}</td>
							<td>{item.ptv}</td>
							<td>{item.address}</td>
						</tr>
					</Fragment>
				);
			});
		}

		
		if (!isEmpty(this.state.prodregadd)) {
			proregdetails = this.state.prodregadd.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.type}</td>
							<td>{item.partno}</td>
							<td>{item.proserialno}</td>
							<td>{item.modelno}</td>
							<td>{item.category}</td>
							<td>{item.OEM}</td>
							<td>{item.Remarks}</td>
						</tr>
					</Fragment>
				);
			});
		}
		return (
			<div>
			<Link to="/api/complaintstatus" className="btn btn-info">
            Back to List
            </Link>
				<h2 className="text-center">Bring In :</h2>

				<form style={{ marginTop: '5%' }} onMouseMove={this.getbringinid}>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Tansaction No :</label>&nbsp;&nbsp;
								<input
									type="text"
									className="form-control"
									placeholder=""
									name="transactionid"
									value={this.state.transactionid}
									onChange={this.onChange}
								/>
							</div>
						</div>

						<div className="col-6">
							<div className="form-group">
								<label>Date : </label>&nbsp;&nbsp;
								<input
									type="date"
									className="form-control"
									placeholder="Enter Date"
									// value={this.state.assignmentDate}
									name="bringindate"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Case Id :</label>&nbsp;&nbsp;
								<input
									type="text"
									className="form-control"
									name="complaintcaseid"
									placeholder="Complaint No Id"
									value={this.state.complaintcaseid}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="col-6">
							<label>Brought By :</label>&nbsp;&nbsp;
							<select className="form-control" name="broughtbyid" onChange={this.onChange}>
								<option value="Select">Select</option>
								{BroughtBy}
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<label>Remarks :</label>&nbsp;&nbsp;
								<textarea
									type="text"
									className="form-control"
									name="bringinremarks"
									placeholder="Remarks"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						&nbsp;&nbsp;<input
							type="button"
							value="Save Above Data"
							className="btn btn-primary"
							disabled={!(this.state.bringindate && this.state.broughtbyid && this.state.bringinremarks)}
							onClick={this.onSubmit}
						/>
					</div>
				</form>
				<br />
				<h4 className="text-center" style={{ fontWeight: 'normal' }}>
					Other Details :
				</h4>
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
								Add Products
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
								Complaint Details
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
								Feedbacks
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
								Related Products
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
								Assignment Details
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="profile-tab"
								data-toggle="tab"
								href="#callerdetails"
								role="tab"
								aria-controls="profile"
								aria-selected="false"
							>
								Caller Details
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
							<br />
							<div className="row">
								<div className="col-1.5">
									<div className="form-group">
										&nbsp;&nbsp;
										<input
											type="checkbox"
											id = "ispart"
											checked={this.state.isChecked}
											onChange={this.toggleChange}
										/>
										&nbsp;
										<label>Is Part</label>
									</div>
								</div>
								<div className="col-2">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Product serialno"
											name="serialno"
											onChange={this.onChange}
										/>
									</div>
								</div>

								<div className="col-2">
									<div className="form-group">
										<input
											type="text"
											id = "partno"
											className="form-control"
											disabled = "true"
											placeholder="Part Serial No"
											name="partno"
											onChange={this.onChange}
										/>
									</div>
								</div>
								<div className="col-2">
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder=""
											name="productremarks"
											onChange={this.onChange}
										/>
									</div>
								</div>

								<div className="col-2">
									<div className="form-group">
										<input
											type="button"
											value="Add"
											className="btn btn-primary"
											onClick={this.saveserialno}
										/>
									</div>
								</div>
							</div>

							<table id="tab1" className="table table-bordered mb-4" onMouseOver = {this.getTableRow}>
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Type</td>
										<td>Part No</td>
										<td>Pro Serial No</td>
										<td>Model No</td>
										<td>Product Category</td>
										<td>OEM</td>
										<td>Remarks</td>
									</tr>
								</thead>
								<tbody>
								{proregdetails}
								</tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="deliverydetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Case Id</td>
										<td>Complaint Date</td>
										<td>Customer Name</td>
										<td>Department Name</td>
										<td>Call type</td>
										<td>Problem Details</td>
									</tr>
								</thead>
								{complaintDetails}
							</table>
						</div>
						<div class="tab-pane fade" id="installdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Feedback Date</td>
										<td>Feedback</td>
										<td>Feedback Status</td>
									</tr>
								</thead>
								{feedbacksObj1}
								{/* {feedbacksObj2}
								{feedbacksObj3} */}
							</table>
						</div>
						<div class="tab-pane fade" id="amcdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Serial No</td>
										<td>Model No</td>
										<td>Product category</td>
										<td>Sub Category</td>
										<td>OEM</td>
										<td>Description</td>
									</tr>
								</thead>
								{productDetails1}
							</table>
						</div>
						<div class="tab-pane fade" id="warrantydetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Assigned Ref No</td>
										<td>Assigned Date</td>
										<td>Assigned To</td>
										<td>Remarks</td>
									</tr>
								</thead>
								{assignment1}
							</table>
						</div>
						<div class="tab-pane fade" id="callerdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Caller Name</td>
										<td>Caller Designation</td>
										<td>Caller Contact No</td>
										<td>Person To Visit</td>
										<td>Address</td>
									</tr>
								</thead>
								{callerdetails}
							</table>
						</div>
					</div>
				</div>

				<div className="row">
					&nbsp;&nbsp;<input
						type="button"
						value="Save Updated Data"
						className="btn btn-primary"
						onClick={this.updateComplaint}
					/>
					<br />
				</div>
			</div>
		);
	}
}
