import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableRow from "./tableRow";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListService extends Component {
  constructor(props) {
    super(props);
    this.state = { servicecenter: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/servicecenter")
      .then(response => {
        this.setState({ servicecenter: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/servicecenter")
      .then(response => {
        this.setState({ servicecenter: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteRow(_id) {
    const cust_id = _id;
    axios
      .delete(
        "http://localhost:4000/api/servicecenter/delete/" + cust_id
      )
      .then(console.log("Deleted"));
  }

  tabRow(){
    return this.state.servicecenter.map(function(object, i){
        return <TableRow obj={object} key={i} />;
    });
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
        Cell: (row) => {
          return <div>{row.index + 1}.</div>
        }
      },
      {
        Header: "Company name",
        accessor: "company.companyname"
      },
      {
        Header: "Service Provider",
        accessor: "serviceprovider.providername"
      },
      {
        Header: "Center Name",
        accessor: "centername"
      },
      {
        Header: "Contact Number",
        accessor: "contactperson"
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
        Header: "Zip Code",
        accessor: "zipcode",
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
                to={"/api/servicecenter/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link to={"/api/servicecenter/print/" + props.original._id} className="btn btn-dark ml-1" >
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
        <h3 className="text-center mt-4">SERVICE CENTER LISTS</h3>
        <br />
        <Link to="/api/servicecenter/add" className="btn btn-success">
          Add New Service Center
        </Link>
        <Link to="/api/servicecenter/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
        <ReactTable
          columns={columns}
          data={this.state.servicecenter}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"No Data.."}
          className="mt-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(servicecenter => {
              return servicecenter._original;
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

export default ExistingListService;

