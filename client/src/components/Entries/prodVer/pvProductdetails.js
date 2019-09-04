import React, { Component, Fragment } from 'react';

class PVProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("PV Product Details", this.props.obj.products)
    }
    render() {
        let details = ""; 
            details = this.props.obj.products.map(item => {
                return item
            })
        return ( 
            <Fragment>
                    <td>{Object.entries(details[0].category)[1].slice(1)}</td>
                    <td>{Object.entries(details[0].subcategory)[1].slice(1)}</td>
                    <td>{Object.entries(details[0].oem)[1].slice(1)}</td>
                    <td>{details[0].modelno}</td>
            </Fragment>
         );
    }
}
 
export default PVProductDetails;