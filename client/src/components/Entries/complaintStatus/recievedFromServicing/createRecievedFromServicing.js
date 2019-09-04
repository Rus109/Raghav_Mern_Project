import React, { Component, Fragment } from 'react';
import axios from 'axios';
import isEmpty from '../../../../validation/is-empty';
import { Link } from 'react-router-dom';
import Feedback from './../complaintNo/feedbacks';

export default class CreateRecievedFromServicing extends Component {
    constructor(props){
        super(props);
        this.state = {
            transactionid: '',
            sentdate: '',
            complaintcaseid: '',
			sentremarks: '',
			recieveid: '',
			sentforservicid: '',

	/* --------------------------------------------- Sent Details --------------------------------------------- */
			sendtotransactionno: '',
			sendtodate: '',
			sendtochallanno: '',
			sendtoservicetype: '',

	/* ------------------------------------------- Edit Complaint Data ----------------------------------------- */
			complaint: [],
			complaintno: [],
	/* -------------------------------------------- Edit BringIn Data ------------------------------------------ */
			bringin: [],

	/* ----------------------------------------------- Tab Details --------------------------------------------- */
			addproducts: [],
			feedback: [],
			FeedbackBringIn: [],
			FeedbackSFS: [],
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
		}
		
        this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getrecievedfromservicingid = this.getrecievedfromservicingid.bind(this);
		this.updateComplaint = this.updateComplaint.bind(this);
    }

