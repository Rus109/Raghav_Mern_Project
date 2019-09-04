import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistingListProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { productcategory: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/productcategory")
      .then(response => {
        this.setState({ productcategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/productcategory")
      .then(response => {
        this.setState({ productcategory: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  deleteRow(_id){
    const pc_id = _id;
    axios
      .delete("http://localhost:4000/api/productcategory/delete/" + pc_id)
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
        Header: "Product Category",
        accessor: "category"
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
              to={"/api/productcategory/edit/" + props.original._id}
              className="btn btn-primary ml-1"
            >
            <i className="fas fa-pencil-alt" />
            </Link>
            <Link to={"/api/productcategory/print/" + props.original._id } className="btn btn-dark ml-1" >
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
        <h3 className="text-center mt-5">PRODUCT CATEGORY LISTS</h3>
        <br />
        <Link to="/api/productcategory/add" className="btn btn-success">
          Add New Product Category
        </Link>
        <Link to="/api/productcategory/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
      <ReactTable
          columns={columns}
          data={this.state.productcategory}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"No Data..."}
          className="mt-4 p-4 text-center"
        >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(productcategory => {
              return productcategory._original;
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

export default ExistingListProductCategory;


