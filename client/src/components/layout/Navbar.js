import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import ToggleButton from "./SideDrawer/ToggleButton";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./SideDrawer/Backdrop";
import Search from "./Search";
import "../css/Navbar.css";

class Navbar extends Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () => {
    this.setState({ sideDrawerOpen: !this.state.sideDrawerOpen });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  linkClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    console.log(this.props.logoutUser);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    const authLinks = (
      <ul className="navbar-nav">
        <li className="nav-item" id="button">
          <ToggleButton drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
        </li>

        <li className="nav-item">
          <Link className="navbar-brand" to="/" id="links">
            <h3 style={{ fontWeight: "bold" }}>Nice Infotech</h3>
          </Link>
        </li>
        <li />
        <li className="nav-item">
          <Link className="nav-link" to="/profiles" id="links">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed" id="links">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" id="links">
            Dashboard
          </Link>
        </li>
        <li className="nav-item" id="links">
          <Search />
        </li>
        <li className="nav-item" align="right">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
            id="links"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", paddingleft: "10%" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="navbar-brand" to="/" id="logoname">
            Nice Infotech
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles" id="links">
            {" "}
            Users
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register" id="links">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" id="links">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-4">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
