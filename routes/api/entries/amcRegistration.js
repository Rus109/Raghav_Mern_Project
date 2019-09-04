const express = require("express");
const router = express.Router();

//importing the AMCRegistration Schema Model
const AMCReg = require("../../../models/Entries/AMCRegistration");
const ProReg = require("../../../models/Entries/ProReg")

// Read all the AMCRegistration Data
router.get("/", (req, res) => {
  AMCReg.find()
    .sort({ date: -1 })
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .populate("serviceprovider", "providername")
    .populate({
      path: "productrefno",
      populate: [
        "customer",
        "customertype",
        "department",
        //Populate from DeepNested array of Proreg in the PRODUCTREFNO
        "products.oem",
        "products.category",
        "products.subcategory"
      ]
    })
    //Populate from Nested array of Proreg
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(amc => res.json(amc))
    .catch(err => res.json(err));
});


//Create a new AMCRegistration Data
router.post("/add", (req, res) => {
  const newAMCReg = new AMCReg({
    amcrefno: req.body.amcrefno,
    amcregdate: req.body.amcregdate,
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid,
    serviceprovider: req.body.serviceproviderid,
    amcstartdate: req.body.amcstartdate,
    amcexpiredate: req.body.amcexpiredate,
    productno: req.body.productrefno,
    remarks: req.body.remarks
  });
  newAMCReg.save().then(amcid => {
    AMCReg.findOne({ amcrefno: req.body.amcrefno })
      .then(amc => res.json(amc))
      .then(amc => {
        res
          .status(200)
          .json({ msg: "AMC Registration Updated Successfully", data: amc });
      })
      .catch(err => res.status(500).json({ msg: "Internal Server Error" }));
  });
});

//Update AMCRegistration using their ids
router.post("/:id", (req, res) => {
  AMCReg.findByIdAndUpdate(
    { _id: req.params.id },
    {
      amcrefno: req.body.amcrefno,
      amcregdate: req.body.amcregdate,
      customer: req.body.customerid,
      customertype: req.body.customertypeid,
      department: req.body.customersubdepartmentid,
      serviceprovider: req.body.serviceproviderid,
      amcstartdate: req.body.amcstartdate,
      amcexpiredate: req.body.amcexpiredate,
      productrefno: req.body.productrefno,
      remarks: req.body.remarks
    }
  )
    .then(amc => {
      res.status(200).json({ msg: "AMC Registration Updated Successfully" });
    })
    .catch(amc => {
      res.status(400).json({ msg: "Error in updating AMC Registration" });
    });
});

// Read all the AMCRegistration Data
// router.get("/amc/sort/data/:id/:prodid", (req, res) => {
//   var AMCSerialno = [];
//   var ProregSerialno = [];
//   var unique = [];

//     ProReg.findById(req.params.prodid)
//     .sort({date: -1})
//     .then(prod => {
//       var tempProSerial = [prod];
//       tempProSerial.map(item => {
//         item.products.map(item2 => {
//           ProregSerialno.push(item2.serialno);
//         })
//       })
//     })
//     .catch(amc => {
//       res.status(400).json({ msg: "No Product Registration found with that ID" });
//     });

//      AMCReg.findById(req.params.id)
//     .sort({ date: -1 })
//     .then(amc => {
//       var tempAmc = [amc];
//       tempAmc.map(item => {
//         item.products.map(item2 => {
//           AMCSerialno.push(item2.serialno);
//         })
//       })
    
//     })
//     .then(() => {
//       var intersection = AMCSerialno.filter(element => ProregSerialno.includes(element));
//       xyz = AMCSerialno.filter( function(n) { return !this.has(n) }, new Set(intersection));
//       unique = xyz;
//       res.json(unique)
//     })
//     .catch(err => res.json(err));

  
// });


// router.post("/multi/serialno", (req, res) => {
//   AMCReg.find(
//     { "products.serialno": req.body.serialno },
//     //Take the exact serialno
//     {
//       products: {
//         $elemMatch: { serialno: req.body.serialno }
//       }
//     }
//   )
//     .select("_id")
//     .select("refno1")
//     .select("refno2")
//     .select("date")
//     .populate("customer", "customername")
//     .populate("customertype", "customertype")
//     .populate("department", "department")
//     //Populating the product nested array in object
//     .populate("products.oem", "companyname")
//     .populate("products.category", "category")
//     .populate("products.subcategory", "subcategory")
//     .then(inst => res.json(inst))
//     .catch(err => res.json(err));
// });

