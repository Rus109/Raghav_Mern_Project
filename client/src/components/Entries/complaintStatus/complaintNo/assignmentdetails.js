import React, { Component, Fragment } from 'react'

export default class AssignmentDetails extends Component {
        constructor(props){
        super(props);
        this.state = {
        }
    }
  render() {
       var dateassignedDate = new Date(this.props.obj.assignedDate);
            var datadateassignedDate = dateassignedDate.toISOString().substr(0, 10);
    return (
      <Fragment>
       <tr>
            <td>{this.props.obj.assignedRefNo}</td>
            <td>{datadateassignedDate}</td>
            <td>{this.props.obj.assignedTo}</td>
            <td>{this.props.obj.remarks}</td>
      </tr>
    </Fragment>
    )
  }
}
