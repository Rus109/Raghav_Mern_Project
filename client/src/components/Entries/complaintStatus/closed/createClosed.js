import React, { Component, Fragment } from 'react';
import axios from 'axios';
import isEmpty from '../../../../validation/is-empty';

export default class CreateClosed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactionid: '',
            closedDate: '',
            callstatus: '',
			remarks: '',
			complaintdoc: '',
			deliverid: '',
    
    /* ---------------------------------- Tab Loading ----------------------------------- */
			complaintnumberid: '',
			complaint: [],
			
	/* ----------------------------------------------- Tab Details --------------------------------------------- */
			addproducts: [],
			feedback: [],
			FeedbackBringIn: [],
			FeedbackSFS: [],
			FeedbackRFS: [],
			FeedbackDeliver: [],
			productdetails: [],
			assignment: [],
			callerdetails: [],
			UnAssignedserialno: [],
			Assignedserialno: [],
			BringInserialno: [],
			UnassignedWarranty: [],
			AssignedWarranty: [],
			BringInWarranty: [],
			UnassignedAMC: [],
			AssignedAMC: [],
			BringInAMC: [],
			serviceprovider1: [],
			serviceprovider2: [],
			serviceprovider3: [],

/* ----------------------------------------------- Update Complaints ----------------------------------------------*/

			complaincaseid: '',
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
        this.onFileSelect = this.onFileSelect.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.updateComplaint = this.updateComplaint.bind(this);
	}

	componentDidMount() {

		let ArrFeedback = [];
		let ArrFeedbackBringIn = [];
		let ArrFeedbackSendForServic = [];
		let ArrFeedbackRecieve = [];
		let ArrFeedbackDeliver = [];
		let ArrProductDetails = [];
		let ArrAssignment = [];
		let ArrCallerdetails = [];

		/*--------------------------------------------- Array of Serial No of unassigned/ assigned/ bringin ==================================================== */

		let ArrUnAssignedserialno = [];
		let ArrAssignedserialno = [];
		let ArrBringInserialno = [];
        
        /* -------------------------------------------- Map serial no Warranty and AMC Details ------------------------------------------------------------ */

		let mapUnassignedWarranty1 = [];
		let mapAssignedWarranty1 = [];
		let mapBringInWarranty1 = [];
		let mapUnassignedAMC1 = [];
		let mapAssignedAMC1 = [];
		let mapBringInAMC1 = [];

		/*------------------------------------------------------- Delivery Address -------------------------------------------------------------------------- */

		let serviceprovider1 = [];
		let serviceprovider2 = [];
		let serviceprovider3 = [];


		let tempnumber = Math.random().toString();
		let number = tempnumber.split('.');
		let randomnumber = 'CNC-' + number[1];
        this.setState({ transactionid: randomnumber });
		
		 axios
			.get('http://localhost:4000/api/complaint/edit/' + this.props.match.params.complaintid)
			.then((response) => {
				console.log('Complaint', response.data);
				this.setState({
						complaintcaseid: response.data.caseid,
						complaint: response.data,

						    /*------------------------------------------------------- Update Complaint --------------------------------------------------------------------------- */				

						complaincaseid: response.data.caseid,
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

				}, () => {
					axios
						.get('http://localhost:4000/api/complaintstatus/sendforservice/')
						.then((response1) => {
							let bringinObj;
							let sendforservicObj;
							// console.log(response1.data.sendtodate)
							response1.data.map(item => {	
								this.setState({
								sendtotransactionno: item.sentotranactionno,
								sendtodate: item.sendtodate,
								sendtochallanno: item.sentochallanno,
								sendtoservicetype: item.sentocalltype
							})
							let tempsenttocaseid = [item.senttocaseid];
							tempsenttocaseid.map(item2 => {
								let tempcomplaintno = [item2.complaintno]
								tempcomplaintno.map(item3 => {
									let tempfeedback = [item3.feedback];
									tempfeedback.map(item4 => {
										if(this.props.match.params.complaintid === item4._id){
											this.setState({
												sentforservicid: item._id
											})

											let tempsenttocaseid = [item.senttocaseid];
											tempsenttocaseid.map(item5 => {

												bringinObj = {
													BIfeedbackdate: item5.date,
													BIfeedback: item5.bringinremark,
													BIfeedbackstatus: 'Bring In',
												}
											})

											sendforservicObj = {
												SFSfeedbackdate: item.sendtodate,
												SFSfeedback: item.sentoremarks,
												SFSfeedbackstatus: 'Send For Servicing',
											}

											ArrFeedbackBringIn.push(bringinObj)
											ArrFeedbackSendForServic.push(sendforservicObj)
										}
									})
								})
							})

							})
							this.setState({
								FeedbackBringIn: ArrFeedbackBringIn,
								FeedbackSFS: ArrFeedbackSendForServic
							})
							
						})

						axios
						.get('http://localhost:4000/api/complaintstatus/deliver/')
						.then((deliver) => {

							let recieveObj;
							let deliveredObj;
							console.log(deliver.data)
							deliver.data.map(d1 => {
								let tempdelivercaseid = [d1.delivercaseid];
								tempdelivercaseid.map(d2 => {
									let tempreceivedcaseid = [d2.receivedcaseid];
									tempreceivedcaseid.map(d3 => {
										let tempsenttocaseid = [d3.senttocaseid];
										tempsenttocaseid.map(d4 => {
											let tempcomplaintno = [d4.complaintno];
											tempcomplaintno.map(d5 => {
												let tempfeedback = [d5.feedback];
												tempfeedback.map(d6 => {
													if(this.props.match.params.complaintid === d6._id){
													recieveObj = {
													Rfeedbackdate: d2.receiveddate,
													Rfeedback: d2.recievedremarks,
													Rfeedbackstatus: 'Recieved from Service',
													}
													ArrFeedbackRecieve.push(recieveObj);

													deliveredObj = {
													Dfeedbackdate: d1.deliverdate,
													Dfeedback: d1.deliverremarks,
													Dfeedbackstatus: 'Delivered to Customer',
													}

													ArrFeedbackDeliver.push(deliveredObj)
													}
												})
											})
										})
									})
								})
							this.setState({
								FeedbackRFS: ArrFeedbackRecieve,
								FeedbackDeliver: ArrFeedbackDeliver,
								deliverid: d1._id
							})
							})

						})

				})
			})
			
						axios
							.get('http://localhost:4000/api/complaintstatus/complaintno/')
							.then((response2) => {
								this.setState({ complaintno: response2.data }, () => {
								console.log('Complaint No', response2.data);
								response2.data.map((i1) => {
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
															tempDatacomplaintno_productdetails =
																CE1.complaintno_productdetails;
															let tempFeedback = [ CE1.feedback ];
															tempFeedback.map((CE2) => {
																/* ---------------------------------------- FeedBack Complaints (UnAssigned)--------------------------------- */

																let tempdataassign_productdetails;
																let tempAssign = [ CE1.assignmentdetails ];
																tempAssign.map((CE3) => {
																	tempdataassign_productdetails = CE3;
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
																	};

																	ArrAssignment.push(Obj3);

																	const Obj4 = {
																		callername: CE2.name,
																		callerdesignation: CE2.designation,
																		callercontactno: CE2.contactno,
																		ptv: CE2.persontovisit,
																		address: CE2.address
																	};

																	ArrCallerdetails.push(Obj4);
																});

																CE2.complaints_pro_details.map((CE4) => {
																	let tempcomplaints_prod = [ CE4.complaints_prod ];
																	tempcomplaints_prod.map((CE5) => {
																		CE5.products.map((CE6) => {
																			if (
																				CE4.complaints_serialno === CE6.serialno
																			) {
																				tempdataassign_productdetails.assign_productdetails.map(
																					(CE7) => {
																						let tempassign_pro = [
																							CE7.assign_pro
																						];
																						tempassign_pro.map((CE8) => {
																							CE8.products.map((CE9) => {
																								if (
																									CE7.assignserialno ===
																									CE9.serialno
																								) {
																									tempDatacomplaintno_productdetails.map(
																										(CE10) => {
																											let tempcomplaintno_pro = [
																												CE10.complaintno_pro
																											];

																											tempcomplaintno_pro.map(
																												(
																													CE11
																												) => {
																													CE11.products.map(
																														(
																															CE12
																														) => {
																															if (
																																CE10.complaintno_serialno ===
																																CE12.serialno
																															) {
																																let Obj2 = {
																																	Useialno: CE6.serialno,
																																	Umodelno:CE6.modelno,
																																	Uproductcategory:CE6.category.category,
																																	Usubcategory:CE6.subcategory.subcategory,
																																	UOEM:CE6.oem.companyname,
																																	UDescription:'',
																																	Aseialno:CE9.serialno,
																																	Amodelno:CE9.modelno,
																																	Aproductcategory:CE9.category.category,
																																	Asubcategory:CE9.subcategory.subcategory,
																																	AOEM:CE9.oem.companyname,
																																	ADescription:'',
																																	Cseialno:CE12.serialno,
																																	Cmodelno:CE12.modelno,
																																	Cproductcategory:CE12.category.category,
																																	Csubcategory:CE12.subcategory.subcategory,
																																	COEM:CE12.oem.companyname,
																																	CDescription:''
																																};

																																ArrProductDetails.push(Obj2);
																																ArrUnAssignedserialno.push(CE6.serialno);
																																ArrAssignedserialno.push(CE9.serialno);
																																ArrBringInserialno.push(CE12.serialno);

																																console.log(CE6.serialno);
																															}
																														}
																													);
																												}
																											);
																										}
																									);
																								}
																							});
																						});
																					}
																				);
																			}
																		});
																	});
																});
															});
														});

														this.setState(
															{
																feedback: ArrFeedback,
																productdetails: ArrProductDetails,
																assignment: ArrAssignment,
																callerdetails: ArrCallerdetails,
																UnAssignedserialno: ArrUnAssignedserialno,
																Assignedserialno: ArrAssignedserialno,
																BringInWarranty: ArrBringInserialno
															},
															() => {

																let serialObj1;
																let serialObj2;
																let serialObj3;
                                                                
																for(let i = 0; i < ArrUnAssignedserialno.length; i++){
																    serialObj1 = {
																        serialno: ArrUnAssignedserialno[i]
																    }
																    console.log(serialObj1)
																    axios
																    .post('http://localhost:4000/api/complaintstatus/sendforservice/serialno', serialObj1)
																    .then(response => {
																		if(!isEmpty(response.data)){
																        response.data.map(warrnty => {
                                                                            warrnty.products.map(warranty1 => {
                                                                                const warrantyObj = {
																					serviceprovider: warranty1.oem.companyname,
                                                                                    oemwarrantyfrom: warranty1.oemwarrantyfrom,
                                                                                    oemwarrantyto: warranty1.oemwarrantyto,
                                                                                    warrantyfrom: warranty1.warrantyfrom,
																					warrantyto: warranty1.warrantyto,
																					serialno: warranty1.serialno
                                                                                }

                                                                                mapUnassignedWarranty1.push(warrantyObj)
                                                                            })
                                                                        })
                                                                        this.setState({UnassignedWarranty: mapUnassignedWarranty1}, () => {
																			let serviceid;
																			 	axios
																			 		.post('http://localhost:4000/api/complaintstatus/sendforservice/amc/serialno', serialObj1)
																    				.then(response => {
																						console.log(response.data)
																						if(!isEmpty(response.data)){
																							response.data.map(warrnty => {
																								warrnty.products.map(warranty1 => {
																									const warrantyObj = {
																										serviceprovider: warrnty.serviceprovider.providername,
																										warrantyfrom: warrnty.amcstartdate,
																										warrantyto: warrnty.amcexpiredate,
																										serialno: warranty1.serialno
																									}

																									mapUnassignedAMC1.push(warrantyObj)
																									serviceid = warrnty.serviceprovider._id;
																								})
																							})

																							this.setState({
																								UnassignedAMC: mapUnassignedAMC1
																								// serviceprovider: serviceprovider
																							}, () => {
																								axios
																										.get('http://localhost:4000/api/serviceprovider/edit/' + serviceid)
																										.then(response => {
																											let tempSerialnoArr = [response.data];
																											console.log(response.data)
																											tempSerialnoArr.map(service1 => {
																												const serviceObj = {
																												providername: service1.providername,
																												contactperson: service1.contactperson,
																												contactno: service1.contactno,
																												alternatecontactno: service1.alternatecontactno,
																												email: service1.email,
																												fax: service1.fax,
																												address: service1.address
																											}

																											serviceprovider1.push(serviceObj)
																											})
																											this.setState({serviceprovider1: serviceprovider1})
																											
																										})
																							})
																						}
																					})
																		})
																	}
																    })
																}
																
																for(let j = 0; j < ArrAssignedserialno.length; j++){
																    serialObj2 = {
																        serialno: ArrAssignedserialno[j]
																	}
																	axios
																    .post('http://localhost:4000/api/complaintstatus/sendforservice/serialno', serialObj2)
																    .then(warrnty => {
																		if(!isEmpty(warrnty.data)){
																			 warrnty.data.map(warrnty1 => {
																		        warrnty1.products.map(warranty2 => {
                                                                                const warrantyObj2 = {
																					serviceprovider: warranty2.oem.companyname,
                                                                                    oemwarrantyfrom: warranty2.oemwarrantyfrom,
                                                                                    oemwarrantyto: warranty2.oemwarrantyto,
                                                                                    warrantyfrom: warranty2.warrantyfrom,
																					warrantyto: warranty2.warrantyto,
																					serialno: warranty2.serialno
                                                                                }

                                                                                mapAssignedWarranty1.push(warrantyObj2)
																			})
																		})
																			this.setState({AssignedWarranty: mapAssignedWarranty1}, () => {
																				let serviceid;
																				axios
																			 		.post('http://localhost:4000/api/complaintstatus/sendforservice/amc/serialno', serialObj2)
																    				.then(response => {
																						console.log(response.data)
																						if(!isEmpty(response.data)){
																							response.data.map(warrnty => {
																								warrnty.products.map(warranty1 => {
																									const warrantyObj = {
																										serviceprovider: warrnty.serviceprovider.providername,
																										warrantyfrom: warrnty.amcstartdate,
																										warrantyto: warrnty.amcexpiredate,
																										serialno: warranty1.serialno
																									}

																									mapAssignedAMC1.push(warrantyObj)
																									serviceid = warrnty.serviceprovider._id;
																								})
																							})

																							this.setState({
																								AssignedAMC: mapAssignedAMC1
																								// serviceprovider: serviceprovider
																							}, () => {
																									axios
																										.get('http://localhost:4000/api/serviceprovider/edit/' + serviceid)
																										.then(response => {
																											let tempSerialnoArr = [response.data];
																											tempSerialnoArr.map(service1 => {
																												const serviceObj = {
																												providername: service1.providername,
																												contactperson: service1.contactperson,
																												contactno: service1.contactno,
																												alternatecontactno: service1.alternatecontactno,
																												email: service1.email,
																												fax: service1.fax,
																												address: service1.address
																											}

																											serviceprovider2.push(serviceObj)
																											})
																											this.setState({serviceprovider2: serviceprovider2})
																										})
																							})
																						}
																					})
																			})
																			}
																		})
																	
																}

																for(let k = 0; k < ArrAssignedserialno.length; k++){

																    serialObj3 = {
																        serialno: ArrAssignedserialno[k]
																	}

																	axios
																    .post('http://localhost:4000/api/complaintstatus/sendforservice/serialno', serialObj3)
																    .then(warrnty => {
																		if(!isEmpty(warrnty.data)){
																			 warrnty.data.map(warrnty1 => {
																		        warrnty1.products.map(warranty3 => {
                                                                                const warrantyObj3 = {
																					serviceprovider: warranty3.oem.companyname,
                                                                                    oemwarrantyfrom: warranty3.oemwarrantyfrom,
                                                                                    oemwarrantyto: warranty3.oemwarrantyto,
                                                                                    warrantyfrom: warranty3.warrantyfrom,
																					warrantyto: warranty3.warrantyto,
																					serialno: warranty3.serialno
                                                                                }

                                                                                mapBringInWarranty1.push(warrantyObj3)
																			})
																		})
																			this.setState({BringInWarranty: mapBringInWarranty1}, () => {
																				let serviceid;
																				axios
																			 		.post('http://localhost:4000/api/complaintstatus/sendforservice/amc/serialno', serialObj3)
																    				.then(response => {
																						console.log(response.data)
																						if(!isEmpty(response.data)){
																							response.data.map(warrnty => {
																								warrnty.products.map(warranty1 => {
																									const warrantyObj = {
																										serviceprovider: warrnty.serviceprovider.providername,
																										warrantyfrom: warrnty.amcstartdate,
																										warrantyto: warrnty.amcexpiredate,
																										serialno: warranty1.serialno
																									}

																									mapBringInAMC1.push(warrantyObj)
																									serviceid = warrnty.serviceprovider._id;
																								})
																							})

																							this.setState({
																								BringInAMC: mapBringInAMC1
																							}, () => {
																																														axios
																										.get('http://localhost:4000/api/serviceprovider/edit/' + serviceid)
																										.then(response => {
																											let tempSerialnoArr = [response.data];
																											tempSerialnoArr.map(service1 => {
																												const serviceObj = {
																												providername: service1.providername,
																												contactperson: service1.contactperson,
																												contactno: service1.contactno,
																												alternatecontactno: service1.alternatecontactno,
																												email: service1.email,
																												fax: service1.fax,
																												address: service1.address
																											}

																											serviceprovider3.push(serviceObj)
																											})
																											this.setState({serviceprovider3: serviceprovider3})
																										})
																							})
																						}
																					})
																			})
																		}
										
																	})
																	
																}
															});
													});
													
											});
										}
									});
								});
							});

						let ArrAddproducts = [];
						axios.get('http://localhost:4000/api/complaintstatus/bringin/').then((bringin) => {
							console.log(bringin.data);
							this.setState({ bringin: bringin.data }, () => {
								bringin.data.map((b1) => {
									console.log(b1);
									let tempcomplaintno = [ b1.complaintno ];
									tempcomplaintno.map((b2) => {
										if (this.props.match.params.complaintid === b2._id) {
											b1.bringin_productdetails.map((b3) => {
												let tempbringin_pro = [ b3.bringin_pro ];
												tempbringin_pro.map((b4) => {
													b4.products.map((b5) => {
														if (b3.bringin_serialno === b5.serialno) {
															const obj = {
																partno: b3.partno,
																serialno: b5.serialno,
																modelno: b5.modelno,
																category: b5.category.category,
																oem: b5.oem.companyname,
																remarks: b3.bringin_remarks
															};

															ArrAddproducts.push(obj);
															console.log(obj)
															this.setState({ addproducts: ArrAddproducts });
														}
													});
												});
											});
										}
									});
								});
							});
						});
					})
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}

	onFileSelect(e) {
		this.setState({ complaintdoc: e.target.files[0] });
	}

	onSubmit(e) {
		e.preventDefault();

		const { transactionid, closedDate, remarks, callstatus, complaintdoc, deliverid } = this.state;

		console.log(deliverid)
		let formData = new FormData();
		// formData.append('complaintid', complaintid);
		// formData.append('assigncomplaintid', assignid);
		formData.append('transno', transactionid);
		formData.append('dateandtime', closedDate);
		formData.append('complaintnoremarks', remarks);
		formData.append('callstatus', callstatus);
		formData.append('deliverid', deliverid);
		formData.append('complaintdoc', complaintdoc);


		console.log(formData);

        axios
            .post('http://localhost:4000/api/complaintstatus/complete/add', formData)
            .then(response => console.log(response.data));
	}

	updateComplaint(){

	let callstatus;
	let isResolved;

	if(this.state.callstatus === "Closed"){
		callstatus = "Closed"
		isResolved = true
	}
	else{
		callstatus = "Delivered"
		isResolved = false
	}

	const obj = {
	      caseid: this.state.complaincaseid,
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
	      isresolvedonphone: isResolved,
	      status: callstatus,
          remarks: this.state.complaintsRemarks
        }

        console.log(obj)

		      axios
		      .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.complaintid, obj)
			  .then(res => console.log(res.data));
			  
			  this.props.history.push("/api/complaintstatus");
	}
	
	render() {

		let complaintDetails;
		let feedbacksObj1;
		let feedbacksObj2;
		let feedbacksObj3;
		let feedbacksObj4;
		let feedbacksObj5;
		let assignment1;
		let callerdetails;

		console.log(this.state.complaint)
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

				if (!isEmpty(this.state.FeedbackBringIn)) {
			feedbacksObj2 = this.state.FeedbackBringIn.map((item) => {

				var dateBIfeedbackdate = new Date(item.BIfeedbackdate);
				var dataDateBIfeedbackdate = dateBIfeedbackdate.toISOString().substr(0, 10);

				return (
					<Fragment>
						<tr>
							<td>{dataDateBIfeedbackdate}</td>
							<td>{item.BIfeedback}</td>
							<td>{item.BIfeedbackstatus}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.FeedbackSFS)) {
			feedbacksObj3 = this.state.FeedbackSFS.map((item) => {

				var dateSFSfeedbackdate = new Date(item.SFSfeedbackdate);
				var dataDateSFSfeedbackdate = dateSFSfeedbackdate.toISOString().substr(0, 10);

				return (
					<Fragment>
						<tr>
							<td>{dataDateSFSfeedbackdate}</td>
							<td>{item.SFSfeedback}</td>
							<td>{item.SFSfeedbackstatus}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.FeedbackRFS)) {
			let dataDateRFSfeedbackdate;
			feedbacksObj4 = this.state.FeedbackRFS.map((item) => {
			if(!isEmpty(item.Rfeedbackdate)){
				var dateRFSfeedbackdate = new Date(item.Rfeedbackdate);
				dataDateRFSfeedbackdate = dateRFSfeedbackdate.toISOString().substr(0, 10);
			}
				return (
					<Fragment>
						<tr>
							<td>{dataDateRFSfeedbackdate}</td>
							<td>{item.Rfeedback}</td>
							<td>{item.Rfeedbackstatus}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.FeedbackDeliver)) {
			let dataDateDfeedbackdate;
			feedbacksObj5 = this.state.FeedbackDeliver.map((item) => {
			if(!isEmpty(item.Dfeedbackdate)){
				var dateDfeedbackdate = new Date(item.Dfeedbackdate);
				dataDateDfeedbackdate = dateDfeedbackdate.toISOString().substr(0, 10);
			}
				return (
					<Fragment>
						<tr>
							<td>{dataDateDfeedbackdate}</td>
							<td>{item.Dfeedback}</td>
							<td>{item.Dfeedbackstatus}</td>
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

		return (
			<div>
				<h3 className="text-center">
					Complaints No : &nbsp;&nbsp;
					{this.state.complaintcaseid}
				</h3>

				<form style={{ marginTop: '5%' }} onMouseMove={this.getComplaintnoid}>
					<h4 className="text-center" style={{ fontWeight: 'normal' }}>
						Details :
					</h4>
					<hr />
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
									name="closedDate"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<label>Call Status :</label>&nbsp;&nbsp;
							<select className="form-control" name="callstatus" onChange={this.onChange}>
								<option value="Delivered">Delivered</option>
								<option value="Closed">Closed</option>
							</select>
						</div>
						<div className="col-6">
							<div className="form-group">
								<label>Upload Doc :</label>&nbsp;&nbsp;
								<input
									type="file"
									className="form-control"
									name="complaintdoc"
									placeholder="Select a Document.."
									onChange={this.onFileSelect}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-group">
								<div className="form-group">
									<label>Remarks :</label>&nbsp;&nbsp;
									<textarea
										name="remarks"
										className="form-control"
										placeholder="Add Remarks"
										onChange={this.onChange}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						&nbsp;&nbsp;<input
							type="button"
							value="Save Data"
							className="btn btn-primary"
							disabled={!(this.state.closedDate && this.state.remarks)}
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
								href="#Feedbacks"
								role="tab"
								aria-controls="home"
								aria-selected="true"
							>
								Feedbacks
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="profile-tab"
								data-toggle="tab"
								href="#productdetails"
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
								href="#installdetails"
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
								href="#amcdetails"
								role="tab"
								aria-controls="profile"
								aria-selected="false"
							>
								Complaints Details
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
								Caller Deatils
							</a>
						</li>
					</ul>
					<div class="tab-content" id="myTabContent">
						<div
							class="tab-pane fade show active"
							id="Feedbacks"
							role="tabpanel"
							aria-labelledby="home-tab"
						>
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Feedback Date Time</td>
										<td>feedback</td>
										<td>Feedback Status</td>
									</tr>
								</thead>
                                <tbody>
									{feedbacksObj1}
									{feedbacksObj2}
									{feedbacksObj3}
									{feedbacksObj4}
									{feedbacksObj5}
                                </tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="productdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Item Name</td>
										<td>Brand</td>
										<td>Serial No</td>
                                        <td>Remarks</td>
                                        <td>Is Defected</td>
									</tr>
								</thead>
                                <tbody>

                                </tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="installdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Assigned Ref No</td>
										<td>Assigned Date</td>
										<td>Assigned To</td>
										<td>Remarks</td>
									</tr>
								</thead>
                                <tbody>
                               {assignment1}
                                </tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="amcdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Complaint No</td>
										<td>Complaint Date</td>
										<td>Customer Name</td>
										<td>department Name</td>
										<td>Call Type</td>
										<td>Problem Details</td>
										<td>is Resolved</td>
									</tr>
								</thead>
                                <tbody>
                              {complaintDetails}
                                </tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="warrantydetails" role="tabpanel" aria-labelledby="profile-tab">
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
                                <tbody>
									{callerdetails}
                                </tbody>
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
						disabled={!(this.state.closedDate && this.state.remarks)}
					/>
					<br />
            </div>
			</div>
		);
	}
}
