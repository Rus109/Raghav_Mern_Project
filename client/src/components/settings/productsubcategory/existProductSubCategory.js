import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListProductSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { productsubcategory: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/productsubcategory")
      .then(response => {
        this.setState({ productsubcategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/productsubcategory")
      .then(response => {
        this.setState({ productsubcategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  deleteRow(_id) {
    const pro_sub_id = _id;
    axios
      .delete(
        "http://localhost:4000/api/productsubcategory/delete/" + pro_sub_id
      )
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
        Header: "Sub Category",
        accessor: "subcategory"
      },
      {
        Header: "Product Category",
        accessor: "parentcategory.category"
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
                  this.deleteRow(props.original._id);
                }}
                className="btn btn-danger"
              >
                <i className="fas fa-trash" />
              </button>
              <Link
                to={"/api/productsubcategory/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link
                to={"/api/productsubcategory/print/" + props.original._id}
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
        <h3 className="text-center mt-5">Product Sub Category List</h3>
        <br />
        <Link to="/api/productsubcategory/add" className="btn btn-success">
          Add New Product Sub Category
        </Link>
        <Link
          to="/api/productsubcategory/printpage"
          className="btn btn-info ml-5"
        >
          Preview
        </Link>
        <ReactTable
          columns={columns}
          data={this.state.productsubcategory}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(productsubcategory => {
              return productsubcategory._original;
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

export default ExistingListProductSubCategory;
