import React, { Component, Fragment } from 'react'

export default class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        console.log(this.props.obj)
    }
  render() {
            var dateassigndate = new Date(this.props.obj.assigndate);
            var datecomplaintdate = new Date(this.props.obj.complaintdate);
            var datadateassigndate = dateassigndate.toISOString().substr(0, 10);
            var datadatecomplaintdate = datecomplaintdate.toISOString().substr(0, 10);
    return (
      <Fragment>
       <tr>
            <td>{datadateassigndate}</td>
            <td>{this.props.obj.assignProdblem}</td>
            <td>{this.props.obj.assignstatus}</td>
      </tr>
      <tr>
            <td>{datadatecomplaintdate}</td>
            <td>{this.props.obj.complaintProdblem}</td>
            <td>{this.props.obj.complaintstatus}</td>
      </tr>
    </Fragment>
    )
  }
}
