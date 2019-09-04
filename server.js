const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const passport = require("passport");

//Admin Routes Importing
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//Master Routes Importing
const company = require("./routes/api/master/company");
const customer = require("./routes/api/master/customer");
const product = require("./routes/api/master/product");
const order = require("./routes/api/master/order");
const servicecenter = require("./routes/api/master/servicecenter");
const customersubdepartment = require("./routes/api/master/customersubdepartment");
const employees = require("./routes/api/master/employees");

//Importing Entries Routes
const warranty = require("./routes/api/entries/warranty");
const prodreg = require("./routes/api/entries/productRegistration");
const proreg = require("./routes/api/entries/proReg");
const amcregtn = require("./routes/api/entries/amcRegistration");
const installation = require("./routes/api/entries/installation");
const complaint = require("./routes/api/entries/complaints");
const amcrenewal = require("./routes/api/entries/amcRenew");
const prodver = require("./routes/api/entries/productverification");
const empDetails = require("./routes/api/entries/empDetails");
const complaintStatusAssign = require("./routes/api/entries/csAssigned");
const complaintstatusComplaintNo = require("./routes/api/entries/csComplaintNo");
const complaintstatusBringIn = require("./routes/api/entries/csBringin");
const sendForService = require("./routes/api/entries/csSendForServicing");
const recievedFromService = require("./routes/api/entries/csRecieved");
const deliveredToCustomer = require("./routes/api/entries/csDeliver");
const Complete = require("./routes/api/entries/csComplete");

//Settings Routes Importing
const customertype = require("./routes/api/setting/customerType");
const calltype = require("./routes/api/setting/callType");
const designation = require("./routes/api/setting/designation");
const productcategory = require("./routes/api/setting/productCategory");
const productsubcategory = require("./routes/api/setting/productSubCategory");
const serviceprovider = require("./routes/api/setting/serviceProvider");
const speciality = require("./routes/api/setting/speciality");

//Initialization
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Admin Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Master Routes
app.use("/api/company", company);
app.use("/api/customer", customer);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/servicecenter", servicecenter);
app.use("/api/customersubdepartment", customersubdepartment);
app.use("/api/employees", employees);

//Entries Routes
app.use("/api/warranty", warranty);
app.use("/api/productregistration", prodreg);
app.use("/api/proreg", proreg);
app.use("/api/amcregistration", amcregtn);
app.use("/api/installation", installation);
app.use("/api/complaint", complaint);
app.use("/api/amcrenewal", amcrenewal);
app.use("/api/productverification", prodver);
app.use("/api/empdetails", empDetails);
app.use("/api/complaintstatus/assign", complaintStatusAssign);
app.use("/api/complaintstatus/complaintno", complaintstatusComplaintNo);
app.use("/api/complaintstatus/bringin", complaintstatusBringIn);
app.use("/api/complaintstatus/sendforservice", sendForService);
app.use("/api/complaintstatus/recievedfromservice", recievedFromService);
app.use("/api/complaintstatus/deliver", deliveredToCustomer);
app.use("/api/complaintstatus/complete", Complete);
//Settings Routes
app.use("/api/serviceprovider", serviceprovider);
app.use("/api/customertype", customertype);
app.use("/api/designation", designation);
app.use("/api/speciality", speciality);
app.use("/api/productcategory", productcategory);
app.use("/api/calltype", calltype);
app.use("/api/productsubcategory", productsubcategory);
//Header Info Data will be set in the Frontend

//Static folder to access it publicly
app.use(express.static("public"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
