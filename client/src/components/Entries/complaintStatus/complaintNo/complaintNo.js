import React, { Component } from 'react';
import axios from 'axios';
import isEmpty from '../../../../validation/is-empty';
import Feedback from './feedbacks';
import RelatedProducts from './relatedProducts';
import AssignmentDetails from './assignmentdetails';
import AssignComplaintsDetails from './assignComplaintDetails';
import CallerDetails from './callerDetails';

let assignid = '';
let assign = [];
let feedbackArr = [];
let AssignmentDetailsArr = [];
let AssignComplaintDetailsArr = [];
let CallerDetailsArr = [];
let ComplaintNoId = '1';
// let Feedbacks;

export default class ComplaintNo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maincomplaintid: "",
			assignProductDetails: [],
			assignid: '',
			caseid: '',

			showme: false,
			showrelatedproducts: false,

			transactionid: '',
			complaintnodate: '',
			remarks: '',
			callstatus: "Assigned",
			complaintdoc: '',

			complaintnoid: '1',
			/*----------------------------- UPDATE COMPLAINTS DATABASE STATE -------------------------------------- */

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
		this.onFileSelect = this.onFileSelect.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getComplaintnoid = this.getComplaintnoid.bind(this);
		this.updateComplaint = this.updateComplaint.bind(this);
	}
	componentDidMount() {
		let FeedbackObj;
		let AssignmentDetailsObj;
		let AssignComplaintDetailsObj;
		let CallerDetailsObj;

this.setState({maincomplaintid: this.props.match.params.complaintid})

		axios.get('http://localhost:4000/api/complaintstatus/assign/').then((response) => {
			response.data.map((item) => {
				if (this.props.match.params.complaintid === item.assigncomplaintsdetails._id) {
					assignid = item._id;
					this.setState({ assignid: item._id }, () => {
						axios.get('http://localhost:4000/api/complaintstatus/assign/edit/' + item._id).then((res) => {
							this.setState({ assignProductDetails: res.data.assigncomplaintsdetails });
							let temp = [ res.data ];
							temp.map((i3) => {
								let tempcomplainitdetails = [ i3.assigncomplaintsdetails ];
								tempcomplainitdetails.map((i4) => {
									FeedbackObj = {
										complaintdate: i4.complaintdate,
										complaintProdblem: i4.problemdetails,
										complaintstatus: 'Unassigned',
										assigndate: i3.assigndatetime,
										assignProdblem: i3.assignremarks,
										assignstatus: 'Assigned'
									};

									feedbackArr.push(FeedbackObj);

									AssignmentDetailsObj = {
										assignedRefNo: i3.assignrefno,
										assignedDate: i3.assigndatetime,
										assignedTo: i3.assignengineer.name,
										remarks: i3.assignremarks
									};

									AssignmentDetailsArr.push(AssignmentDetailsObj);

									AssignComplaintDetailsObj = {
										complaintNo: i4.caseid,
										complaintDate: i4.complaintdate,
										customerName: i4.client.customername,
										departmentName: i4.departmentname.department,
										callType: i4.calltype.calltype,
										problemDetails: i4.problemdetails,
										isResolved: i4.isresolvedonphone.toString()
									};

									AssignComplaintDetailsArr.push(AssignComplaintDetailsObj);

									CallerDetailsObj = {
										callerName: i4.name,
										callerDesignation: i4.designation,
										callerContactNo: i4.contactno,
										PTV: i4.persontovisit,
										address: i4.address
									};

									CallerDetailsArr.push(CallerDetailsObj);

									this.setState({ caseid: i4.caseid });
									return true;
								});
								return true;
							});
							this.setState({ showme: true, showrelatedproducts: true });
						});
					});
				}
				return true;
			});
		});

		let tempnumber = Math.random().toString();
		let number = tempnumber.split('.');
		let randomnumber = 'CPCN-' + number[1];
		this.setState({ transactionid: randomnumber });

		axios.get('http://localhost:4000/api/complaint/edit/' + this.props.match.params.complaintid).then((response) => {
			console.log('edit Complaint', response.data);
			this.setState({
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
			});
		});
	}

	onChange(e) {
		e.preventDefault();
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

		this.setState({ showrelatedproducts: false });
		let complaintid = this.props.match.params.complaintid;

		const { assignid, transactionid, complaintnodate, remarks, callstatus, complaintdoc } = this.state;

		let formData = new FormData();
		formData.append('complaintid', complaintid);
		formData.append('assigncomplaintid', assignid);
		formData.append('transno', transactionid);
		formData.append('dateandtime', complaintnodate);
		formData.append('complaintnoremarks', remarks);
		formData.append('callstatus', callstatus);
		formData.append('complaintdoc', complaintdoc);

		console.log(formData);

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};

		axios
			.post('http://localhost:4000/api/complaintstatus/complaintno/add', formData, { headers })
			.then()
			


		
		this.setState({ showrelatedproducts: true });
	}

	getComplaintnoid(){
	axios.get('http://localhost:4000/api/complaintstatus/complaintno/').then((response) => {
					response.data.map((item, i) => {
						if (item.installrefno === this.state.installrefno) {
							this.setState({ complaintnoid: item._id });
							ComplaintNoId = item._id;
						}
						return true;
					});
				})

				console.log(ComplaintNoId)
	}

	updateComplaint(){

		console.log( this.props.match.params.id);
		let newcallstatus;
		  let newisresolvedonphone;
		  if(this.state.callstatus === "Assigned"){
			newcallstatus = "Assigned";
		  }
		  else{
			  newcallstatus = this.state.callstatus;
		  }

		  if(this.state.callstatus === "Closed"){
			  newisresolvedonphone = true;
		  }
		  else{
			  newisresolvedonphone = false;
		  }
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
		      isresolvedonphone: newisresolvedonphone,
		      status: newcallstatus,
		      remarks: this.state.complaintsRemarks
		  }

		  console.log(obj)
		      axios
		      .post("http://localhost:4000/api/complaint/update/" + this.props.match.params.complaintid, obj)
			  .then(res => console.log(res.data));
			  
			  this.props.history.push("/api/complaintstatus");

	}
	render() {
		let feeder;
		if (!isEmpty(feedbackArr)) {
			feeder = feedbackArr.map((item) => {
				return <Feedback obj={item} />;
			});
		}

		let feederAssignmentDetails;
		if (!isEmpty(AssignmentDetailsArr)) {
			feederAssignmentDetails = AssignmentDetailsArr.map((item) => {
				return <AssignmentDetails obj={item} />;
			});
		}

		let feederAssignComplaintDetails;
		if (!isEmpty(AssignComplaintDetailsArr)) {
			feederAssignComplaintDetails = AssignComplaintDetailsArr.map((item) => {
				return <AssignComplaintsDetails obj={item} />;
			});
		}

		let feederCallerDetails;
		if (!isEmpty(CallerDetailsArr)) {
			feederCallerDetails = CallerDetailsArr.map((item) => {
				return <CallerDetails obj={item} />;
			});
		}

		return (
			<div>
				<h3 className="text-center">Complaints No : &nbsp;&nbsp;{this.state.caseid}</h3>

				<form style={{ marginTop: '5%' }} onMouseMove = {this.getComplaintnoid}>
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
									value={this.state.assignmentDate}
									name="complaintnodate"
									onChange={this.onChange}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<label>Call Status :</label>&nbsp;&nbsp;
							<select className="form-control" name="callstatus" onChange={this.onChange}>
								<option value="Assigned">Assigned</option>
								<option value="BringInRequest">BringInRequest</option>
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
							disabled = {
								!(
									this.state.complaintnodate &&
									this.state.complaintdoc &&
									this.state.remarks
								)
							}
							//  { && }
							onMouseDown={this.onSubmit} onMouseUp = {this.getComplaintnoid}
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
								Feedbacks
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
							id="productdetails"
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
								<tbody>{this.state.showme ? feeder : null}</tbody>
							</table>
						</div>
						<div class="tab-pane fade" id="deliverydetails" role="tabpanel" aria-labelledby="profile-tab">
							{this.state.showrelatedproducts ? (
								<RelatedProducts objid={this.state.assignid} CNid={ComplaintNoId} />
							) : null}
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
								<tbody>{this.state.showme ? feederAssignmentDetails : null}</tbody>
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
								<tbody>{this.state.showme ? feederAssignComplaintDetails : null}</tbody>
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
								<tbody>{this.state.showme ? feederCallerDetails : null}</tbody>
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
							disabled = {
								!(
									this.state.complaintnodate &&
									this.state.complaintdoc &&
									this.state.remarks
								)
							}
					/>
					<br/>
				</div>
			</div>
		);
	}
}