router.get("/edit/:id", (req, res) => {
  AMCReg.findById(req.params.id)
    .sort({ date: -1 })
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .populate("serviceprovider", "providername")
    .populate({
      path: "productrefno",
      populate: [
        "customer",
        "customertype",
        "department",
        //Populate from DeepNested array of Proreg in the PRODUCTREFNO
        "products.oem",
        "products.category",
        "products.subcategory"
      ]
    })
    //Populate from Nested array of Proreg
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(amc => res.json(amc))
    .catch(amc => {
      res.status(400).json({ msg: "No AMC Registration found with that ID" });
    });
});

router.post("/products/:id", (req, res) => {
  AMCReg.findById(req.params.id)
    .then(amcreg => {
      const newProduct = {
        oem: req.body.companyid,
        category: req.body.productcategoryid,
        subcategory: req.body.productsubcategoryid,
        modelno: req.body.modelno,
        serialno: req.body.serialno,
        newdata: req.body.newdata
      };
      // Add to comments array
      amcreg.products.push(newProduct);

      // Save
      amcreg.save().then(amcreg => res.json(amcreg));
    })
    .catch(err =>
      res.status(404).json({ amcregnotfound: "No Amc Registration found" })
    );
});

//Update AMCRegistration using their ids
router.post("/update/:id", (req, res) => {
  AMCReg.findByIdAndUpdate(req.params.id, req.body)
    .then(amc => {
      res.status(200).json({ msg: "AMC Registration Updated Successfully" });
    })
    .catch(amc => {
      res.status(400).json({ msg: "Error in updating AMC Registration" });
    });
});



// @route   UPDATE /product/:id/:product_id
// @desc    Update product from post
// @access  Private
router.post("/product/:id/:product_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["products.$." + param] = req.body[param];
  }
  AMCReg.update(
    { "products._id": req.params.product_id },
    {
      $set: {
        "products.$.oem": req.body.companyid,
        "products.$.category": req.body.productcategoryid,
        "products.$.subcategory": req.body.productsubcategoryid,
        "products.$.modelno": req.body.modelno,
        "products.$.serialno": req.body.serialno
      }
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Unable to update product." });
      } else {
        res.status(200).json({
          msg: "Successfully Updated"
        });
      }
    }
  );
});

// Delete Specific Products
router.delete("/product/:id/:product_id", (req, res) => {
  AMCReg.findById(req.params.id)
    .then(amcreg => {
      // Check to see if Product exists
      if (
        amcreg.products.filter(
          product => product._id.toString() === req.params.product_id
        ).length === 0
      ) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      // Get remove index
      const removeIndex = amcreg.products
        .map(item => item._id.toString())
        .indexOf(req.params.product_id);

      // Splice product out of array
      amcreg.products.splice(removeIndex, 1);

      amcreg.save().then(amcreg => res.json(amcreg));
    })
    .catch(err =>
      res.status(404).json({ message: "No Product Registration found" })
    );
});

// Product Delete All
router.delete("/product_all/:amc_id/:pro_id", (req, res) => {
  AMCReg.findByIdAndUpdate(
    req.params.amc_id,
    { $pull: { products: { _id: req.params.pro_id } } },
    { safe: true, upsert: true }
  )
    .then(pro => res.json({ msg: " Product Deleted successfully" }))
    .catch(err => {
      console.log(err);
    });
});

//Delete AMCRegistration Data using their ids
router.delete("/delete/:id", (req, res) => {
  AMCReg.findById(req.params.id)
    .then(amc =>
      amc
        .remove()
        .then(amc =>
          res.status(200).json({ msg: "AMC Registration Deleted Successfully" })
        )
    )
    .catch(amc =>
      res.status(400).json({ msg: "Error in deleting AMC Registration" })
    );
});

module.exports = router;
