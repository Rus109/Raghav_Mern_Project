import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";

let amcRegistration = [];

class ExistAmcRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
          productsData: [] 
        }
    }

    componentDidMount() {
        axios
          .get("http://localhost:4000/api/amcregistration")
          .then(response => {
            
            amcRegistration = response.data
            this.setState({ amcRegistration: response.data })
          })
          .catch(function(error) {
            console.log(error);
          });

    }

    // componentDidUpdate() {
    //   this.UpdateDate();
    // }

    UpdateData(){
      axios
      .get("http://localhost:4000/api/amcregistration")
      .then(response => {
        this.setState({ amcRegistration: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    
      deleteRow(_id) {
      const amc_id = _id;
      axios
      .delete("http://localhost:4000/api/amcregistration/delete/" + amc_id)
      .then(alert("AMC Registration Details has been delete!"))

      window.location.reload();
      }

    render() { 

      let test = "123";
      
      const hello = () => {
        alert("this")
      }
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
          Header: "AMC Reference No",
          accessor: "amcrefno"
        },
        {
          Header: "AMC Reference Date",
          accessor: "amcregdate"
        },
        {
          Header: "Customer",
          accessor: "customer.customername",
          sortable: false,
          filterable: false,
          style: {
            padding: "10px"
          }
        },
        {
          Header: "Customer Type",
          accessor: "customertype.customertype"
        },
        {
          Header: "Department",
          accessor: "department.department"
        },
        {
          Header: "Service Provider",
          accessor: "serviceprovider.serviceprovider"
        },
        {
          Header: "AMC Start Date",
          accessor: "amcstartdate"
        },
        {
          Header: "AMC Expire Date",
          accessor: "amcexpiredate"
        },
        {
          Header: "Product ref No",
          accressor: "products",
          columns: [{
            expander: true,
            width: 65,
            accressor: "products",
            Expander: ({isExpanded}) =>
              <div>
                {isExpanded
                  ? <span>&uarr;</span>
                  : <span>&darr;</span>}
              </div>,
            style: {
              width: 200,
              cursor: "pointer",
              fontSize: 25,
              padding: "0",
              textAlign: "center",
              userSelect: "none"
            }
        }]
      },
        {
          Header: "Remark",
          accessor: "remarks"
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
                  to={"/api/amcregistration/edit/" + props.original._id}
                  className="btn btn-primary ml-1"
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
                <Link
                  to={"/api/amcregistration/print/" + props.original._id}
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
let amcReg = amcRegistration;
let productsAccordingToRow = [];

      for (var i = 0; i < amcRegistration.length; i++){
          productsAccordingToRow.push(amcReg[i].products)
          console.log(productsAccordingToRow[0][0]._id)

         for(var j; j < productsAccordingToRow[0].length; j++){
            test = "<tr><td>" + productsAccordingToRow[0][j]._id + "</td></tr>"
         }
      }
      console.log(productsAccordingToRow)

      return ( 
      <div>
        <h3 className="text-center mt-5">Existing AMC List</h3>
        <br />
        <Link to="/api/amcregistration/add" className="btn btn-success">
          Add New AMC
        </Link>
        <Link
          to="/api/amcregistration/printpage"
          className="btn btn-info ml-5"
        >
          Preview
        </Link>
        <ReactTable
          columns={columns}
          data={amcRegistration}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 text-center"
          SubComponent={
        (v) => {
          const rows = v.original.products.map(a1 => 
             (<tr>
               <td>{Object.entries(a1.oem)[1].slice(1)}</td>
               <td>{Object.entries(a1.category)[1].slice(1)}</td>
               <td>{Object.entries(a1.subcategory)[1].slice(1)}</td>
               <td>{a1.modelno}</td>
               <td>{a1.serialno}</td></tr>)
             )
          return(
          <div>
          <table className = "table table-bordered">
            <tr>
            <td>Company</td><td>Product Category</td><td>Product Sub Category</td><td>Model No</td><td>Serial No</td>
            </tr>
          {rows}
          </table>
          </div>
          )}
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
 
export default ExistAmcRegistration;