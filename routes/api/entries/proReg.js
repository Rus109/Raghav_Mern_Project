const express = require("express");
const router = express.Router();

// Post model
const ProReg = require("../../../models/Entries/ProReg");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "ProReg Works" }));

// @route   GET api/proreg
// @desc    Get proregs
// @access  Public
router.get("/", (req, res) => {
  ProReg.find()
    .sort({ date: -1 })
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    //Populating the nested array object
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(proreg => res.json(proreg))
    .catch(err => res.status(404).json({ msg: "No Pro Reg found" }));
});

// @route   GET api/proreg/:id
// @desc    Get proreg by id
// @access  Public
router.get("/:id", (req, res) => {
  ProReg.findById(req.params.id)
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    //Populating the product nested array in object
    // .populate("products.oem", "companyname")
    // .populate("products.category", "category")
    // .populate("products.subcategory", "subcategory")
    .then(proreg => res.json(proreg))
    .catch(err =>
      res.status(404).json({ msg: "No Pro Reg found with that ID" })
    );
});

// // @route   POST api/proreg
// // @desc    Create proreg
// // @access  Public
router.post("/", (req, res) => {
  const newProReg = new ProReg({
    refno1: req.body.refno1,
    refno2: req.body.refno2,
    date: req.body.date,
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid
  });

  newProReg.save().then(proreg => res.json(proreg));
});

//Update proreg data
router.post("/:id", (req, res) => {
  ProReg.findByIdAndUpdate(req.params.id, req.body)
    .then(proreg =>
      res.status(200).json({ msg: "Product Registration Updated Successfully" })
    )
    .catch(proreg =>
      res.status(400).json({ msg: "Error in updating Product Registration" })
    );
});

//Delete particular id of Product Registration Data using their ids
router.delete("/delete/:id", (req, res) => {
  ProReg.findById(req.params.id)
    .then(proreg =>
      proreg
        .remove()
        .then(proreg =>
          res.status(200).json({ msg: "Pro Reg Deleted Successfully" })
        )
    )
    .catch(proreg =>
      res.status(400).json({ msg: "Error in deleting Pro Reg " })
    );
});

//Adding a product to the product regitration
router.post("/product/:id", (req, res) => {
  ProReg.findById(req.params.id)
    .then(proreg => {
      const newProduct = {
        oem: req.body.companyid,
        category: req.body.productcategoryid,
        subcategory: req.body.productsubcategoryid,
        modelno: req.body.modelno,
        serialno: req.body.serialno,
        warrantyfrom: req.body.warrantyfrom,
        warrantyto: req.body.warrantyto,
        oemwarrantyfrom: req.body.oemwarrantyfrom,
        oemwarrantyto: req.body.oemwarrantyto
      };
      // Add to comments array
      proreg.products.push(newProduct);

      // Save
      proreg.save().then(proreg => res.json(proreg));
    })
    .catch(err => res.status(404).json({ proregnotfound: "No pro reg found" }));
});




// @route   DELETE /product/:id/:product_id
// @desc    Remove product from proreg
// @access  Private
router.delete("/product/:id/:product_id", (req, res) => {
  ProReg.findById(req.params.id)
    .then(proreg => {
      // Check to see if Product exists
      if (
        proreg.products.filter(
          product => product._id.toString() === req.params.product_id
        ).length === 0
      ) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      // Get remove index
      const removeIndex = proreg.products
        .map(item => item._id.toString())
        .indexOf(req.params.product_id);

      // Splice product out of array
      proreg.products.splice(removeIndex, 1);

      proreg.save().then(proreg => res.json(proreg));
    })
    .catch(err =>
      res.status(404).json({ message: "No Product Registration found" })
    );
});

// @route   UPDATE /product/:id/:product_id
// @desc    Remove product from proreg
// @access  Private
router.post("/product/:id/:product_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["products.$." + param] = req.body[param];
  }
  ProReg.update(
    { "products._id": req.params.product_id },
    {
      $set: {
        "products.$.oem": req.body.companyid,
        "products.$.category": req.body.productcategoryid,
        "products.$.subcategory": req.body.productsubcategoryid,
        "products.$.modelno": req.body.modelno,
        "products.$.serialno": req.body.serialno,
        "products.$.warrantyfrom": req.body.warrantyfrom,
        "products.$.warrantyto": req.body.warrantyto,
        "products.$.oemwarrantyfrom": req.body.oemwarrantyfrom,
        "products.$.oemwarrantyto": req.body.oemwarrantyto
      }
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Unable to update competitor." });
      } else {
        res.status(200).json({
          msg:
            "Yes Bakor! You have successfully updated the nnested Product in this Product Regitration Schema"
        });
      }
    }
  );
});

module.exports = router;
