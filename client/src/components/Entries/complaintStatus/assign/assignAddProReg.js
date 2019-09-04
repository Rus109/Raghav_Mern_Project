import React, { Component } from 'react'

export default class AssignAddProReg extends Component {
      constructor(props) {
        super(props);
        this.state = {
          newData: []
        };
  }
componentDidMount(){

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
    )
  }
}
