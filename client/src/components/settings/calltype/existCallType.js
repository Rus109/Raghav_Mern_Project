import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListCallType extends Component {
  constructor(props) {
    super(props);
    this.state = { calltype: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/calltype")
      .then(response => {
        this.setState({ calltype: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/calltype")
      .then(response => {
        this.setState({ calltype: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  deleteRow(_id){
    const calltype_id = _id;
    axios
      .delete("http://localhost:4000/api/calltype/delete/" + calltype_id)
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
        Header: "Call Type",
        accessor: "calltype"
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
              to={"/api/calltype/edit/" + props.original._id}
              className="btn btn-primary ml-1"
            >
            <i className="fas fa-pencil-alt" />
            </Link>
            <Link to={"/api/calltype/print/" + props.original._id } className="btn btn-dark ml-1" >
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
        <h3 className="text-center mt-4">CALL TYPE LISTS</h3>
        <br />
        <Link to="/api/calltype/add" className="btn btn-success">
          Add New Call Type
        </Link>
        <Link to="/api/calltype/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
      <ReactTable
          columns={columns}
          data={this.state.calltype}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"No Data..."}
          className="mt-4 p-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(calltype => {
              return calltype._original;
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

export default ExistingListCallType;

