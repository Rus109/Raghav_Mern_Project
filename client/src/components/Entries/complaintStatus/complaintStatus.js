import React, { Component } from 'react';
import ComplaintStatusActive from "./complaintStatusActive";
import ComplaintStatusClosed from "./complaintStatusClosed";
import axios from 'axios';
// import isEmpty from '../../../validation/is-empty';

    let activeComplaint = [];
	let closedComplaint = [];
	let Active = "";
	let Closed = "";
	  
export default class ComplaintStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
	complaint: [],
      activeComplaint: [],
      closedComplaint: []
    } 
  }

  componentDidMount(){
     axios
      .get("http://localhost:4000/api/complaint")
      .then(response => {
		console.log(response.data)
		this.setState({complaint: response.data}, () => {
		response.data.map(item => {
          if(item.isresolvedonphone === true){
			  console.log("Active", item)
			this.setState({activeComplaint : item})
			closedComplaint.push(item);
          }
          else {
			  console.log("Closed", item)
			this.setState({closedComplaint: item})
			activeComplaint.push(item);
          }
        })
		})
      })
      .catch(function(error) {
        console.log(error);
	  });
	  
  }

  componentWillUnmount(){
	activeComplaint = [];
	closedComplaint = [];
	Active = "";
	Closed = "";

  }
  render() {

	Active = activeComplaint.map(item => {
       return <ComplaintStatusActive obj = {item}/>
	})
	Closed = closedComplaint.map(item => {
       return <ComplaintStatusClosed obj = {item}/>
	})
    
    return (
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
											Active Complaints
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
											Closed Complaints
										</a>
									</li>
								</ul>
								<div class="tab-content" id="myTabContent">
									<div
										class="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab">
											<table id="tab1" className="table table-bordered mb-4" onMouseOver={this.getTableRow}>
                        <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Case Id</td>
                        <td>Complaint Date</td>
                        <td>Calltype</td>
                        <td>Serial No</td>
						<td>Problem Details</td>
						<td>Assigned On</td>
						<td>Assigned To</td>
						<td>Time Taken</td>
						<td>Complaint Status</td>
                        </thead>
                        <tbody>
                          {Active}
                        </tbody>
                    </table>
				</div>
				<div
					class="tab-pane fade"
					id="profile"
					role="tabpanel"
					aria-labelledby="profile-tab">
												<table id="tab1" className="table table-bordered mb-4" onMouseOver={this.getTableRow}>
                        <thead style={{backgroundColor: "#d8d8d8"}}>
                        <td>Case Id</td>
                        <td>Complaint Date</td>
                        <td>Calltype</td>
                        <td>Serial No</td>
						<td>Problem Details</td>
						<td>Assigned On</td>
						<td>Assigned To</td>
						<td>Complaint Status</td>
						<td>Closed Date</td>
                        </thead>
                        <tbody>
                          {Closed}
                        </tbody>
                    </table>
					
					</div>
					</div>
    </div>
    )
  }
}
