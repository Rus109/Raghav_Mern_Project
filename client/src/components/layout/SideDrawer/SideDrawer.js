import React, { Component } from "react";
import { Link } from "react-router-dom";
import header from "./logo_main.png";
import "../../css/SideDrawer.css";

class SideDrawer extends Component {
  constructor() {
    super();

    this.state = {
      showMaster: false,
      showSetting: false,
      hover: false
    };

    this.showMaster = this.showMaster.bind(this);
    this.closeMaster = this.closeMaster.bind(this);
    this.showEntries = this.showEntries.bind(this);
    this.closeEntries = this.closeEntries.bind(this);
    this.showReport = this.showReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
    this.showSetting = this.showSetting.bind(this);
    this.closeSetting = this.closeSetting.bind(this);
    // this.hoverOn = this.hoverOn.bind(this);
    // this.hoverOff = this.hoverOff.bind(this);
  }

  // hoverOn = function() {
  //   this.setState({ hover: true });
  // };
  // hoverOff() {
  //   this.setState({ hover: false });
  // }

  showMaster(event) {
    event.preventDefault();
    this.setState({ showMaster: true }, () => {
      document.addEventListener("click", this.closeMaster);
    });
  }

  closeMaster() {
    this.setState({ showMaster: false }, () => {
      document.removeEventListener("click", this.closeMaster);
    });
  }

  showEntries(event) {
    event.preventDefault();
    this.setState({ showEntries: true }, () => {
      document.addEventListener("click", this.closeEntries);
    });
  }

  closeEntries() {
    this.setState({ showEntries: false }, () => {
      document.removeEventListener("click", this.closeEntries);
    });
  }

  showSetting(event) {
    event.preventDefault();

    this.setState({ showSetting: true }, () => {
      document.addEventListener("click", this.closeSetting);
    });
  }
  closeSetting() {
    this.setState({ showSetting: false }, () => {
      document.removeEventListener("click", this.closeSetting);
    });
  }

