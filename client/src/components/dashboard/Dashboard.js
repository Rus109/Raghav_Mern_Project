import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
//import ProfileActions from "./ProfileActions";
// import Experience from "./Experience";
// import Education from "./Education";
import "../css/Dashboard.css";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: [],
      customer: []
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();

    axios
      .get("http://localhost:4000/api/company")
      .then(response => {
        this.setState({ company: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

      
    axios
    .get("http://localhost:4000/api/customer")
    .then(response => {
      this.setState({ customer: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
         <div>
           <h2 className="mt-3">Dashboard</h2>
           <Link to="/" className="text-dark">Home</Link> /{ " " }
           <Link to="/" className="text-dark">Dashboard</Link>
           <h4 className="mt-4">Master</h4>  
          <div className="flex"> 
          <div className="border pl-3 pr-3 mt-3">
          <p className="mt-3">Company</p>
          <hr/>
          <p>Number of companies:</p>
             <p>{this.state.company.length}</p>
          </div>
          <div className="bordercust pl-3 pr-3 mt-3 ml-4">
          <p className="mt-3">Customer</p>
          <hr/>
          <p>Number of customers:</p>
             <p>{this.state.customer.length}</p>
          </div>
          <div className="bordercust pl-3 pr-3 mt-3 ml-4">
          <p className="mt-3">Customer</p>
          <hr/>
          <p>Number of customers:</p>
             <p>{this.state.customer.length}</p>
          </div> 
          <div className="bordercust pl-3 pr-3 mt-3 ml-4">
          <p className="mt-3">Customer</p>
          <hr/>
          <p>Number of customers:</p>
             <p>{this.state.customer.length}</p>
          </div>
          </div>
           </div>
    
       

        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount}
)(Dashboard);
