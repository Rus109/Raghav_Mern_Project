import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TableRow from './tableRow';

class ExistWarranty extends Component {
    constructor(props) {
        super(props);
        this.state = { warranty: [] }
    }
    componentDidMount() {
        axios
          .get("http://localhost:4000/api/warranty")
          .then(response => {
            this.setState({ warranty: response.data });
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      tabRow() {
        return this.state.warranty.map(function(object, i) {
          return <TableRow obj={object} key={i} />;
        });
      }
      componentDidUpdate() {
        axios
          .get("http://localhost:4000/api/warranty")
          .then(response => {
            this.setState({ warranty: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    render() { 
        return ( 
            <div>
            <h3 align="center">Warranty Registration List</h3>
            <br />
            <Link to="/api/warranty/add" className="btn btn-success">
              Add New Warranty Registration
            </Link>
            <table className="table table-bordered mb-4" style={{ marginTop: 20 }}>
              <thead className="text-center">
                <tr>
                  <th>Serial No</th>
                  <th>Warrenty Provider</th>
                  <th>Customer</th>
                  <th>Customer Type</th>
                  <th>Department</th>
                  <th>Warrenty Start Date</th>
                  <th>Warrenty Expire Date</th>
                  <th>Remarks</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">{this.tabRow()}</tbody>
            </table>
          </div>
         );
    }
}
 
export default ExistWarranty;