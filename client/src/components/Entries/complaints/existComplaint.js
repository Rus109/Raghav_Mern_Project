import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditComplaint from './editComplaint';

var complain = [];
class ExistComplain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            complain: []
         }
    }

    componentDidMount() {
        axios
          .get("http://localhost:4000/api/complaint")
          .then(response => {
            this.setState({ complain: response.data });
            complain = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }

    deleteRow(_id) {
      const com_id = _id;
      axios
      .delete("http://localhost:4000/api/complaint/delete/" + com_id)
      .then(alert("Complaint Details has been delete!"))

      window.location.reload();
      }
    render() { 
       const columns = [
        {
          Header: "No",
          id: "row",
  
          filterable: false,
          Cell: row => {
            return <div>{row.index + 1}.</div>;
          }
        },
        {
          Header: "Complain No",
          accessor: "caseid"
        },
        {
          Header: "Complain Date",
          accessor: "complaintdate"
        },
        {
          Header: "Complain Time",
          accessor: "complainttime"
        },
        {
          Header: "Service Type",
          accessor: "servicetype"
        },
        {
          Header: "Call Type",
          accessor: "calltype.calltype"
        },
        {
          Header: "Client",
          accessor: "client.customername"
        },
        {
          Header: "Client Type",
          accessor: "clienttype.customertype"
        },
        {
          Header: "Department Name",
          accessor: "departmentname.department"
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Contact No",
          accessor: "contactno"
        },
        {
          Header: "Person to Visit",
          accessor: "persontovisit",
        },
        {
          Header: "Designation",
          accessor: "designation"
        },
        {
          Header: "Actions",
          Cell: props => {
            return (
              <div>
                <button
                  onClick={() => {
                    this.deleteRow(props.original._id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash" />
                </button>
                <Link
                  to={"/api/complaint/edit/" + props.original._id}
                  className="btn btn-primary ml-1"
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
                <Link
                  to={"/api/complaint/print/" + props.original._id}
                  className="btn btn-dark ml-1"
                >
                  <i className="fas fa-eye" />
                </Link>
              </div>
            );
          },
          sortable: false,
          filterable: false,
          width: 250,
          style: {
            paddingLeft: "10px"
          }
        }
      ];
        return ( 
            <div>
        <h3 className="text-center mt-5">Existing Complaint List</h3>
        <br />
        <Link to="/api/complaint/add" className="btn btn-success">
          Add New Complaint
        </Link>
        <Link
          to="/api/complaint/printpage"
          className="btn btn-info ml-5"
        >
          Preview
        </Link>
        <ReactTable
          columns={columns}
          data={this.state.complain}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 text-center"
          >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(amcRegistration => {
              return amcRegistration._original;
            });
            return (
              <div>
                {filterData()}
              </div>
            );
          }}
        </ReactTable>
      </div>
         );
    }
}
 
export default ExistComplain;