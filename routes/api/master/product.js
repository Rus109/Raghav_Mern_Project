const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var spec = "";

//Product Model
const Product = require("../../../models/Master/Products");

// Set The Storage Engine
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'client/public/products/docs')
  },
  filename: (req, file, cb) => {
  cb(null, 'Product' + '-' + file.originalname)
  spec = 'Product' + '-' + file.originalname
  }
  });
  const upload = multer({ storage })

//Create Product
router.post("/add", upload.single("productdoc"), (req, res, next) => {
  console.log(req.file);
  const newProduct = new Product({
    oem: req.body.companyid,
    category: req.body.productcategoryid,
    subcategory: req.body.productsubcategoryid,
    modelno: req.body.modelno,
    description: req.body.description,
    productdoc: req.file.path,
    specification: spec
  });
  newProduct.save().then(product => res.json(product));
});

//Read all the Products Data
router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .populate("oem", "companyname")
    .populate("category", "category")
    .populate("subcategory", "subcategory")
    .then(product => res.json(product));
});

//Get the Products using their ids to edit
router.get("/edit/:id", (req, res) => {
  Product.findById(req.params.id)
    .populate("oem", "companyname")
    .populate("category", "category")
    .populate("subcategory", "subcategory")
    .then(product => res.status(200).json(product))
    .catch(err => res.status(404).json({ msg: "No products found" }));
});

//Update Product using their ids
router.post("/update/:id",upload.single("productdoc"), (req, res, next) => {
  Product.update({_id: req.params.id}, {
    oem: req.body.oem,
    category: req.body.category,
    subcategory: req.body.subcategory,
    modelno: req.body.modelno,
    description: req.body.description,
    productdoc: req.file.path,
    specification: spec
  })
    .then(product =>
      res.status(200).json({ msg: "Product Updated Successfully" })
    )
    .catch(product =>
      res.status(400).json({ msg: "Error in updating Product" })
    );
});

//Delete Product using ids
router.delete("/delete/:id", (req, res) => {
  Product.findById(req.params.id, req.body).then(product =>
    product
      .remove()
      .then(product =>
        res.status(200).json({ msg: "Product Deleted Successfully" })
      )
      .catch(product =>
        res.status(400).json({ msg: "Error in deleting Product" })
      )
  );
});
module.exports = router;
