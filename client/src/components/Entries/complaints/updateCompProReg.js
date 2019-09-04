import React, { Component } from 'react'

class UpdateCompProReg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
	}
	componentDidMount(){
		
		console.log(this.props.obj)
	}
    render() { 
        return (
            <tr>
				<td>{this.props.obj.serialno}</td>
				<td>{this.props.obj.modelno}</td>
                <td>{Object.entries(this.props.obj.category)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.subcategory)[1].slice(1)}</td>
                <td>{Object.entries(this.props.obj.oem)[1].slice(1)}</td>
             </tr>
        );
    }
}
 
export default UpdateCompProReg;