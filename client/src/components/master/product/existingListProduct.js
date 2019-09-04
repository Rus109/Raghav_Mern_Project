import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

const BASE_URL = "http://localhost:3000/";

class ExistingListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { product: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/product")
      .then(response => {
        this.setState({ product: response.data });
        
      })
      .catch(function(error) {
        console.log(error);
      });



  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/product")
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteRow(_id) {
    const pro_id = _id;
    axios
      .delete(
        "http://localhost:4000/api/product/delete/" + pro_id
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
        Cell: (row) => {
          return <div>{row.index + 1}.</div>
        }
      },
      {
        Header: "OEM",
        accessor: "oem.companyname"
      },
      {
        Header: "Product Category",
        accessor: "category.category",
        filterable: false,
      },
      {
        Header: "Product Sub Category",
        accessor: "subcategory.subcategory"
      },
      {
        Header: "Model Number",
        accessor: "modelno"
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: false,
      },
      {
        Header: "File",
        Cell: props => {
          return (
            <div>
              <a
                href={BASE_URL + "products/docs/" + props.original.specification}
                style={{ width: "90px", height: "50px" }}
              >Download
              </a>
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
                to={"/api/product/edit/" + props.original._id}
                className="btn btn-primary ml-1"
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <Link to={"/api/product/print/" + props.original._id} className="btn btn-dark ml-1" >
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
        <p><div>
        <h3 className="mt-4" align="center">Product List</h3>
        <br />
        <Link to="/api/product/add" className="btn btn-success">
          Add New Product
        </Link>
        <Link to="/api/product/printpage" className="btn btn-info ml-5">
        Preview
      </Link>
          <ReactTable
            columns={columns}
            data={this.state.product}
            filterable
            defaultPageSize={5}
            showPaginationBottom
            noDataText={"No Data.."}
            className="mt-4 text-center"
          >
            {(state, filterData, instance) => {
              this.reactTable = state.pageRows.map(product => {
                return product._original;
              });
              return (
                <div>
                  {filterData()}
                  {console.log(this.reactTable)}
                </div>
              );
            }}
          </ReactTable>
      </div></p>
     </div>
    );
  }
}

export default ExistingListProduct;
