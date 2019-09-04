import React, { Component } from 'react'

class AmcRenProReg2 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.delete = this.delete.bind(this);
	}
	componentDidMount(){
		
		console.log(this.props.obj)
    }
    
    delete(e){
        alert(e.rowIndex)
    }
    render() { 
		var dateAmcDate = new Date(this.props.obj.date);
		var dataDateAmcDate = dateAmcDate.toISOString().substr(0, 10);

        return ( 
			<tr >
                <td>{this.props.obj.amcrefno}</td>
                <td>{dataDateAmcDate}</td>
                <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
				<td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
				<td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
            </tr> 
         );
    }
}
 
export default AmcRenProReg2;