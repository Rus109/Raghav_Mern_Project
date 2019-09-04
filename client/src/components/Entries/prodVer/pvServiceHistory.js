import React, { Component, Fragment } from 'react'

class PVServiceHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("PV service", this.props.obj)
    }
    render() { 
        var CompDate = new Date(this.props.obj.complaintdate);
        var dataCompDate = CompDate.toISOString().substr(0, 10);
        return ( 
            <Fragment>
                <td>{dataCompDate}</td>
                <td>{this.props.obj.problemdetails}</td>
                <td>{this.props.obj.status}</td>
                <td>To Be taken later from another page</td>
            </Fragment>
         );
    }
}
 
export default PVServiceHistory;