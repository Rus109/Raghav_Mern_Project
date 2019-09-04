const express = require("express");
const router = express();
const multer = require("multer");
const path = require('path');
var spec = "";

const Employees = require("../../../models/Master/Employees");

// Set The Storage Engine
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'client/public/employees/docs')
  },
  filename: (req, file, cb) => {
  cb(null, 'Employee' + '-' + file.originalname)
  spec = 'Employee' + '-' + file.originalname
  }
  });
  const upload = multer({ storage })

//Create an employee
router.post("/add", upload.single("employeeImage"), (req, res, next) => {
  console.log(req.file);
  const newEmployee = new Employees({
    name: req.body.name,
    email: req.body.email,
    speciality: req.body.specialityid,
    designation: req.body.designationid,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    address: req.body.address,
    employeeImage: req.file.path,
    imageName: spec
  });
  newEmployee.save().then(employee => res.json(employee));
});

//Read all the datas of the employees
router.get("/", (req, res) => {
  Employees.find()
    .sort({ date: -1 })
    .populate("speciality", "speciality")
    .populate("designation", "designation")
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json(err));
});

//Get Employees using their ids to edit
router.get("/edit/:id", (req, res) => {
  Employees.findById(req.params.id, req.body)
    .populate("speciality", "speciality")
    .populate("designation", "designation")
    .then(employee => res.status(200).json(employee))
    .catch(err =>
      res.status(400).json({ msg: "No employees found with that ID" })
    );
  // res.render("profile", { image });
});

//Update employees using their ids
router.post("/update/:id", upload.single("employeeImage"), (req, res, next) => {
  Employees.update({_id: req.params.id}, {
    name: req.body.name,
    email: req.body.email,
    speciality: req.body.speciality,
    designation: req.body.designation,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    address: req.body.address,
    employeeImage: req.file.path,
    imageName: spec
  })
    .then(company => {
      res.status(200).json({ msg: "Employee Updated Successfully" });
    })
    .catch(company => {
      res.status(400).json({ msg: "Error in updating Employee" });
    });
});

//Delete Company Data using their ids
router.delete("/delete/:id", async (req, res) => {
  Employees.findById(req.params.id)
    .then(employee =>
      employee
        .remove()
        .then(employee =>
          res.status(200).json({ msg: "Employee Deleted Successfully" })
        )
    )
    .catch(employee =>
      res.status(400).json({ msg: "Error in deleting Employee" })
    );
});

module.exports = router;
