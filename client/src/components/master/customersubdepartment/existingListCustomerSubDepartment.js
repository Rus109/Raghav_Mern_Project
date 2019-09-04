import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListCustomerSubDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = { customersd: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersd: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/customersubdepartment")
      .then(response => {
        this.setState({ customersd: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  deleteRow(_id) {
    const custsd_id = _id;
    axios
      .delete(
        "http://localhost:4000/api/customersubdepartment/delete/" + custsd_id
      )
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
        Cell:(row) => {
          return <div>{row.index+1}.</div>
        }
      },
      {
        Header: "Department",
        accessor: "department"
      },
      {
        Header: "Customer",
        accessor: "customer.customername"
      },
      {
        Header: "Description",
        accessor: "description",
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
                  this.deleteRow(props.original._id)
                }}
                className="btn btn-danger"
              >
                <i className="fas fa-trash" />
              </button>
              <Link
              to={"/api/customersubdepartment/edit/" + props.original._id}
              className="btn btn-primary ml-1"
            >
            <i className="fas fa-pencil-alt" />
            </Link>
            <Link to={"/api/customersubdepartment/print/" + props.original._id } className="btn btn-dark ml-1" >
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
        },
      }
    ];
    return (
      <div>
        <h5 className="mt-4" align="center">CUSTOMER SUB DEPARTMENT LISTS</h5>
        <br />
        <Link to="/api/customersubdepartment/add" className="btn btn-success">
          Add New Customer Sub Department
        </Link>
        <Link to="/api/customersubdepartment/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
        <ReactTable
        columns={columns}
        data={this.state.customersd}
        filterable
        defaultPageSize={5}
        showPaginationBottom
        noDataText={"No Data.."}
        className="mt-4 text-center"
      >
        {(state, filterData, instance) => {
          this.reactTable = state.pageRows.map(customersd => {
            return customersd._original;
          });
          return (
            <div>
              {filterData()}
              {console.log(this.reactTable)}
            </div>
          );
        }}
      </ReactTable>
      </div>
    );
  }
}

export default ExistingListCustomerSubDepartment;
