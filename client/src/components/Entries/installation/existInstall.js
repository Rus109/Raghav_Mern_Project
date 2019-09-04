import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TableRow from './tableRow';
import ReactTable from "react-table";
import "react-table/react-table.css";
// import isEmpty from '../../../validation/is-empty';

var BASE_URL = "http://localhost:3000/";

var installation = [];
class ExistInstall extends Component {
    constructor(props) {
        super(props);
        this.state = { installation: [] }
    }

    componentDidMount() {
      console.log("this")
        axios
          .get("http://localhost:4000/api/installation")
          .then(response => {
            installation = response.data;
            this.setState({ installation: response.data });
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      tabRow() {
        return this.state.installation.map(function(object, i) {
          return <TableRow obj={object} key={i} />;
        });
      }

      deleteRow(_id) {
      const amc_id = _id;
      axios
      .delete("http://localhost:4000/api/installation/delete/" + amc_id)
      .then(alert("AMC Registration Details has been delete!"))

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
          Header: "Install Reference No",
          accessor: "installrefno"
        },
        {
          Header: "Install Date",
          accessor: "installdate"
        },
        {
          Header: "serial No",
          accessor: "serialno",
          columns: [{
            expander: true,
            width: 65,
            accessor: "products",
            Expander: ({isExpanded}) =>
              <div>
                {isExpanded
                  ? <span>&uarr;</span>
                  : <span>&darr;</span>}
              </div>,
            style: {
              width: "200px",
              cursor: "pointer",
              fontSize: 25,
              padding: "0",
              textAlign: "center",
              userSelect: "none"
            }
        }]
        },
        {
          Header: "Installed by",
          accessor: "installedby.name"
        },
        {
          Header: "Customer",
          accessor: "customer.customername"
        },
        {
          Header: "customer Type",
          accessor: "customertype.customertype"
        },
        {
          Header: "Department",
          accessor: "department.department"
        },
        {
          Header: "Contact Person",
          accessor: "contactperson"
        },
        {
          Header: "Contact No",
          accessor: "contactno",
        },
        {
          Header: "Address",
          accessor: "address"
        },
           {
          Header: "Remark",
          accessor: "remarks"
        },
        {
          Header: "Document",
          Cell: props => {
          return (
            <div>
              {console.log(props.original.filename)}
            <a href={"http://localhost:3000/install/docs/" + props.original.filename} target = "_blank">View/Download</a>
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
                    this.deleteRow(props.original._id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash" />
                </button>
                <Link
                  to={"/api/installation/edit/" + props.original._id}
                  className="btn btn-primary ml-1"
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
                <Link
                  to={"/api/installation/print/" + props.original._id}
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
        <h3 className="text-center mt-5">Existing Installation List</h3>
        <br />
        <Link to="/api/installation/add" className="btn btn-success">
          Add New Installation
        </Link>
        <Link
          to="/api/installation/printpage"
          className="btn btn-info ml-5"
        >
          Preview
        </Link>
        <ReactTable
          columns={columns}
          data={installation}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 text-center"
          SubComponent={
        (v) => {
 let newArray = []
           v.original.productdetails.map(a1 =>{
            let tempa1 = [a1.proregtn];
            tempa1.map(a2 => {
              console.log(a1.newserialno)
              a2.products.map(a3 => {
                console.log(a3.serialno)
                if(a1.newserialno === a3.serialno){
                  
                  let obj = {
                    oem: (Object.entries(a3.oem)[1].slice(1))[0],
                    cat: (Object.entries(a3.category)[1].slice(1))[0],
                    subcat: (Object.entries(a3.subcategory)[1].slice(1))[0],
                    modelno: a3.modelno,
                    serialno: a3.serialno
                  }
                  newArray.push(obj)

                }
              })
            })
          })
          const rows = newArray.map(newMap => {
                   return ( <tr>
                      <td>{newMap.oem}</td>
                      <td>{newMap.cat}</td>
                      <td>{newMap.subcat}</td>
                      <td>{newMap.modelno}</td>
                      <td>{newMap.serialno}</td>
                    </tr>)
          })
          console.log(newArray)
              return(

                    <div>
                    <table className = "table table-bordered">
                      <thead style={{backgroundColor: "#d8d8d8"}}>
                      <tr>
                      <td>Company</td><td>Product Category</td><td>Product Sub Category</td><td>Model No</td><td>Serial No</td>
                      </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                    </table>
                    </div>
                    )
              }
          }  
          >
          {(state, filterData, instance) => {
            this.reactTable = state.pageRows.map(amcRegistration => {
              return amcRegistration._original;
            });
            return (
              <div>
                {filterData()}
              </div>
            );
          }}
        </ReactTable>
      </div>
         );
    }
}
 
export default ExistInstall;