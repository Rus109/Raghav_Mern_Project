const express = require("express");
const router = express.Router();

//Customer Model Schema
const Customer = require("../../../models/Master/Customer");

//Create Customer
router.post("/add", (req, res) => {
  const newCustomer = new Customer({
    customername: req.body.customername,
    customertype: req.body.customertypeid,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    email: req.body.email,
    fax: req.body.fax,
    address: req.body.address
  });
  newCustomer.save().then(customer => res.json(customer));
});

//Read all the Customer Data
router.get("/", (req, res) => {
  Customer.find()
    .sort({ date: -1 })
    .populate("customertype", "customertype")
    .then(customer => res.json(customer));
});

//Read one Customer Data using id to edit
router.get("/edit/:id", (req, res) => {
  Customer.findById(req.params.id)
    .populate("customertype", "customertype")
    .then(customer => res.json(customer))
    .catch(err => res.status(404).json({ msg: "Customer Not found" }));
});

//Update Customer using their ids
router.post("/update/:id", (req, res) => {
  Customer.findByIdAndUpdate(req.params.id, req.body)
    .then(customer =>
      res.status(200).json({ msg: "Customer Updated Successfully" })
    )
    .catch(customer =>
      res.status(400).json({ msg: "Error in updating Customer" })
    );
});

//Delete Customer
router.delete("/delete/:id", (req, res) => {
  Customer.findById(req.params.id, req.body).then(customer =>
    customer
      .remove()
      .then(customer =>
        res.status(200).json({ msg: "Customer Deleted Successfully" })
      )
      .catch(customer =>
        res.status(400).json({ msg: "Error in deleting Customer" })
      )
  );
});

module.exports = router;
