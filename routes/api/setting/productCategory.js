const express = require("express");
const router = express.Router();

const ProductCategory = require("../../../models/Settings/ProductCategory");


//Create ProductCategory
router.post("/add", (req, res) => {
  const newProductCategory = new ProductCategory({
    category: req.body.category,
    description: req.body.description
  });
  newProductCategory.save().then(productCategory => res.json(productCategory));
});

//Read all the ProductCategory data
router.get("/", (req, res) => {
  ProductCategory.find()
    .sort({ date: -1 })
    .then(productCategory => res.json(productCategory));
});

//Get ProductCategory by id to edit
router.get("/edit/:id", (req, res) => {
  ProductCategory.findById(req.params.id)
    .then(productCategory => res.json(productCategory))
    .catch(err => res.status(404).json({ msg: "Product Category Not Found" }));
});

//Updating ProductCategory using ids
router.post("/update/:id", (req, res) => {
  ProductCategory.findByIdAndUpdate(req.params.id, req.body)
    .then(productCategory =>
      res.status(200).json({ msg: "ProductCategory Updated Successfully" })
    )
    .catch(productCategory =>
      res.status(400).json({ msg: "Error in Updating ProductCategory" })
    );
});

//Deleting ProductCategory using ids
router.delete("/delete/:id", (req, res) => {
  ProductCategory.findById(req.params.id)
    .then(productCategory =>
      productCategory
        .remove()
        .then(productCategory =>
          res.status(200).json({ msg: "ProductCategory Deleted Successfully" })
        )
    )
    .catch(productCategory =>
      res.status(400).json({ msg: "Error in deleting ProductCategory" })
    );
});

module.exports = router;
