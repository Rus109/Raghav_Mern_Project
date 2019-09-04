import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: []
    };
    this.updateComp = this.updateComp.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // componentDidUpdate() {
  //   axios
  //     .get("http://localhost:3000/api/company")
  //     .then(response => {
  //       this.setState({ company: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    this.updateComp();
  }

  updateComp() {
    axios
      .get("http://localhost:3000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteRow(_id) {
    const company_id = _id;
    axios
      .delete("http://localhost:4000/api/company/delete/" + company_id)
      .then(console.log("Deleted"));
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
        Header: "Company name",
        accessor: "companyname"
      },
      {
        Header: "Contact Person",
        accessor: "contactperson"
      },
      {
        Header: "Phone No",
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
                to={"/api/company/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link
                to={"/api/company/print/" + props.original._id}
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
        <div>
          <h4 className="text-center">Company List</h4>

          <Link to="/api/company/add" className="btn btn-success">
            <i className="fa fa-plus" aria-hidden="true" />
          </Link>
          <Link to="/api/company/printpage" className="btn btn-info ml-3">
            <i className="fas fa-print" />
          </Link>
        </div>

        <ReactTable
          columns={columns}
          data={this.state.company}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          style={{ width: "120%" }}
          noDataText={"Please Enter Data.."}
          className="mt-4 p-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(company => {
              return company._original;
            });
            return <div>{filterData()}</div>;
            
          }}
        </ReactTable>
      </div>
    );
  }
}

export default ExistingCompany;
