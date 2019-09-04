const express = require("express");
const router = express.Router();

const ProductSubCategory = require("../../../models/Settings/ProductSubCategory");

//Create ProductSubCategory
router.post("/add", (req, res) => {
  const newProductSubCategory = new ProductSubCategory({
    subcategory: req.body.subcategory,
    parentcategory: req.body.productcategoryid,
    description: req.body.description
  });
  newProductSubCategory
    .save()
    .then(productSubCategory => res.json(productSubCategory));
});

//Read all the ProductSubCategory data
router.get("/", (req, res) => {
  ProductSubCategory.find()
    .populate("parentcategory", "category")
    .sort({ date: -1 })
    .then(productSubCategory => res.json(productSubCategory));
});


//Get ProductCategory data using id to edit
router.get("/edit/:id", (req, res) => {
  ProductSubCategory.findById(req.params.id)
    .populate("parentcategory", "category")
    .then(productSubCategory => res.json(productSubCategory))
    .catch(err =>
      res.status(404).json({ msg: "Product Sub Category not Found" })
    );
});

//Updating ProductSubCategory using ids
router.post("/update/:id", (req, res) => {
  ProductSubCategory.findByIdAndUpdate(req.params.id, req.body)
    .then(productSubCategory =>
      res.status(200).json({ msg: "ProductSubCategory Updated Successfully" })
    )
    .catch(productSubCategory =>
      res.status(400).json({ msg: "Error in Updating ProductSubCategory" })
    );
});

//Deleting ProductSubCategory using ids
router.delete("/delete/:id", (req, res) => {
  ProductSubCategory.findById(req.params.id)
    .then(productSubCategory =>
      productSubCategory
        .remove()
        .then(productSubCategory =>
          res
            .status(200)
            .json({ msg: "ProductSubCategory Deleted Successfully" })
        )
    )
    .catch(productSubCategory =>
      res.status(400).json({ msg: "Error in deleting ProductSubCategory" })
    );
});

module.exports = router;
