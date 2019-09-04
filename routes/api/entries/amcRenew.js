const express = require("express");
const router = express.Router();

//importing the AMC Renewal Schema Model
const AMCRen = require("../../../models/Entries/AMCRenew");
const amc = require("../../../models/Entries/AMCRegistration")

//=========================Adding a new amcrenewal and Adding the Products from AMC Registration===========================
router.post("/add", (req, res) => {
  const newAMCRen = new AMCRen({
    amcrenewno: req.body.amcrenewno,
    amcrenewaldate: req.body.amcrenewaldate,
    arncustomer: req.body.customerid,
    arncustomertype: req.body.customertypeid,
    arndepartment: req.body.customersubdepartmentid,
    arnserviceprovider: req.body.serviceproviderid,
    arnstartdate: req.body.arnstartdate,
    arnexpiredate: req.body.arnexpiredate,
    arnremarks: req.body.arnremarks
  });
  newAMCRen.save().then(amc => res.json(amc));
});

router.post("/product/:id", (req, res) => {
  AMCRen.findById(req.params.id)
    .then(amcren => {
      const existAmcAndPro = {
        amcrefno: req.body.amcregid,
        arnserialno: req.body.arnserialno,
        refno: req.body.proregid,
        proregserialno: req.body.proregserialno,
        dataamc: req.body.dataamc
      };
      amcren.multpleamcandref.push(existAmcAndPro);
      amcren
        .save()
        .then(data => res.json(data))
        .catch(err =>
          res.json({ error: "Error in savind the Multiple datas" })
        );
    })
    .catch(err =>
      res.json({ no_id: "Error, there is no AMCRenewal with that ID" })
    );
});

//=============Getting All the datas of AMC Renewal and Also Gettting According to their IDS======================
router.get("/", (req, res) => {
  AMCRen.find()
    .sort({ entrydate: -1 })
    .populate("arncustomer", "customername")
    .populate("arncustomertype", "customertype")
    .populate("arndepartment", "department")
    .populate("arnserviceprovider", "providername")
    //Deep Deep Populations
    .populate({
      path: "multpleamcandref.amcrefno",
      populate: [
        {
          path: "customer"
        },
        {
          path: "customertype "
        },
        {
          path: "department"
        },
        {
          path: "serviceprovider"
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
    })
    .populate({
      path: "multpleamcandref.refno",
      populate: [
        {
          path: "customer",
          populate: ["customer.customername"]
        },
        {
          path: "customertype",
          populate: ["customertype.customertype"]
        },
        {
          path: "department",
          populate: ["customersubdepartment.department"]
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
    })
    .then(amc => res.json(amc));
});

router.get("/edit/:id", (req, res) => {
  AMCRen.findByIdAndUpdate(req.params.id)
    .sort({ entrydate: -1 })
    .populate("arncustomer", "customername")
    .populate("arncustomertype", "customertype")
    .populate("arndepartment", "department")
    .populate("arnserviceprovider", "providername")
    //Deep Deep Populations
   .populate({
      path: "multpleamcandref.amcrefno",
      populate: [
        {
          path: "customer"
        },
        {
          path: "customertype "
        },
        {
          path: "department"
        },
        {
          path: "serviceprovider"
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
    })
    .populate({
      path: "multpleamcandref.refno",
      populate: [
        {
          path: "customer",
          populate: ["customer.customername"]
        },
        {
          path: "customertype",
          populate: ["customertype.customertype"]
        },
        {
          path: "department",
          populate: ["customersubdepartment.department"]
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
    })
    .then(amc => res.json(amc))
    .catch(amc => {
      res.status(400).json({ msg: "No AMC Renewal Found with that ID" });
    });
});

//==================Update AMC Renewal and the MultipleAMCandRefno using their ids
router.post("/update/:id", (req, res) => {
  AMCRen.update(
    { _id: req.params.id },
    {
      amcrenewno: req.body.amcrenewno,
      amcrenewaldate: req.body.amcrenewaldate,
      arncustomer: req.body.customerid,
      arncustomertype: req.body.customertypeid,
      arndepartment: req.body.customersubdepartmentid,
      arnserviceprovider: req.body.serviceproviderid,
      arnstartdate: req.body.arnstartdate,
      arnexpiredate: req.body.arnexpiredate,
      arnremarks: req.body.arnremarks
    }
  )
    .then(amc => {
      res.status(200).json({ success: "AMC Renewal Updated Successfully" });
    })
    .catch(error => {
      res.status(400).json({ error: "Error in updating AMC Renewal" });
    });
});

router.post("/product/:id/:multpleamcandref_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["multpleamcandref.$." + param] = req.body[param];
  }
  AMCRen.update(
    { "multpleamcandref._id": req.params.multpleamcandref_id },
    {
      $set: {
        "multpleamcandref.$.amcrefno": req.body.amcregid,
        "multpleamcandref.$.arnserialno": req.body.arnserialno,
        "multpleamcandref.$.refno": req.body.proregid,
        "multpleamcandref.$.proregserialno": req.body.proregserialno,
        "multpleamcandref.$.dataamc": req.body.dataamc
      }
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Unable to update competitor." });
      } else {
        res.status(200).json({
          msg: "Bakor! You got this Update"
        });
      }
    }
  );
});

//===============================Delete AMC Renewal Whole Data and Only the Multpleamcandref using their ids=======================================
router.delete("/delete/:id", (req, res) => {
  AMCRen.findById(req.params.id)
    .then(amc =>
      amc
        .remove()
        .then(amc =>
          res.status(200).json({ msg: "AMC Renewal Deleted Successfully" })
        )
    )
    .catch(amc =>
      res.status(400).json({ msg: "Error in deleting AMC Renewal" })
    );
});

router.delete("/product/:id/:multpleamcandref_id", (req, res) => {
  AMCRen.findById(req.params.id)
    .then(amcrenewal => {
      // Check to see if Product exists
      if (
        amcrenewal.multpleamcandref.filter(
          multpleamcandref =>
            multpleamcandref._id.toString() === req.params.multpleamcandref_id
        ).length === 0
      ) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      // Get remove index
      const removeIndex = amcrenewal.multpleamcandref
        .map(item => item._id.toString())
        .indexOf(req.params.multpleamcandref_id);

      // Splice product out of array
      amcrenewal.multpleamcandref.splice(removeIndex, 1);

      amcrenewal.save().then(amcrenewal => res.json(amcrenewal));
    })
    .catch(err =>
      res.status(404).json({ message: "No Product Registration found" })
    );
});

//   //GET the SERIALNO first inorder to add it in the products
// //in the AMC through the ProReg Model
router.post("/serialno", (req, res) => {
  amc.find(
    { "products.serialno": req.body.serialno },
    //Take the exact serialno
    {
      products: {
        $elemMatch: { serialno: req.body.serialno }
      }
    }
  )
    .select("amcrefno")
    .select("amcregdate")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    //Populating the product nested array in object
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(inst => res.json(inst))
    .catch(err => res.json(err));
});
module.exports = router;
