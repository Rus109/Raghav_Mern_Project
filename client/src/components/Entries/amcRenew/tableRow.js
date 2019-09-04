import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
var amcReRegId = "";

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentWillMount(){
        amcReRegId = this.props.obj._id;
        console.log(amcReRegId); 
      }
  
      delete() {
        axios
          .delete("http://localhost:4000/api/amcrenewal/delete/" + amcReRegId)
          .then(console.log("Deleted"))
          .catch(err => console.log(err));
      }

    render() { 
        return ( 
            <tr>
            <td>{this.props.obj.amcrenewno}</td>
             <td>{this.props.obj.amcregdate}</td>
             {/* <td>{Object.entries(this.props.obj.amcrefno)[1].slice(1)}</td> */}
             {/* <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.serviceprovider)[1].slice(1)}</td> */}
            <td>{this.props.obj.amcstartdate}</td>
            <td>{this.props.obj.amcexpiredate}</td>
            {/* <td>{Object.entries(this.props.obj.refno[0])[2].slice(1)}</td> */}
            <td>{this.props.obj.remarks}</td>

            <td>{this.props.obj.date}</td>
            <td style={{ paddingTop: "2%" }}>
              <button onClick={this.delete} className="btn btn-danger">
              <i className="fas fa-trash" />
              </button>
            </td>
            <td style={{ paddingTop: "2%" }}>
              <Link
                to={"/api/amcrenewal/edit/" + amcReRegId}
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