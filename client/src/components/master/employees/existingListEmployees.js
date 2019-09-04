import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

var BASE_URL = "http://localhost:3000/";


class ExistingListEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }
  
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/employees")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteRow(_id) {
    const emp_id = _id;
    axios
      .delete(
        "http://localhost:4000/api/employees/delete/" + emp_id
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
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Speciality",
        accessor: "speciality.speciality"
      },
      {
        Header: "Designation",
        accessor: "designation.designation"
      },
      {
        Header: "Contact Number",
        accessor: "contactno",
        filterable: false,
      },
      {
        Header: "Alternate Contact Number",
        accessor: "alternatecontactno",
        filterable: false,
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: false,
      },
      {
        Header: "Image",
        Cell: props => {
          return (
            <div>
            <img
            className="img-thumbnail"
            src={BASE_URL + "employees/docs/" + props.original.imageName}
            alt="No Data"
            style={{width: "90px", height: "50px"}}
          />
            </div>
          );
        },
        sortable: false,
        filterable: false,
        style: {
          paddingLeft: "20px"
        },
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
              to={"/api/employees/edit/" + props.original._id}
              className="btn btn-primary ml-1"
            >
            <i className="fas fa-pencil-alt" />
            </Link>
            <Link to={"/api/employees/print/" + props.original._id } className="btn btn-dark ml-1" >
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
        <h3 className="mt-4" align="center">EMPLOYEES LISTS</h3>
        <br />
        <Link to="/api/employees/add" className="btn btn-success">
          Add New Employee
        </Link>
        <Link to="/api/employees/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
          <br/>
          <ReactTable
          columns={columns}
          data={this.state.employees}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"No Data.."}
          className="mt-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(employees => {
              return employees._original;
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

export default ExistingListEmployees;
