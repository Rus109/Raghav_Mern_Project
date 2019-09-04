const express = require("express");
const router = express.Router();

const CustomerType = require('../../../models/Settings/CustomerType');

//Create CustomerType
router.post("/add", (req, res) => {
  const newCustomerType = new CustomerType({
    customertype: req.body.customertype,
    description: req.body.description
  });
  newCustomerType.save().then(customertype => res.json(customertype));
});


//Read all the CustomerType data
router.get("/", (req, res) => {
  CustomerType.find()
    .sort({ date: -1 })
    .then(customertype => res.json(customertype));
});

//Get Customer Type by id to edit
router.get("/edit/:id", (req, res) => {
  CustomerType.findById(req.params.id)
    .exec()
    .then(customertype => res.json(customertype))
    .catch(err => res.status(404).json({ msg: "No Customer Type Found" }));
});

//Updating CustomerType using ids
router.post("/update/:id", (req, res) => {
  CustomerType.findByIdAndUpdate(req.params.id, req.body)
    .then(customertype =>
      res.status(200).json({ msg: "Customer Type Updated Successfully" })
    )
    .catch(customertype =>
      res.json(400).json({ msg: "Error in Updating Customer Type" })
    );
});

//Deleting Customer Type using ids
router.delete("/delete/:id", (req, res) => {
  CustomerType.findById(req.params.id)
    .then(customertype =>
      customertype
        .remove()
        .then(customertype =>
          res.status(200).json({ msg: "Customer Type Deleted Successfully" })
        )
    )
    .catch(customersubdepartment =>
      res.status(400).json({ msg: "Error in deleting Customer Type" })
    );
});

module.exports = router;
