import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
var amcRegId = "";

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentWillMount(){
        amcRegId = this.props.obj._id;
        console.log(amcRegId); 
      }

    delete() {
        axios
          .delete("http://localhost:4000/api/warranty/delete/" + amcRegId)
          .then(console.log("Deleted"))
          .catch(err => console.log(err));
      }
    render() { 
        return ( 
            <tr>
            {/* <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td> */}
            <td>{Object.entries(this.props.obj.warrantyprovider)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
            <td>{this.props.obj.warrantystartdate}</td>
            <td>{this.props.obj.warrantyexpiredate}</td>
            <td>{this.props.obj.remarks}</td>
            <td style={{ paddingTop: "2%" }}>
              <button onClick={this.delete} className="btn btn-danger">
              <i className="fas fa-trash" />
              </button>
            </td>
            <td style={{ paddingTop: "2%" }}>
              <Link
                to={"/api/warranty/edit/" + this.props.obj._id}
                className="btn btn-primary"
              >
              <i className="fas fa-pencil-alt" />
              </Link>
            </td>
        </tr> 
         );
    }
}
 
export default TableRow;