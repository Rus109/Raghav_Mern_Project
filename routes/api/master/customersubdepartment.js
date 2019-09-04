const express = require("express");
const router = express.Router();

//CustomerSubDepartment Model
const CustomerSubDepartment = require("../../../models/Master/CustomerSubDepartment");

//Create CustomerSubDepartment
router.post("/add", (req, res) => {
  const newCustomerSubDepartment = new CustomerSubDepartment({
    department: req.body.department,
    customer: req.body.customerid,
    description: req.body.description
  });
  newCustomerSubDepartment
    .save()
    .then(customersubdepartment => res.json(customersubdepartment));
});

//Read all the CustomerSubDepartment data
router.get("/", (req, res) => {
  CustomerSubDepartment.find()
    .sort({ date: -1 })
    .populate("customer", "customername")
    .then(customersubdepartment => res.json(customersubdepartment));
});

//Read one CustomerSubDepartment data using id to edit
router.get("/edit/:id", (req, res) => {
  CustomerSubDepartment.findById(req.params.id)
    .populate("customer", "customername")
    .then(customersubdepartment => res.json(customersubdepartment))
    .catch(err => res.status(404).json({ msg: "Department Not Found" }));
});

//Updating CustomerSubDepartment using ids
router.post("/update/:id", (req, res) => {
  CustomerSubDepartment.findByIdAndUpdate(req.params.id, req.body)
    .then(customersubdepartment =>
      res
        .status(200)
        .json({ msg: "CustomerSubDepartment Updated Successfully" })
    )
    .catch(customersubdepartment =>
      res.status(400).json({ msg: "Error in Updating CustomerSubDepartment" })
    );
});

//Deleting CustomerSubDepartment using ids
router.delete("/delete/:id", (req, res) => {
  CustomerSubDepartment.findById(req.params.id)
    .then(customersubdepartment =>
      customersubdepartment
        .remove()
        .then(customersubdepartment =>
          res
            .status(200)
            .json({ msg: "CustomerSubDepartment Deleted Successfully" })
        )
    )
    .catch(customersubdepartment =>
      res.status(400).json({ msg: "Error in deleting CustomerSubDepartment" })
    );
});

module.exports = router;