  showReport(event) {
    event.preventDefault();

    this.setState({ showReport: true }, () => {
      document.addEventListener("click", this.closeReport);
    });
  }
  closeReport() {
    this.setState({ showReport: false }, () => {
      document.removeEventListener("click", this.closeReport);
    });
  }

  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <div className={drawerClasses}>
      <img style={{padding: "10px 110px"}} src={header} alt="Header" className="mt-3"/>
      <h4 className="text-center text-white">Nice Infotech</h4>
        <hr/>
        <ul style={{ marginTop: "1.5rem" }}>
          <li>
            <p className="names" onClick={this.showMaster}>
              <i className="far fa-building" />
              <span style={{ padding: "27px" }}>Master</span>
            </p>
            {this.state.showMaster ? (
              <ul className="menu">
                <li>
                  <Link to="/api/company" id="link">
                    Company
                  </Link>
                </li>
                <li>
                  <Link to="/api/customer" id="link">
                    Customer
                  </Link>
                </li>
                <li>
                  <Link to="/api/customersubdepartment" id="link">
                    Customer Sub Department
                  </Link>
                </li>
                <li>
                  <Link to="/api/employees" id="link">
                    Employees
                  </Link>
                </li>
                <li>
                  <Link to="/api/product" id="link">
                    Product
                  </Link>
                </li>
                <li>
                  <Link to="/api/servicecenter" id="link">
                    Service Center
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>

          {/**ENTRIES */}
          <li>
            <p className="names" style={{marginTop: "2rem"}} onClick={this.showEntries}>
              <i className="fas fa-fax" />
              <span style={{ padding: "25px" }}>Entries</span>
            </p>
            {this.state.showEntries ? (
              <ul className="menu">
                <li>
                  <Link to="/api/amcregistration"
                  id="link">
                    AMC Registration
                  </Link>
                </li>
                <li>
                  <Link to="/api/amcrenewal"
                  id="link">
                    AMC Renewal
                  </Link>
                </li>
                <li>
                  <Link to="/api/complaint" id="link">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link to="/api/productregistration"
                  id="link">
                    Product Registration
                  </Link>
                </li>
                <li>
                  <Link to="/api/installation" id="link">
                    Installation
                  </Link>
                </li>
                <li>
                  <Link to="/api/productverification"
                  id="link">
                    Product Verification
                  </Link>
                </li>
                <li>
                  <Link to="/api/complaintstatus" id="link">
                    Complaint Status
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>

          {/**Reports */}
          <li>
            <p className="names" style={{marginTop: "2rem"}} onClick={this.showReport}>
              <i className="fas fa-table" />{" "}
              <span style={{ padding: "20px" }}>Report</span>
            </p>
            {this.state.showReport ? (
              <ul className="menu">
                <li>
                  <Link to="/api/complaint" id="link">
                    Call Log
                  </Link>
                </li>
                <li>
                  <Link to="/api/productverification" id="link">
                    Product List
                  </Link>
                </li>
                <li>
                  <Link to="/api/amcregistration" id="link">
                    List AMC
                  </Link>
                </li>
                <li>
                  <Link to="/api/amcregistration" id="link">
                    List AMC Expired
                  </Link>
                </li>
                <li>
                  <Link to="/api/warranty" id="link">
                    List Warranty
                  </Link>
                </li>
                <li>
                  <Link to="/api/warranty" id="link">
                    List Warranty Expired
                  </Link>
                </li>
                <li>
                  <Link to="/api/" id="link">
                    List Given for Servicing
                  </Link>
                </li>
                <li>
                  <Link to="/api/" id="link">
                    List Given for Servicing
                  </Link>
                </li>
                <li>
                  <Link to="/api/" id="link">
                    Service History
                  </Link>
                </li>
                <li>
                  <Link to="/api/" id="link">
                    Complaints Details
                  </Link>
                </li>
                <li>
                  <Link to="/api/" id="link">
                    Daily Updates
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>

          {/**SETTINGS */}
          <li>
            <p className="names" style={{marginTop: "2rem"}} onClick={this.showSetting}>
              <i className="fas fa-cogs" />
              <span style={{ padding: "20px" }}>Setting</span>
            </p>
            {this.state.showSetting ? (
              <ul className="menu">
                <li>
                  <Link to="/api/calltype" id="link">
                    Call Type
                  </Link>
                </li>
                <li>
                  <Link to="/api/customertype" id="link">
                    Customer Type
                  </Link>
                </li>
                <li>
                  <Link to="/api/designation" id="link">
                    Designation
                  </Link>
                </li>
                <li>
                  <Link to="/api/productcategory" id="link">
                    Product Category
                  </Link>
                </li>
                <li>
                  <Link to="/api/productsubcategory" id="link">
                    Product Sub Category
                  </Link>
                </li>
                <li>
                  <Link to="/api/speciality" id="link">
                    Speciality
                  </Link>
                </li>
                <li>
                  <Link to="/api/serviceprovider" id="link">
                    Service Provider
                  </Link>
                </li>
                <li>
                  <Link to="/api/headerinfo" id="link">
                    Header Info
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      <footer>
      <hr/>
      <ul className="social">
      <li>
        <a
          href="https://www.facebook.com/pages/category/Local-Business/Nice-Infotech-Shillong-Meghalaya-1468115840092352/"
          className="icons-sm fb-ic"
        >
          <i className="fab fa-facebook-square fa-lg" id="icon">
            {" "}
          </i>
        </a>
      </li>
      <li>
        <a href="http://niceinfotech.co/" className="icons-sm pin-ic">
          <i className="fas fa-globe fa-lg" id="icon">
            {" "}
          </i>
        </a>
      </li>
      <li>
        <a
          href="http://niceinfotech.co/about1.html"
          className="icons-sm gplus-ic"
        >
          <i className="fa fa-info fa-lg" id="icon">
            {" "}
          </i>
        </a>
      </li>
      <li>
        <a
          href="https://in.linkedin.com/in/panna-sinha-4196a610b"
          className="icons-sm tw-ic"
        >
          <i className="fab fa-linkedin fa-lg" id="icon">
            {" "}
          </i>
        </a>
      </li>
    </ul>

      </footer>
       
      </div>
    );
  }
}
export default SideDrawer;
