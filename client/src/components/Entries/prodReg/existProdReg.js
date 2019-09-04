import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import TableRow from './tableRow';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistProdReg extends Component {
  constructor(props) {
    super(props);
    this.state = { proreg: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/proreg")
      .then(response => {
        this.setState({ proreg: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // tabRow() {
  //   return this.state.proreg.map(function(object, i) {
  //     return <TableRow obj={object} key={i} />;
  //   });
  // }
  // componentDidUpdate() {
  //   axios
  //     .get("http://localhost:4000/api/proreg")
  //     .then(response => {
  //       this.setState({ proreg: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  deleteRow(_id) {
    const proreg_id = _id;
    axios
      .delete("http://localhost:4000/api/proreg/delete/" + proreg_id)
      .then(alert("Product Registration Details has been delete!"));

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
        Header: "Refer No1",
        accessor: "refno1"
      },
      {
        Header: "Refer No2",
        accessor: "refno2"
      },
      {
        Header: "Date",
        accessor: "date",
        sortable: false,
        filterable: false
      },
      {
        Header: "customer",
        accessor: "customer.customername",
        sortable: false,
        filterable: false
      },
      {
        Header: "customertype",
        accessor: "customertype.customertype",
        sortable: false,
        filterable: false
      },

      {
        Header: "department",
        accessor: "department.department",
        sortable: false,
        filterable: false
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
                to={"/api/proreg/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link
                to={"/api/proreg/print/" + props.original._id}
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
        <h3 align="center">Product Registration</h3>
        <br />
        <Link to="/api/proreg/add" className="btn btn-success">
          Add New Product Registration
        </Link>

        <ReactTable
          columns={columns}
          data={this.state.proreg}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          style={{ width: "120%" }}
          noDataText={"Please Enter Data.."}
          className="mt-4 p-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(proreg => {
              return proreg._original;
            });
            return <div>{filterData()}</div>;
            
          }}
        </ReactTable>
      </div>
    );
  }
}

export default ExistProdReg;
