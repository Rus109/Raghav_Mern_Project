import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ExistProdVer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productVerificatiion: []
         }
    }
    componentDidMount() {
        axios
          .get("http://localhost:4000/api/productverification")
          .then(response => {
            this.setState({ amcRegistration: response.data });
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }

    componentDidUpdate() {
        axios
          .get("http://localhost:4000/api/productverification")
          .then(response => {
            this.setState({ productVerificatiion: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      }

    render() { 
        return ( 
            <div>
            <h3 align="center">Amc Product Verification List</h3>
            <br />
            <Link to="/api/productverification/add" className="btn btn-success">
              Add New Product Verification
            </Link>
            <Link to={"/api/productverification/edit/" + '1'}  className="btn btn-success">
              eDIT Product Verification
            </Link>
            <table className="table table-bordered mb-4" style={{ marginTop: 20 }}>
              <thead className="text-center">
                <tr>
                  <th>Serial No</th>
                  <th>Installation Details</th>
                  <th>AMC Details</th>
                  <th>Customer Type</th>
                  <th>Service History</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              {/* <tbody className="text-center">{this.tabRow()}</tbody> */}
            </table>
          </div>
         );
    }
}
 
export default ExistProdVer;