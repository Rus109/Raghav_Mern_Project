import React, { Component } from 'react'

class AmcRenProReg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
	}
	componentDidMount(){	
		console.log("AmcRenProReg", this.props.obj)
	}
    render() { 

        return ( 
			<tr>
                <td>{Object.entries(this.props.obj.category)[1].slice(1)}</td>
 				<td>{Object.entries(this.props.obj.subcategory)[1].slice(1)}</td>
				<td>{Object.entries(this.props.obj.oem)[1].slice(1)}</td>
                <td>{this.props.obj.serialno}</td>
				<td>{this.props.obj.modelno}</td>
            </tr> 
         );
    }
}
 
export default AmcRenProReg;