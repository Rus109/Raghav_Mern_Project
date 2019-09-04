import React, { Component, Fragment } from 'react';

class PVAmcDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("PV Amc", this.props.obj)
    }
    render() { 
        var amcDate = new Date(this.props.obj.amcregdate);
        var amcStartDate = new Date(this.props.obj.amcstartdate);
        var amcEndDate = new Date(this.props.obj.amcexpiredate);
            var dataAmcDate = amcDate.toISOString().substr(0, 10);
            var dataAmcStartDate = amcStartDate.toISOString().substr(0, 10);
            var dataAmcEndDate = amcEndDate.toISOString().substr(0, 10);
        return ( 
            <Fragment>
            <td>{this.props.obj.amcrefno}</td>
            <td>{dataAmcDate}</td>
            <td>{Object.entries(this.props.obj.serviceprovider)[1].slice(1)}</td>
            <td>{dataAmcStartDate}</td>
            <td>{dataAmcEndDate}</td>
            </Fragment>
         );
    }
}
 
export default PVAmcDetails;