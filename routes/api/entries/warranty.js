const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Warranty = require("../../../models/Entries/Warranty");

//Create Warranty
router.post("/add", (req, res) => {
  const newWarranty = new Warranty({
    product: req.body.productid,
    warrantyprovider: req.body.serviceproviderid,
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid,
    warrantystartdate: req.body.warrantystartdate,
    warrantyexpiredate: req.body.warrantyexpiredate,
    remarks: req.body.remarks
  });

  newWarranty.save().then(warranty => res.json(warranty));
});

//Read all the Warranty data
router.get("/", (req, res) => {
    Warranty.find()
    .populate({path:'product', populate:['oem', 'category', 'subcategory'], select:['modelno']})
    .populate('warrantyprovider', 'providername')
    .populate('customer', 'customername')
    .populate('customertype', 'customertype')
    .populate('department', 'department')
    .sort({ date: -1 })
    .then(warranty => res.json(warranty));
});

//Read all the Warrenty Data
router.get("/edit/:id", (req, res) => {
  Warranty.findByIdAndUpdate(req.params.id)
    .sort({ date: -1 })
    .populate('product', ['oem', 'category', 'modelno', 'subcategory'])
    .populate('customer', 'customername')
    .populate('customertype', 'customertype')
    .populate('department', 'department')
    .populate('serviceprovider', 'providername')
    .then(amc => res.json(amc))
    .catch(amc => {
      res.status(400).json({ msg: "No AMC Registration found with that ID" });
    });
});

//Update Warrenty using their ids
router.post("/update/:id", (req, res) => {
  Warranty.findByIdAndUpdate(req.params.id, req.body)
    .then(amc => {
      res.status(200).json({ msg: "AMC Registration Updated Successfully" });
    })
    .catch(amc => {
      res.status(400).json({ msg: "Error in updating AMC Registration" });
    });
});


 //Delete Warranty Data using their ids
 router.delete("/delete/:id", (req, res) => {
  Warranty.findById(req.params.id)
    .then(amc =>
      amc
        .remove()
        .then(amc =>
          res.status(200).json({ msg: "Warranty Deleted Successfully" })
        )
    )
    .catch(amc =>
      res.status(400).json({ msg: "Error in deleting Warranty" })
    );
});
module.exports = router;