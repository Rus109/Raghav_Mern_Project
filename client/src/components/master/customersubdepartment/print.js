import React, { Component } from 'react';
import axios from "axios";
import Logo from '../../common/logo';
import {Link} from "react-router-dom";


class printCSD extends Component {
  constructor(props){
    super(props);
    this.state = {
      department: "",
      customer: [],
      cstrid: "",
      description: "",    
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/customersubdepartment/edit/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          department: response.data.department,
          cstrid:  Object.entries(response.data.customer)[1].slice(1),
          description: response.data.description
        });
        console.log(Object.entries(response.data.customer)[1].slice(1))
      });

    axios
      .get("http://localhost:4000/api/customer")
      .then(response => {
        this.setState({ customer: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onPrint = e => {
    e.preventDefault();
    document.getElementById("hide").style.visibility = "hidden";
    window.print();    
    document.getElementById("hide").style.visibility = "visible";
  };

  
  render() {
    return (
      <div>
      <button className="btn btn-success mt-5 mb-4" onClick={this.onPrint}>
 Print
</button>
    <Link
              to="/api/customersubdepartment"
              className="btn btn-dark mt-4 ml-4"
              id="hide"
            >
              Back to List
            </Link>
            <div className="mb-4 mt-4" style={{border: "2px solid black", marginTop: "4%"}}> 
   <Logo/>
   <h3 className="text-center mt-3 mb-4">Customer Sub Department Details</h3>
   <div className="mt-5" style={{paddingLeft:"25%", fontSize: "14px"}}>
   <div className="row">
  <div className="col-4" style={{fontWeight: "bold"}}><p>Department:</p></div>
  <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.department}</div>
   </div>
   <br/>
   <div className="row">
   <div className="col-4" style={{fontWeight: "bold"}}><p>Customer:</p></div>
   <div style={{border: "1px solid black", padding: "5px", width: "200px"}}>{this.state.cstrid}</div>
    </div>
    <br/>
   <div className="row">
   <div className="col-4" style={{fontWeight: "bold"}}>
   <p>Description:</p>
   </div>
   <div style={{border: "1px solid black", padding: "5px",  width: "300px"}}>{this.state.description}</div>
   </div>
   <br/>
 
   </div>
   <p className="text-center">Copyright &copy; {new Date().getFullYear()} Nice Infotech</p>
   
      </div>
      </div>
    )
  }
}

export default printCSD;