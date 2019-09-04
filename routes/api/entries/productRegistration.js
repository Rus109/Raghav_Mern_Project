const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//importing the model of ProductRegistrationSchema
const ProdReg = require("../../../models/Entries/ProductRegistration");

//Creating a new ProductRegistration Data
router.post("/add", (req, res) => {
  const newProdReg = new ProdReg({
    _id: new mongoose.Types.ObjectId(),
    refno1: req.body.refno1,
    refno2: req.body.refno2,
    prodregdate: req.body.prodregdate,
    data: {
      product: req.body.productid,
      oemwarrantyfrom: req.body.oemwarrantyfrom,
      oemwarrantyto: req.body.oemwarrantyto,
      warrantyfrom: req.body.warrantyfrom,
      warrantyto: req.body.warrantyto,
      serialno: req.body.serialno
    },
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid,
    remarks: req.body.remarks
  });
  newProdReg.save().then(prodreg => res.json(prodreg));
});

router.post("/push", (req, res) => {
  const newProdReg = new ProdReg({
    _id: new mongoose.Types.ObjectId(),
    refno1: req.body.refno1,
    refno2: req.body.refno2,
    prodregdate: req.body.prodregdate,
    data: [
      {
        product: req.body.productid,
        oemwarrantyfrom: req.body.oemwarrantyfrom,
        oemwarrantyto: req.body.oemwarrantyto,
        warrantyfrom: req.body.warrantyfrom,
        warrantyto: req.body.warrantyto,
        serialno: req.body.serialno
      }
    ],
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid,
    remarks: req.body.remarks
  });
  ProdReg.findOne({ refno1: "REF1" }).then(function(record) {
    record.data.push(
      { product: "5cb86b45cfafaa1860e29b2a", serialno: "s123" },
      { product: "5cb86b45cfafaa1860e29b2a", serialno: "s123" }
    );
    console.log(record);
  });
  newProdReg.save().then(prodreg => res.json(prodreg));
});

//Read all the ProductRegistration Data
router.get("/", (req, res) => {
  ProdReg.find()
    .sort({ date: -1 })
    .populate("warrantyprovider", "providername")
    .populate("oemwarrantyprovider", "companyname")
    .populate("assignedto", "name")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department");
  // populate the products nested array of the objects
  // .populate('products.oem', 'comp')
  // .populate('products.category', 'category')
  // .populate('products.subcategory', 'subcategory')
  // .then(prodreg => res.json(prodreg));
});

//Get the ProductRegistration Data using their id to edit
router.get("/edit/:id", (req, res) => {
  ProdReg.findById(req.params.id)
    .sort({ date: -1 })
    // .populate({path: 'product', populate:['oem', 'category', 'subcategory'], select: ['modelno']})
    .populate("warrantyprovider", "providername")
    .populate("oemwarrantyprovider", "companyname")
    .populate("assignedto", "name")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .then(prodreg => res.json(prodreg))
    .catch(err =>
      res
        .status(404)
        .json({ msg: "No ProductRegistration Data found with that ID" })
    );
});

//Update the ProductRegistration Data using their id to edit
router.post("/update/:id", (req, res) => {
  ProdReg.findByIdAndUpdate(req.params.id, req.body)
    .then(prodreg =>
      res
        .status(200)
        .json({ msg: "ProductRegistration Data Updated Successfully" })
    )
    .catch(err =>
      res
        .status(404)
        .json({ msg: "No ProductRegistration Data found with that ID" })
    );
});

//Delete ProductRegistration Data using their ids
router.delete("/delete/:id", (req, res) => {
  ProdReg.findById(req.params.id)
    .then(prodreg =>
      prodreg
        .remove()
        .then(prodreg =>
          res
            .status(200)
            .json({ msg: "ProductRegistration Deleted Successfully" })
        )
    )
    .catch(prodreg =>
      res.status(400).json({ msg: "Error in deleting ProductRegistration" })
    );
});

module.exports = router;
