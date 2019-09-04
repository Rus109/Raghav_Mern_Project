import React, { Component, Fragment } from 'react'

export default class AssignComplaintDetails extends Component {
        constructor(props){
        super(props);
        this.state = {
        }
    }
  render() {
            var datecomplaintDate = new Date(this.props.obj.complaintDate);
            var datadatecomplaintDate= datecomplaintDate.toISOString().substr(0, 10);

    return (
      <Fragment>
       <tr>
            <td>{this.props.obj.complaintNo}</td>
            <td>{datadatecomplaintDate}</td>
            <td>{this.props.obj.customerName}</td>
            <td>{this.props.obj.departmentName}</td>
            <td>{this.props.obj.callType}</td>
            <td>{this.props.obj.problemDetails}</td>
            <td>{this.props.obj.isResolved}</td>

      </tr>
    </Fragment>
    )
  }
}
