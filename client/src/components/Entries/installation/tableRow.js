import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
const BASE_URL = "http://localhost:3000/"

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios
          .delete("http://localhost:4000/api/installation/delete/" + this.props.obj._id)
          .then(console.log("Deleted"))
          .catch(err => console.log(err));
      }

    render() { 
      // const SerialNo = this.props.obj.serialno.map((serN) => {
      //   return serN.serialno
      // })
        return ( <tr>
            <td>{this.props.obj.installrefno}</td>
            <td><Moment format="DD/MM/YYYY">{this.props.obj.installdate}</Moment></td>
           <td></td>
            <td>{Object.entries(this.props.obj.installedby)[1]
            .slice(1)}</td>
            <td>{Object.entries(this.props.obj.customer)[1]
            .slice(1)}</td>
            <td>{Object.entries(this.props.obj.customertype)[1]
            .slice(1)}</td>
            <td>{Object.entries(this.props.obj.department)[1]
            .slice(1)}</td>
            <td>{this.props.obj.contactperson}</td>
            <td>{this.props.obj.contactno}</td>
            <td>{this.props.obj.address}</td>
            <td>{this.props.obj.remarks}</td>
            <td><a href={BASE_URL + 'install/docs/' + this.props.obj.filename} target="_blank">Download</a></td>
            {/* <td><img src={BASE_URL + 'install/docs/' + this.props.obj.filename} alt="No Data" /></td> */}
            <td style={{ paddingTop: "2%" }}>
              <button onClick={this.delete} className="btn btn-danger">
              <i className="fas fa-trash" />
              </button>
            </td>
            <td style={{ paddingTop: "2%" }}>
              <Link
                to={"/api/installation/edit/" + this.props.obj._id}
                className="btn btn-primary"
              >
              <i className="fas fa-pencil-alt" />
              </Link>
            </td>
        </tr>  );
    }
}
 
export default TableRow;