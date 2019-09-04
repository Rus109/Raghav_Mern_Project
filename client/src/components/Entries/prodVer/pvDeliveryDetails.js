import React, { Component, Fragment } from 'react'

class PVDeliveryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("Delivery Details", this.props.obj)
    }
    render() { 
        var proregDate = new Date(this.props.obj.date);
            var dataDroregDate = proregDate.toISOString().substr(0, 10);
        return ( 
            <Fragment>
                <td>{this.props.obj.refno1}</td>
                <td>{this.props.obj.refno2}</td>
                <td>{dataDroregDate}</td>
                <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
            </Fragment>
         );
    }
}
 
export default PVDeliveryDetails;