import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import TableRow from './tableRow';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ExistAmcRenw extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amcRenewal: []
         }
    }
    componentDidMount() {
        axios
          .get("http://localhost:4000/api/amcrenewal")
          .then(response => {
            this.setState({ amcRenewal: response.data });
            console.log(response.data)
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }


      deleteRow(id){
         axios
            .delete('http://localhost:4000/api/amcrenewal/delete/' + id)
            .then(console.log('Deleted'))
            .catch((err) => console.log(err));    
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
          Header: "Amc Renewal Number",
          accessor: "amcrenewno"
        },
        {
          Header: "Amc Renewal Date",
          accessor: "amcrenewaldate"
        },
        {
          Header: "customer",
          accessor: "arncustomer.customername",
        },
        {
          Header: "Product Details",
          columns: [{
            expander: true,
            width: 65,
            accessor: "Products",
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
          Header: "Customer Type",
          accessor: "arncustomertype.customertype"
        },
        {
          Header: "Department",
          accessor: "arndepartment.department"
        },
        {
          Header: "Service Provider",
          accessor: "arnserviceprovider.providername"
        },
        {
          Header: "Start Date",
          accessor: "arnstartdate"
        },
        {
          Header: "End Date",
          accessor: "arnexpiredate"
        },
        {
          Header: "Remarks",
          accessor: "arnremarks",
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
                  to={"/api/amcrenewal/edit/" + props.original._id}
                  className="btn btn-primary ml-1"
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
                <Link
                  to={"/api/amcrenewal/print/" + props.original._id}
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
        <h3 className="text-center mt-5">Existing AMC Renewal List</h3>
        <br />
        <Link to="/api/amcrenewal/add" className="btn btn-success">
          Add New AMC Renewal
        </Link>
        <Link
          to="/api/amcrenewal/printpage"
          className="btn btn-info ml-5"
        >
          Preview
        </Link>
        <ReactTable
          columns={columns}
          data={this.state.amcRenewal}
          filterable
          defaultPageSize={5}
          showPaginationBottom
          noDataText={"Please Enter Data.."}
          className="mt-4 text-center"
          SubComponent={
        (v) => {
 let newArray = []

          v.original.multpleamcandref.map(a1 =>{
             let tempa1 = [a1.amcrefno]
              tempa1.map(a2 => {
                a2.products.map(a3 => {
                  if(a1.arnserialno === a3.serialno){

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
          console.log(newArray)
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
 
export default ExistAmcRenw;