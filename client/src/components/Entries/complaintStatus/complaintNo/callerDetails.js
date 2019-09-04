import React, { Component, Fragment } from 'react'

export default class CallerDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
  render() {
    return (
      <Fragment>
       <tr>
            <td>{this.props.obj.callerName}</td>
            <td>{this.props.obj.callerDesignation}</td>
            <td>{this.props.obj.callerContactNo}</td>
            <td>{this.props.obj.PTV}</td>
            <td>{this.props.obj.address}</td>
      </tr>
    </Fragment>
    )
  }
}
