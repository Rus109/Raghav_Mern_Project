import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { serviceprovider: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/serviceprovider")
      .then(response => {
        this.setState({ serviceprovider: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  deleteRow(_id){
    const serprd_id = _id;
    axios
      .delete("http://localhost:4000/api/serviceprovider/delete/" + serprd_id)
      .then(console.log("Deleted"))
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
        Header: "Provider Name",
        accessor: "providername"
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
                  this.deleteRow(props.original._id)
                }}
                className="btn btn-danger"
              >
                <i className="fas fa-trash" />
              </button>
              <Link
              to={"/api/serviceprovider/edit/" + props.original._id}
              className="btn btn-primary ml-1"
            >
            <i className="fas fa-pencil-alt" />
            </Link>
            <Link to={"/api/serviceprovider/print/" + props.original._id } className="btn btn-dark ml-1" >
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
        <h3 className="text-center mt-5 mb-3">SERVICE PROVIDER LISTS</h3>
        <br />
        <Link to="/api/serviceprovider/add" className="btn btn-success">
          Add New Service Provider
        </Link>
        <Link to="/api/serviceprovider/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
      <ReactTable
          columns={columns}
          data={this.state.serviceprovider}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 p-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(serviceprovider => {
              return serviceprovider._original;
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

export default ExistingListServiceProvider;
