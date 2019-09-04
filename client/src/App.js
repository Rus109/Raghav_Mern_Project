import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
//import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";
import "./App.css";

//Master Route
//Company
import ExistingCompany from "./components/master/company/existingListCompany";
import CreateCompany from "./components/master/company/createCompany";
import EditCompany from "./components/master/company/editCompany";
import PrintCompany from "./components/master/company/print";
import PrintCompanyPage from "./components/master/company/printwhole";
//Customer
import ExistingListCustomer from "./components/master/customer/existingListCustomer";
import CreateCustomer from "./components/master/customer/createCustomer";
import EditCustomer from "./components/master/customer/editCustomer";
import PrintCustomer from "./components/master/customer/print";
import PrintWholeCustomer from "./components/master/customer/printwhole";
//Customer Sub Department
import ExistingListCustomerSD from "./components/master/customersubdepartment/existingListCustomerSubDepartment";
import CreateCustomerSD from "./components/master/customersubdepartment/createCustomerSubDepartment";
import EditCustomerSD from "./components/master/customersubdepartment/editCustomerSubDepartment";
import PrintCSD from "./components/master/customersubdepartment/print";
import PrintWholeCSD from "./components/master/customersubdepartment/printwhole";
//Service
import ExistingListService from "./components/master/service/existingListService";
import CreateService from "./components/master/service/createService";
import EditService from "./components/master/service/editService";
import PrintService from "./components/master/service/print";
import PrintWholeService from "./components/master/service/printwhole";
//Employees
import ExistingListEmployee from "./components/master/employees/existingListEmployees";
import CreateEmployee from "./components/master/employees/createEmployees";
import EditEmployee from "./components/master/employees/editEmployees";
import PrintEmployee from "./components/master/employees/print";
import PrintWholeEmployee from "./components/master/employees/printwhole";
//Product
import ExistingListProduct from "./components/master/product/existingListProduct";
import CreateProduct from "./components/master/product/createProduct";
import EditProduct from "./components/master/product/editProduct";
import PrintProduct from "./components/master/product/print";
import PrintWholeProduct from "./components/master/product/printwhole";

//Setting Component
//Call Type
import ExistingListCallType from "./components/settings/calltype/existCallType";
import CreateCallType from "./components/settings/calltype/createCallType";
import EditCallType from "./components/settings/calltype/editCallType";
import PrintCallType from "./components/settings/calltype/print";
import PrintWholeCallType from "./components/settings/calltype/printwhole";
//Customer Type
import ExistingListCustomerType from "./components/settings/customertype/existCustomerType";
import CreateCustomerType from "./components/settings/customertype/createCustomerType";
import EditCustomerType from "./components/settings/customertype/editCustomerType";
import PrintCustomerType from "./components/settings/customertype/print";
import PrintWholeCustomerType from "./components/settings/customertype/printwhole";
//Designation
import ExistingDesignation from "./components/settings/designation/existDesignation";
import CreateDesignation from "./components/settings/designation/createDesignation";
import EditDesignation from "./components/settings/designation/editDesignation";
import PrintDesignation from "./components/settings/designation/print";
import PrintWholeDesignation from "./components/settings/designation/printwhole";
//Product Category
import ExistingProductCategory from "./components/settings/productcategory/existProductCategory";
import CreateProductCategory from "./components/settings/productcategory/createProductCategory";
import EditProductCategory from "./components/settings/productcategory/editProductCategory";
import PrintProductCategory from "./components/settings/productcategory/print";
import PrintWholeProductCategory from "./components/settings/productcategory/printwhole";
//Speciality
import ExistingSpeciality from "./components/settings/speciality/existSpeciality";
import CreateSpeciality from "./components/settings/speciality/createSpeciality";
import EditSpeciality from "./components/settings/speciality/editSpeciality";
import PrintSpeciality from "./components/settings/speciality/print";
import PrintWholeSpeciality from "./components/settings/speciality/printwhole";
//Product Sub Category
import ExistingProductSubCategory from "./components/settings/productsubcategory/existProductSubCategory";
import CreateProductSubCategory from "./components/settings/productsubcategory/createProductSubCategory";
import EditProductSubCategory from "./components/settings/productsubcategory/editProductSubCategory";
import PrintProductSubCategory from "./components/settings/productsubcategory/print";
import PrintWholeProductSubCategory from "./components/settings/productsubcategory/printwhole";
//Service Provider
import ExistingServiceProvider from "./components/settings/serviceprovider/existServiceProvider";
import CreateServiceProvider from "./components/settings/serviceprovider/createServiceProvider";
import EditServiceProvider from "./components/settings/serviceprovider/editServiceProvider";
import PrintServiceProvider from "./components/settings/serviceprovider/print";
import PrintWholeServiceProvider from "./components/settings/serviceprovider/printwhole";
//Header Info
import HeaderInfo from "./components/settings/headerInfo/headerInfo";

