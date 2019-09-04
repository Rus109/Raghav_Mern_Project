import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
var productRegId ="";
var oemDetails = "";
class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          product: []
         }
    }
    delete() {
      axios
        .delete("http://localhost:4000/api/productregistration/delete/" + productRegId)
        .then(console.log("Deleted"))
        .catch(err => console.log(err));
    }
    componentWillMount(){
      productRegId = this.props.obj._id;
      console.log(productRegId); 
    }

    componentDidMount(){
      axios.get("http://localhost:4000/api/product")
      .then(console.log("Product"))
    }
    render() { 
      console.log(oemDetails)
        return ( 
            <tr>
            <td>{this.props.obj.refno1}</td>
             <td>{this.props.obj.refno2}</td>
             {/* <td>{Object.entries(oemDetails)[1].slice(1)}</td> */}
        
            <td><Moment format="DD/MM/YYYY">{this.props.obj.prodregdate}
              </Moment></td>
            <td>{this.props.obj.serialno}</td>
            {/* <td>{Object.entries(this.props.obj.customer)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.customertype)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.department)[1].slice(1)}</td> */}
            <td>{this.props.obj.deliverydate}</td>
            <td>{this.props.obj.address}</td>
            {/* <td>{Object.entries(this.props.obj.assignedto)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.warrantyprovider)[1].slice(1)}</td>
            <td>{Object.entries(this.props.obj.oemwarrantyprovider)[1].slice(1)}</td> */}
            <td>{this.props.obj.warrantystartdate}</td>
            <td>{this.props.obj.warrantyexpiredate}</td>
            <td>{this.props.obj.remarks}</td>
            {/* <td><img src={BASE_URL + 'employees/docs/' + this.props.obj.imageName} alt="No Data" /></td> */}
            <td>{this.props.obj.date}</td>
            <td style={{ paddingTop: "2%" }}>
              <button onClick={this.delete} className="btn btn-danger">
              <i className="fas fa-trash" />
              </button>
            </td>
            <td style={{ paddingTop: "2%" }}>
              <Link
                to={"/api/productregistration/edit/" + this.props.obj._id}
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