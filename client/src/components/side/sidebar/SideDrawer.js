import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../css/SideDrawer.css";

import Entries from "../DropDownMenu/Entries/entries";
import Master from "../DropDownMenu/Master/master";
import Report from "../DropDownMenu/Report/report";
import Setting from "../DropDownMenu/Setting/setting";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Home</div>,
    main: () => <h1>Home</h1>
  },
  //master routes
  {
    path: "/master",
    exact: true,
    sidebar: () => <div>Master</div>,
    //Put components out here
    main: () => <h1>Master</h1>
  },
  {
    path: "/master/company",
    exact: true,
    sidebar: () => <div>Company</div>,
    //Put components out here
    main: () => (
      <div>
        <h1>Compnay</h1>
      </div>
    )
  },
  {
    path: "/master/product",
    exact: true,
    sidebar: () => <div>Product</div>,
    //Put components out here
    main: () => <h1>Product</h1>
  },
  {
    path: "/master/customer",
    exact: true,
    sidebar: () => <div>Customer</div>,
    //Put components out here
    main: () => <h1>Customer</h1>
  },
  {
    path: "/master/service",
    exact: true,
    sidebar: () => <div>Service</div>,
    //Put components out here
    main: () => <h1>Service</h1>
  },
  {
    path: "/master/customersubdepartment",
    exact: true,
    sidebar: () => <div>Customer Sub Department</div>,
    //Put components out here
    main: () => <h1>Customer Sub Department</h1>
  },
  //entries route
  {
    path: "/entries",
    exact: true,
    sidebar: () => <div>Entries</div>,
    main: () => <h1>Entries</h1>
  },
  {
    path: "/entries/AMCRegistrationDetails",
    exact: true,
    sidebar: () => <div>AMC REGISTRATION DETAILS</div>,
    main: () => <h1>AMC REGISTRATION DETAILS</h1>
  },
  {
    path: "/entries/AMCRenewal",
    exact: true,
    sidebar: () => <div>AMC Renewal</div>,
    main: () => <h1>AMC Renewal</h1>
  },
  {
    path: "/entries/complaints",
    exact: true,
    sidebar: () => <div>Complaints</div>,
    main: () => <h1>Complaints</h1>
  },
  {
    path: "/entries/complaintsstatus",
    exact: true,
    sidebar: () => <div>Complaints Status</div>,
    main: () => <h1>Complaints Status</h1>
  },
  {
    path: "/entries/dailyupdate",
    exact: true,
    sidebar: () => <div>Daily Update</div>,
    main: () => <h1>Daily Update</h1>
  },
  {
    path: "/entries/installationdetails",
    exact: true,
    sidebar: () => <div>Installation Details</div>,
    main: () => <h1>Installation Details</h1>
  },
  {
    path: "/entries/productverification",
    exact: true,
    sidebar: () => <div>Product Verification</div>,
    main: () => <h1>Product Verification</h1>
  },
  {
    path: "/entries/productregistration",
    exact: true,
    sidebar: () => <div>Product Registration</div>,
    main: () => <h1>Product Registration</h1>
  },
  //report routes
  {
    path: "/report",
    exact: true,
    sidebar: () => <div>Report</div>,
    main: () => <h1>Report</h1>
  },
  {
    path: "/report/amclistproduct",
    exact: true,
    sidebar: () => <div>AMC List Product</div>,
    main: () => <h1>AMC List Product</h1>
  },
  {
    path: "/report/calllog",
    exact: true,
    sidebar: () => <div>Call Log</div>,
    main: () => <h1>Call Log</h1>
  },
  {
    path: "/report/complaintsdetails",
    exact: true,
    sidebar: () => <div>Complaints Details</div>,
    main: () => <h1>Complaints Details</h1>
  },
  {
    path: "/report/dailyupdates",
    exact: true,
    sidebar: () => <div>Daily Updates</div>,
    main: () => <h1>Daily Updates</h1>
  },
  {
    path: "/report/expiredwarrantyproduct",
    exact: true,
    sidebar: () => <div>Expired Warranty Product</div>,
    main: () => <h1>Expired Warranty Product</h1>
  },
  {
    path: "/report/amclistexpired",
    exact: true,
    sidebar: () => <div>AMC List Expired</div>,
    main: () => <h1>AMC List Expired</h1>
  },
  {
    path: "/report/listgivenforservicing",
    exact: true,
    sidebar: () => <div>List Given For Servicing</div>,
    main: () => <h1>List Given For Servicing</h1>
  },
  {
    path: "/report/listreceivefromservicing",
    exact: true,
    sidebar: () => <div>List Receive From Servicing</div>,
    main: () => <h1>List Receive From Servicing</h1>
  },
  {
    path: "/report/listwarrantyproduct",
    exact: true,
    sidebar: () => <div>List Warranty Product</div>,
    main: () => <h1>List Warranty Product</h1>
  },
  {
    path: "/report/productlist",
    exact: true,
    sidebar: () => <div>Product List</div>,
    main: () => <h1>Product List</h1>
  },
  {
    path: "/report/servicehistory",
    exact: true,
    sidebar: () => <div>Service History</div>,
    main: () => <h1>Service History</h1>
  },
  //setting routes
  {
    path: "/setting",
    exact: true,
    sidebar: () => <div>Setting</div>,
    main: () => <h1>Setting</h1>
  },
  {
    path: "/setting/calltype",
    exact: true,
    sidebar: () => <div>Call Type</div>,
    main: () => <h1>Call Type</h1>
  },
  {
    path: "/setting/customertype",
    exact: true,
    sidebar: () => <div>Customer Type</div>,
    main: () => <h1>Customer Type</h1>
  },
  {
    path: "/setting/designation",
    exact: true,
    sidebar: () => <div>Designation</div>,
    main: () => <h1>Designation</h1>
  },
  {
    path: "/setting/headerinfo",
    exact: true,
    sidebar: () => <div>Header Info</div>,
    main: () => <h1>Header Info</h1>
  },
  {
    path: "/setting/itemcategory",
    exact: true,
    sidebar: () => <div>Item Category</div>,
    main: () => <h1>Item Category</h1>
  },
  {
    path: "/setting/itemsubcategory",
    exact: true,
    sidebar: () => <div>Item Sub Category</div>,
    main: () => <h1>Item Sub Category</h1>
  },
  {
    path: "/setting/serviceprovider",
    exact: true,
    sidebar: () => <div>Service Provider</div>,
    main: () => <h1>Service Provider</h1>
  },
  {
    path: "/setting/speciality",
    exact: true,
    sidebar: () => <div>Speciality</div>,
    main: () => <h1>Speciality</h1>
  }
];

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <Router>
      <div
        style={{ left: "0", padding: "0", display: "flex" }}
        className={drawerClasses}
      >
        <div
          style={{
            padding: "10px",
            width: "15%",
            background: "#2f4f4f",
            color: "white",
            height: "100%"
          }}
        >
          <ul style={{ color: "white", padding: "0", listStyleType: "none" }}>
            <li>
              <i className="far fa-building" /> <Link to="/master">Master</Link>
              <ul
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  listStyleType: "none"
                }}
              >
                <li>
                  <Link to="/master/company">Company</Link>
                </li>
                <li>
                  <Link to="/master/product">Product</Link>
                </li>
                <li>
                  <Link to="/master/customer">Customer</Link>
                </li>
                <li>
                  <Link to="/master/service">Service</Link>
                </li>
                <li>
                  <Link to="/master/customersubdepartment">
                    Customer Sub Department
                  </Link>
                </li>
              </ul>
              <hr />
            </li>

            <li>
              <i className="fas fa-bullseye" />{" "}
              <Link to="/entries">Entries</Link>
              <ul
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  listStyleType: "none"
                }}
              >
                <li>
                  <Link to="/entries/AMCRegistrationDetails">
                    AMC REGISTRATION DETAILS
                  </Link>
                </li>
                <li>
                  <Link to="/entries/AMCRenewal">AMC RENEWAL</Link>
                </li>
                <li>
                  <Link to="/entries/complaints">COMPLAINTS</Link>
                </li>
                <li>
                  <Link to="/entries/complaintsstatus">COMPLAINTS STATUS</Link>
                </li>
                <li>
                  <Link to="/entries/dailyupdate">DAILY UPDATE</Link>
                </li>
                <li>
                  <Link to="/entries/installationdetails">
                    INSTALLATION DETAILS
                  </Link>
                </li>
                <li>
                  <Link to="/entries/productverification">
                    PRODUCT VERIFICATION
                  </Link>
                </li>
                <li>
                  <Link to="/entries/productregistration">
                    PRODUCT REGISTRATION
                  </Link>
                </li>
              </ul>
              <hr />
            </li>
            <li>
              <Link to="/report">Report</Link>
              <ul
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  listStyleType: "none"
                }}
              >
                <li>
                  <Link to="/report/amclistproduct">AMC LIST PRODUCT</Link>
                </li>
                <li>
                  <Link to="/report/calllog">CALL LOG</Link>
                </li>
                <li>
                  <Link to="/report/complaintsdetails">COMPLAINT DETAILS</Link>
                </li>
                <li>
                  <Link to="/report/dailyupdates">DAILYUPDATES</Link>
                </li>
                <li>
                  <Link to="/report/expiredwarrantyproduct">
                    EXPIRED WARRANTY PRODUCT
                  </Link>
                </li>
                <li>
                  <Link to="/report/amclistexpired">AMCLIST EXPIRED</Link>
                </li>
                <li>
                  <Link to="/report/listgivenforservicing">
                    LIST GIVEN FOR SERVICING
                  </Link>
                </li>
                <li>
                  <Link to="/report/listreceivefromservicing">
                    LIST RECEIVED FROM SERVICING
                  </Link>
                </li>
                <li>
                  <Link to="/report/listwarrantyproduct">
                    LIST WARRANTY PRODUCT
                  </Link>
                </li>
                <li>
                  <Link to="/report/productlist">PRODUC LIST</Link>
                </li>
                <li>
                  <Link to="/report/servicehistory">SERVICE HITORY</Link>
                </li>
              </ul>
              <hr />
            </li>
            <li>
              <i className="fas fa-cogs" /> <Link to="/setting">Setting</Link>
              <ul
                style={{
                  color: "white",
                  paddingLeft: "20px",
                  listStyleType: "none"
                }}
              >
                <li>
                  <Link to="/setting/calltype">CALL TYPE</Link>
                </li>
                <li>
                  <Link to="/setting/customertype">CUSTOMER TYPE</Link>
                </li>
                <li>
                  <Link to="/setting/designation">DESIGNATION</Link>
                </li>
                <li>
                  <Link to="/setting/headerinfo">HEADER INFO</Link>
                </li>
                <li>
                  <Link to="/setting/itemcategory">ITEM CATEGORY</Link>
                </li>
                <li>
                  <Link to="/setting/itemsubcategory">ITEM SUB CATEGORY</Link>
                </li>
                <li>
                  <Link to="/setting/serviceprovider">SERVICE PROVIDER</Link>
                </li>
                <li>
                  <Link to="/setting/speciality">SPECIALITY</Link>
                </li>
              </ul>
              <hr />
            </li>
          </ul>
        </div>
        <div style={{ color: "black", flex: "1", padding: "10px" }}>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
};
export default SideDrawer;
