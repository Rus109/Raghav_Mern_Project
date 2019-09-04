import React, { Component, Fragment } from 'react'

class PVInstallDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("PV Install", this.props.obj)
    }
    render() { 
        var installDate = new Date(this.props.obj.installdate);
            var dataInstallDate = installDate.toISOString().substr(0, 10);
        return ( 
            <Fragment>
                <td>{this.props.obj.installrefno}</td>
                <td>{dataInstallDate}</td>
                <td>{this.props.obj.serialno}</td>
                <td>{Object.entries(this.props.obj.installedby)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
                <td>{this.props.obj.contactperson}</td>
                <td>{this.props.obj.contactno}</td>
                <td>{this.props.obj.address}</td>
                <td>{this.props.obj.address}</td>
            </Fragment>
         );
    }
}
 
export default PVInstallDetails;