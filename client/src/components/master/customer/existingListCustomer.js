import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: [] };
    this.updateCust = this.updateCust.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
  this.updateCust();
  }

  updateCust() {
    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteRow(_id) {
    const cust_id = _id;
    axios
      .delete("http://localhost:4000/api/customer/delete/" + cust_id)
      .then(console.log("Deleted"));
  }

  render() {
    const columns = [
      {
        Header: "No",
        id: "row",
        filterable: false,
        style: {
          paddingLeft: "20px"
        },
        Cell: row => {
          return <div>{row.index + 1}.</div>;
        }
      },
      {
        Header: "Customer name",
        accessor: "customername"
      },
      {
        Header: "Customer Type",
        accessor: "customertype.customertype"
      },
      {
        Header: "Contact Number",
        accessor: "contactno",
        sortable: false,
        filterable: false
      },
      {
        Header: "Alternate Contact No",
        accessor: "alternatecontactno",
        sortable: false,
        filterable: false
      },
      {
        Header: "Email",
        accessor: "email",
        sortable: false,
        filterable: false
      },

      {
        Header: "Fax",
        accessor: "fax",
        sortable: false,
        filterable: false
      },

      {
        Header: "Address",
        accessor: "address",
        sortable: false,
        filterable: false,
        style: {
          padding: "10px"
        }
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
                to={"/api/customer/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link
                to={"/api/customer/print/" + props.original._id}
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
          paddingLeft: "20px"
        }
      }
    ];
    return (
      <div>
        <h3 className="mt-3" align="center">
          Customer List
        </h3>
        <Link to="/api/customer/add" className="btn btn-success">
        <i className="fas fa-plus"></i>
        </Link>
        <Link to="/api/customer/printpage" className="btn btn-info ml-1">
        <i className="fas fa-print"></i>
        </Link>
        <ReactTable
          columns={columns}
          data={this.state.customer}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"No Data.."}
          className="mt-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(customer => {
              return customer._original;
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

export default ExistingListCustomer;