//Entries Routes
import ExistProdReg from "./components/Entries/prodReg/existProdReg";
import CreateProdReg from "./components/Entries/prodReg/createProdReg";
import EditProdReg from "./components/Entries/prodReg/editProdReg";
import ExistAmcReg from "./components/Entries/amcReg/existAmcReg";
import CreateAmcReg from "./components/Entries/amcReg/createAmcReg";
import EditAmcReg from "./components/Entries/amcReg/editAmcReg";
import ExistInstall from "./components/Entries/installation/existInstall";
import CreateInstall from "./components/Entries/installation/createInstall";
import EditInstall from "./components/Entries/installation/editInstall";
// import ExistWarranty from "./components/Entries/warranty/existWarranty";
// import CreateWarranty from "./components/Entries/warranty/createWarranty";
// import EditWarranty from "./components/Entries/warranty/editWarranty";
import ExistAmcRenw from "./components/Entries/amcRenew/existAmcRenw";
import CreateAmcRenw from "./components/Entries/amcRenew/createAmcRenw";
import EditAmcRenw from "./components/Entries/amcRenew/editAmcRenw";
import ExistComplain from "./components/Entries/complaints/existComplaint";
import CreateComplain from "./components/Entries/complaints/createComplaint";
import EditComplain from "./components/Entries/complaints/editComplaint";
// import ExistProductVerification from "./components/Entries/prodVer/existProdVer";
import CreateProductVerification from "./components/Entries/prodVer/createProdVer";
// import EditProductVerification from "./components/Entries/prodVer/editProdVer";
import ComplaintStatus from './components/Entries/complaintStatus/complaintStatus';
import ComplaintStatusActive from './components/Entries/complaintStatus/complaintStatusActive';
import ComplaintStatusClosed from './components/Entries/complaintStatus/complaintStatusClosed';
import AssignAdd from "./components/Entries/complaintStatus/assign/assignadd";
import ComplaintNo from "./components/Entries/complaintStatus/complaintNo/complaintNo";
import BringIn from "./components/Entries/complaintStatus/bringIn/createBringIn";
import SendForServicing from "./components/Entries/complaintStatus/sendForServicing/createSendForservicing";
import RecieveFromServicing from "./components/Entries/complaintStatus/recievedFromServicing/createRecievedFromServicing";
import Deliver from "./components/Entries/complaintStatus/deliver/createDeliver";
import Closed from "./components/Entries/complaintStatus/closed/createClosed";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" style={{ height: "100%" }}>
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
              {/**!--------------------------------MasterRoutes------------------------------------!*/}
              {/**!------COMPANY-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/company"
                  component={ExistingCompany}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/api/company/add"
                  component={CreateCompany}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/company/edit/:id"
                  component={EditCompany}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/company/print/:id"
                  component={PrintCompany}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/company/printpage"
                  component={PrintCompanyPage}
                />
              </Switch>
              {/**!------CUSTOMER-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customer"
                  component={ExistingListCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customer/add"
                  component={CreateCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customer/edit/:id"
                  component={EditCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customer/print/:id"
                  component={PrintCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customer/printpage"
                  component={PrintWholeCustomer}
                />
              </Switch>
              {/**!------CUSTOMER_SUB_DEPARTMENT-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customersubdepartment"
                  component={ExistingListCustomerSD}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customersubdepartment/add"
                  component={CreateCustomerSD}
                />
              </Switch>
              <Switch>

                <PrivateRoute
                  exact
                  path="/api/customersubdepartment/edit/:id"
                  component={EditCustomerSD}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customersubdepartment/print/:id"
                  component={PrintCSD}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customersubdepartment/printpage"
                  component={PrintWholeCSD}
                />
              </Switch>
              {/**!------SERVICE_CENTER-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/servicecenter"
                  component={ExistingListService}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/servicecenter/add"
                  component={CreateService}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/servicecenter/edit/:id"
                  component={EditService}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/servicecenter/print/:id"
                  component={PrintService}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/servicecenter/printpage"
                  component={PrintWholeService}
                />
              </Switch>
              {/**!------EMPLOYEES-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/employees"
                  component={ExistingListEmployee}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/employees/add"
                  component={CreateEmployee}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/employees/edit/:id"
                  component={EditEmployee}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/employees/print/:id"
                  component={PrintEmployee}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/employees/printpage"
                  component={PrintWholeEmployee}
                />
              </Switch>
              {/**!------PRODUCT-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/product"
                  component={ExistingListProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/product/add"
                  component={CreateProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/product/edit/:id"
                  component={EditProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/product/print/:id"
                  component={PrintProduct}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/product/printpage"
                  component={PrintWholeProduct}
                />
              </Switch>
              {/**!--------------------------------EntriesRoutes------------------------------------!*/}
              {/**!------PRODUCT REGISTRATION-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productregistration"
                  component={ExistProdReg}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/proreg/add"
                  component={CreateProdReg}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/proreg/edit/:id"
                  component={EditProdReg}
                />
                
              </Switch>
              {/**!------AMC REGISTRATION-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcregistration"
                  component={ExistAmcReg}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcregistration/add"
                  component={CreateAmcReg}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcregistration/edit/:id"
                  component={EditAmcReg}
                />
              </Switch>
              {/**!------INSTALLATION-----!*/}
              {/**Testing Live Server */}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/installation"
                  component={ExistInstall}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/installation/add"
                  component={CreateInstall}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/installation/edit/:id"
                  component={EditInstall}
                />
              </Switch>
              {/**!------Complaint Status-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus"
                  component={ComplaintStatus}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/active"
                  component={ComplaintStatusActive}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/closed"
                  component={ComplaintStatusClosed}
                />
              </Switch>
                 {/**!------Complaint Status Assign-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/assign"
                  //You need to change to get assign
                  component={ComplaintStatus}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/assign/add/:id"
                  component={AssignAdd}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/closed"
                  component={ComplaintStatusClosed}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/bringin/:complaintid"
                  component={BringIn}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/complaintno/:complaintid"
                  component={ComplaintNo}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/sendforservicing/:complaintid"
                  component={SendForServicing}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/reciedfromservice/:complaintid"
                  component={RecieveFromServicing}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/deliver/:complaintid"
                  component={Deliver}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaintstatus/closed/:complaintid"
                  component={Closed}
                />
              </Switch>
              {/**!------AMC Renew-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcrenewal"
                  component={ExistAmcRenw}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcrenewal/add"
                  component={CreateAmcRenw}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/amcrenewal/edit/:id"
                  component={EditAmcRenw}
                />
              </Switch>
              {/**!------Complain-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaint"
                  component={ExistComplain}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaint/add"
                  component={CreateComplain}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/complaint/edit/:id"
                  component={EditComplain}
                />
              </Switch>
              {/**!------productverification-----!*/}
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/api/productverification"
                  component={ExistProductVerification}
                />
              </Switch> */}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productverification"
                  component={CreateProductVerification}
                />
              </Switch>
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/api/productverification/edit/:id"
                  component={EditProductVerification}
                />
              </Switch> */}
              {/**!--------------------------------SettingRoutes------------------------------------!*/}
              {/**!------CALLTYPE-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/calltype"
                  component={ExistingListCallType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/calltype/add"
                  component={CreateCallType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/calltype/edit/:id"
                  component={EditCallType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/calltype/print/:id"
                  component={PrintCallType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/calltype/printpage"
                  component={PrintWholeCallType}
                />
              </Switch>

              {/**!------CUSTOMERTYPE-----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customertype"
                  component={ExistingListCustomerType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customertype/add"
                  component={CreateCustomerType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customertype/edit/:id"
                  component={EditCustomerType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customertype/print/:id"
                  component={PrintCustomerType}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/customertype/printpage"
                  component={PrintWholeCustomerType}
                />
              </Switch>
              {/**!------DESIGNATION----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/designation"
                  component={ExistingDesignation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/designation/add"
                  component={CreateDesignation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/designation/edit/:id"
                  component={EditDesignation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/designation/print/:id"
                  component={PrintDesignation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/designation/printpage"
                  component={PrintWholeDesignation}
                />
              </Switch>
              {/**!------PRODUCT_CATEGORY----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productcategory"
                  component={ExistingProductCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productcategory/add"
                  component={CreateProductCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productcategory/edit/:id"
                  component={EditProductCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productcategory/print/:id"
                  component={PrintProductCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productcategory/printpage"
                  component={PrintWholeProductCategory}
                />
              </Switch>
              {/**!------PRODUCT_SUB_CATEGORY----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productsubcategory"
                  component={ExistingProductSubCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productsubcategory/add"
                  component={CreateProductSubCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productsubcategory/edit/:id"
                  component={EditProductSubCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productsubcategory/print/:id"
                  component={PrintProductSubCategory}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/productsubcategory/printpage"
                  component={PrintWholeProductSubCategory}
                />
              </Switch>

              {/**!------SPECIALITY----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/speciality"
                  component={ExistingSpeciality}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/speciality/add"
                  component={CreateSpeciality}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/speciality/edit/:id"
                  component={EditSpeciality}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/speciality/print/:id"
                  component={PrintSpeciality}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/speciality/printpage"
                  component={PrintWholeSpeciality}
                />
              </Switch>

              {/**!------SERVICE_PROVIDER----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/serviceprovider"
                  component={ExistingServiceProvider}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/serviceprovider/add"
                  component={CreateServiceProvider}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/serviceprovider/edit/:id"
                  component={EditServiceProvider}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/serviceprovider/print/:id"
                  component={PrintServiceProvider}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/serviceprovider/printpage"
                  component={PrintWholeServiceProvider}
                />
              </Switch>
              {/**!------HEADER_INFO----!*/}
              <Switch>
                <PrivateRoute
                  exact
                  path="/api/headerinfo"
                  component={HeaderInfo}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