    componentDidMount(){

		let ArrFeedback = [];
		let ArrFeedbackBringIn = [];
		let ArrFeedbackSendForServic = [];
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
		let randomnumber = 'RFS-' + number[1];
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
										let tempfeedback = [b2.feedback];
										tempfeedback.map(b21 => {
										if (this.props.match.params.complaintid === b21._id) {
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
									})
								  });
								});
							});
						});
					})
				})
            })
    }

    onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
    }
    
    onSubmit() {
		const submitObj = {
			receivedtransactionno: this.state.transactionid,
			receiveddate: this.state.sentdate,
			sendforservicingid: this.state.sentforservicid,
            recievedremarks: this.state.sentremarks
		};

		console.log(submitObj);

		axios
			.post('http://localhost:4000/api/complaintstatus/RecievedFromService/add', submitObj)
			.then((response) => console.log(response.data));
	}

	getrecievedfromservicingid() {
		axios.get('http://localhost:4000/api/complaintstatus/RecievedFromService/').then((response) => {
			response.data.map((item, i) => {
				if (item.receivedtransactionno === this.state.transactionid) {
					this.setState({ recieveid: item._id });
				}
			});
		});
		console.log(this.state.recieveid);
	}

		updateComplaint(){

		console.log( this.props.match.params.id);

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
		      isresolvedonphone: false,
		      status: "Recieved",
			  remarks: this.state.complaintsRemarks
			  

		  }

		  console.log(obj)
		      axios
		      .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.complaintid, obj)
			  .then(res => console.log(res.data));
			  
			  this.props.history.push("/api/complaintstatus");

	}

  render() {

	  const lblStyle = {
          fontWeight: "normal"
	  }

	  	let sendtodate;
	  	let addproducts;
		let complaintDetails;
		let feedbacksObj1;
		let feedbacksObj2;
		let feedbacksObj3;
		let productDetails1;
		let assignment1;
		let callerdetails;
		let UnassignedWarranty1;
		let AssignedWarranty1;
		let BringInWarranty1;
		let UnassignedWarranty2;
		let AssignedWarranty2;
		let BringInWarranty2;
		let UnassignedAMC;
		let AssignedAMC;
		let BringInAMC;
		let serviceProvider1;
		let serviceProvider2;
		let serviceProvider3;

		if(!isEmpty(this.state.sendtodate)){
				var dateSendtodate = new Date(this.state.sendtodate);
				var dataDateSendtodate = dateSendtodate.toISOString().substr(0, 10);
			sendtodate = dataDateSendtodate;
		}

		if (!isEmpty(this.state.addproducts)) {
			let type;
			addproducts = this.state.addproducts.map((AP) => {
				if (AP.partno === false) {
					type = 'Product';
				} else {
					type = 'Is Part';
				}
				return (
					<tr>
						<td>{type}</td>
						<td>{AP.partno}</td>
						<td>{AP.serialno}</td>
						<td>{AP.modelno}</td>
						<td>{AP.category}</td>
						<td>{AP.oem}</td>
						<td>{AP.remarks}</td>
					</tr>
				);
			});
		}

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




		if (!isEmpty(this.state.UnassignedWarranty)) {
			UnassignedWarranty1 = this.state.UnassignedWarranty.map((item) => {
				var dateOemwarrantyfrom = new Date(item.oemwarrantyfrom);
				var dateOemwarrantyto = new Date(item.oemwarrantyto);
				var dataDateOemwarrantyfrom1 = dateOemwarrantyfrom.toISOString().substr(0, 10);
				var dataDateOemwarrantyto1 = dateOemwarrantyto.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>OEM</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateOemwarrantyfrom1}</td>
							<td>{dataDateOemwarrantyto1}</td>
						</tr>
					</Fragment>
				);
			});

			UnassignedWarranty2 = this.state.UnassignedWarranty.map((item) => {
				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				var dataDateWarrantyfrom1 = dateWarrantyfrom.toISOString().substr(0, 10);
				var dataDateWarrantyto1 = dateWarrantyto.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>Company</td>
							<td>NiceInfoTech</td>
							<td>{dataDateWarrantyfrom1}</td>
							<td>{dataDateWarrantyto1}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.AssignedWarranty)) {
			AssignedWarranty1 = this.state.AssignedWarranty.map((item) => {
				var dateOemwarrantyfrom = new Date(item.oemwarrantyfrom);
				var dateOemwarrantyto = new Date(item.oemwarrantyto);
				var dataDateOemwarrantyfrom2 = dateOemwarrantyfrom.toISOString().substr(0, 10);
				var dataDateOemwarrantyto2 = dateOemwarrantyto.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>OEM</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateOemwarrantyfrom2}</td>
							<td>{dataDateOemwarrantyto2}</td>
						</tr>
					</Fragment>
				);
			});

			AssignedWarranty2 = this.state.AssignedWarranty.map((item) => {
				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				var dataDateWarrantyfrom2 = dateWarrantyfrom.toISOString().substr(0, 10);
				var dataDateWarrantyto2 = dateWarrantyto.toISOString().substr(0, 10);
				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>Company</td>
							<td>NiceInfoTech</td>
							<td>{dataDateWarrantyfrom2}</td>
							<td>{dataDateWarrantyto2}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.BringInWarranty)) {
			BringInWarranty1 = this.state.BringInWarranty.map((item) => {

				var dataDateOemwarrantyfrom3;
				var dataDateOemwarrantyto3
				BringInWarranty1 = this.state.BringInWarranty.map((item) => {

				if(!isEmpty(item.oemwarrantyfrom)){
				var dateOemwarrantyfrom = new Date(item.oemwarrantyfrom);
				var dateOemwarrantyto = new Date(item.oemwarrantyto);
				dataDateOemwarrantyfrom3 = dateOemwarrantyfrom.toISOString().substr(0, 10);
				dataDateOemwarrantyto3 = dateOemwarrantyto.toISOString().substr(0, 10);
				}

				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>OEM</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateOemwarrantyfrom3}</td>
							<td>{dataDateOemwarrantyto3}</td>
						</tr>
					</Fragment>
				);
			});
		
			BringInWarranty2 = this.state.BringInWarranty.map((item) => {

				var dataDateWarrantyfrom3;
				var dataDateWarrantyto3;

				if(!isEmpty(item.oemwarrantyfrom)){
				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				dataDateWarrantyfrom3 = dateWarrantyfrom.toISOString().substr(0, 10);
				dataDateWarrantyto3 = dateWarrantyto.toISOString().substr(0, 10);
				}

				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>Warranty</td>
							<td>Company</td>
							<td>NiceInfoTech</td>
							<td>{dataDateWarrantyfrom3}</td>
							<td>{dataDateWarrantyto3}</td>
						</tr>
					</Fragment>
				);
			});
		})
	}

		if (!isEmpty(this.state.UnassignedAMC)) {
			UnassignedAMC = this.state.UnassignedAMC.map((item) => {

				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				var dataDateWarrantyfrom4 = dateWarrantyfrom.toISOString().substr(0, 10);
				var dataDateWarrantyto4 = dateWarrantyto.toISOString().substr(0, 10);
			
				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>AMC</td>
							<td>Company</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateWarrantyfrom4}</td>
							<td>{dataDateWarrantyto4}</td>
						</tr>
					</Fragment>
				);
			});
		}

		
		if (!isEmpty(this.state.AssignedAMC)) {
			AssignedAMC = this.state.AssignedAMC.map((item) => {

				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				var dataDateWarrantyfrom5 = dateWarrantyfrom.toISOString().substr(0, 10);
				var dataDateWarrantyto5 = dateWarrantyto.toISOString().substr(0, 10);

				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>AMC</td>
							<td>Company</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateWarrantyfrom5}</td>
							<td>{dataDateWarrantyto5}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.BringInAMC)) {
			BringInAMC = this.state.BringInAMC.map((item) => {

				var dateWarrantyfrom = new Date(item.warrantyfrom);
				var dateWarrantyto = new Date(item.warrantyto);
				var dataDateWarrantyfrom6 = dateWarrantyfrom.toISOString().substr(0, 10);
				var dataDateWarrantyto6 = dateWarrantyto.toISOString().substr(0, 10);

				return (
					<Fragment>
						<tr>
							<td>{item.serialno}</td>
							<td>AMC</td>
							<td>Company</td>
							<td>{item.serviceprovider}</td>
							<td>{dataDateWarrantyfrom6}</td>
							<td>{dataDateWarrantyto6}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.serviceprovider1)) {
			serviceProvider1 = this.state.serviceprovider1.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.providername}</td>
							<td>{item.contactperson}</td>
							<td>{item.contactno}</td>
							<td>{item.alternatecontactno}</td>
							<td>{item.fax}</td>
							<td>{item.email}</td>
							<td>{item.email}</td>
							<td>{item.address}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.serviceprovider2)) {
			serviceProvider2 = this.state.serviceprovider2.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.providername}</td>
							<td>{item.contactperson}</td>
							<td>{item.contactno}</td>
							<td>{item.alternatecontactno}</td>
							<td>{item.fax}</td>
							<td>{item.email}</td>
							<td>{item.email}</td>
							<td>{item.address}</td>
						</tr>
					</Fragment>
				);
			});
		}

		if (!isEmpty(this.state.serviceprovider3)) {
			serviceProvider3 = this.state.serviceprovider3.map((item) => {
				return (
					<Fragment>
						<tr>
							<td>{item.providername}</td>
							<td>{item.contactperson}</td>
							<td>{item.contactno}</td>
							<td>{item.alternatecontactno}</td>
							<td>{item.fax}</td>
							<td>{item.email}</td>
							<td>{item.email}</td>
							<td>{item.address}</td>
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
        		<h2 className="text-center">Receive Products From Servicing :</h2>

				<form style={{ marginTop: '5%' }} onMouseMove={this.getrecievedfromservicingid}>
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
									name="sentdate"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<label>Case Id :</label>&nbsp;&nbsp;
							<input
								type="text"
								className="form-control"
								name="complaintcaseid"
								placeholder="Challan No"
								value={this.state.complaintcaseid}
								onChange={this.onChange}
							/>
						</div>
                        <div className="col-6">
							<div className="form-group">
								<label>Remarks :</label>&nbsp;&nbsp;
								<textarea
									type="text"
									className="form-control"
									name="sentremarks"
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
							disabled={!(this.state.sentdate && this.state.sentremarks)}
							onClick={this.onSubmit}
						/>
					</div>
				</form>
				<br />
				<br />
				<div>
				<h4 className="text-center" style={{ fontWeight: 'normal' }}>
					Sent Details :
				</h4>

				<div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Sent Transaction No :</label>&nbsp;&nbsp;
                    <label>{this.state.sendtotransactionno}</label>
                    </div>
                  </div>
                   <div className="col-6">
                       <div className="form-group">
                    <label style = {lblStyle}>Sent on :</label>&nbsp;&nbsp;
                    <label>{sendtodate}</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Challan no :</label>&nbsp;&nbsp;
                    <label>{this.state.sendtochallanno}</label>
                    </div>
                  </div>
                  <div className="col-6">
                      <div className="form-group">
                    <label style = {lblStyle}>Service type :</label>&nbsp;&nbsp;
                    <label>{this.state.sendtoservicetype}</label>
                    </div>
                  </div>
                </div>
				<br />
				</div>
				<h4 className="text-center" style={{ fontWeight: 'normal' }}>
					Other Details :
				</h4>
				<div>
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item">
							<a
								className="nav-link active"
								id="home-tab"
								data-toggle="tab"
								href="#productdetails"
								role="tab"
								aria-controls="home"
								aria-selected="true"
							>
								Products Sent
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="profile-tab"
								data-toggle="tab"
								href="#deliveryaddress"
								role="tab"
								aria-controls="profile"
								aria-selected="false"
							>
								Delivery Address
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="profile-tab"
								data-toggle="tab"
								href="#warrantyamcdetails"
								role="tab"
								aria-controls="profile"
								aria-selected="false"
							>
								Warranty/Amc Details
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
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
						<li className="nav-item">
							<a
								className="nav-link"
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
						<li className="nav-item">
							<a
								className="nav-link"
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
						<li className="nav-item">
							<a
								className="nav-link"
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
						<li className="nav-item">
							<a
								className="nav-link"
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
					
					<div className="tab-content" id="myTabContent">
						<div
							className="tab-pane fade show active"
							id="productdetails"
							role="tabpanel"
							aria-labelledby="home-tab"
						>
							<br />
							<table id="tab1" className="table table-bordered mb-4" onMouseOver={this.getTableRow}>
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
								{addproducts}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="deliveryaddress" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Service Center</td>
										<td>Contact Person </td>
										<td>Contact No 1</td>
										<td>Dontact No 2</td>
										<td>Fax No</td>
										<td>Email Id</td>
										<td>Zip Code</td>
										<td>Address</td>
									</tr>
								</thead>
								<tbody>
									{serviceProvider1}
									{serviceProvider2}
									{serviceProvider3}
								</tbody>
							</table>
						</div>
						<div
							className="tab-pane fade"
							id="warrantyamcdetails"
							role="tabpanel"
							aria-labelledby="profile-tab"
						>
							<table id="tab" className="table table-bordered mb-4" style={{Height: "100px"}}>
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Serial No</td>
										<td>Warranty/ AMC</td>
										<td>Warranty/ AMC type</td>
										<td>Service Provider</td>
										<td>Period From</td>
										<td>Period To</td>
									</tr>
								</thead>
								<tbody>
									{UnassignedWarranty1}
									{UnassignedWarranty2}
									{UnassignedAMC}
									{AssignedWarranty1}
									{AssignedWarranty2}
									{AssignedAMC}
									{BringInWarranty1}
									{BringInWarranty2}
									{BringInAMC}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="deliverydetails" role="tabpanel" aria-labelledby="profile-tab">
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
								<tbody>
								{complaintDetails}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="installdetails" role="tabpanel" aria-labelledby="profile-tab">
							<table id="tab" className="table table-bordered mb-4">
								<thead style={{ backgroundColor: '#d8d8d8' }}>
									<tr>
										<td>Feedback Date</td>
										<td>Feedback</td>
										<td>Feedback Status</td>
									</tr>
								</thead>
								<tbody>
								{feedbacksObj1}
								{feedbacksObj2}
								{feedbacksObj3}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="amcdetails" role="tabpanel" aria-labelledby="profile-tab">
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
								<tbody>
								{productDetails1}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="warrantydetails" role="tabpanel" aria-labelledby="profile-tab">
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
						<div className="tab-pane fade" id="callerdetails" role="tabpanel" aria-labelledby="profile-tab">
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
						disabled={!(this.state.sentdate && this.state.sentremarks)}
					/>
					<br />
				</div>
      </div>
    )
  }
}
