const express = require("express");
const router = express.Router();

const BringIn = require("../../../models/Entries/CSBringin");
const Proreg = require("../../../models/Entries/ProReg");

//===============Adding Bringin and  the Bringin Products=================
router.post("/add", (req, res) => {
  const newBrinIn = new BringIn({
    transactionno: req.body.transactionno,
    date: req.body.date,
    //caseid: req.body.complaintid,
    broughtby: req.body.employeesid,
    complaintno: req.body.complaintnoid,
    bringinremark: req.body.bringinremark
    // assigncomplaint: req.body.assigncomplaintid
  });
  newBrinIn
    .save()
    .then(bringin => res.json(bringin))
    .catch(err => res.json({ fail: "Fail to add Bringin" }));
});

router.post("/product/:id", (req, res) => {
  BringIn.findByIdAndUpdate(req.params.id)
    .then(bringin => {
      const eixistProductDetails = {
        bringin_pro: req.body.proregid,
        partno: req.body.partno,
        bringin_serialno: req.body.bringin_serialno,
        bringin_remarks: req.body.bringin_remarks
      };
      bringin.bringin_productdetails.push(eixistProductDetails);
      bringin.save().then(data => res.json(data));
    })
    .catch(err => res.json(err));
});

//===============Getting Bringin and  the Bringin Products=================
router.get("/", (req, res) => {
  BringIn.find()
    .sort({ date: -1 })
    .populate("broughtby", "name")
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "feedback",
          populate: [
            {
              path: "calltype"
            },
            {
              path: "client"
            },
            {
              path: "clienttype"
            },
            {
              path: "departmentname"
            },
            {
              path: "complaints_pro_details.complaints_prod",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        }
      ]
    })
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "assignmentdetails",
          populate: [
            {
              path: "assignengineer"
            },
            {
              path: "assign_productdetails.assign_pro",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        }
      ]
    })
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "complaintno_productdetails.complaintno_pro",
          populate: [
            "products.oem",
            "products.category",
            "products.subcategory"
          ]
        }
      ]
    })
    .populate({
      path: "bringin_productdetails.bringin_pro",
      populate: ["products.oem", "products.category", "products.subcategory"]
    })
    .then(bringin => res.json(bringin))
    .catch(err => res.json({ fail: "Error in dispatching the Bringin" }));
});


// Get data from Product Registration
router.post("/serialno", (req, res) => {
  Proreg.find(
    { "products.serialno": req.body.serialno },
    //Take the exact serialno
    {
      products: {
        $elemMatch: { serialno: req.body.serialno }
      }
    }
  )
    .select("refno1")
    .select("refno2")
    .select("date")
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

router.get("/edit/:id", (req, res) => {
  BringIn.findById(req.params.id)
    .sort({ date: -1 })
    .populate("broughtby", "name")
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "feedback",
          populate: [
            {
              path: "calltype"
            },
            {
              path: "client"
            },
            {
              path: "clienttype"
            },
            {
              path: "departmentname"
            },
            {
              path: "complaints_pro_details.complaints_prod",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        }
      ]
    })
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "assignmentdetails",
          populate: [
            {
              path: "assignengineer"
            },
            {
              path: "assign_productdetails.assign_pro",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        }
      ]
    })
    .populate({
      path: "complaintno",
      populate: [
        {
          path: "complaintno_productdetails.complaintno_pro",
          populate: [
            "products.oem",
            "products.category",
            "products.subcategory"
          ]
        }
      ]
    })
    .populate({
      path: "bringin_productdetails.bringin_pro",
      populate: ["products.oem", "products.category", "products.subcategory"]
    })
    .then(bringin => res.json(bringin))
    .catch(err => res.json({ fail: "Error in dispatching the Bringin" }));
});

//================Update the Bringin and the Products==================
router.post("/update/:id", (req, res) => {
  BringIn.updateOne(
    { _id: req.params.id },
    {
      transactionno: req.body.transactionno,
      date: req.body.date,
      broughtby: req.body.employeesid,
      complaintno: req.body.complaintnoid
    }
  )
    .then(updatebringin => res.json({ success: "Successfully Updated" }))
    .catch(err => res.json(err));
});

router.post("/product/:id/:bringin_productdetails_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["bringin_productdetails.$." + param] = req.body[param];
  }
  BringIn.updateOne(
    {
      "bringin_productdetails._id": req.params.bringin_productdetails_id
    },
    {
      $set: {
        "bringin_productdetails.$.bringin_pro": req.body.proregid,
        "bringin_productdetails.$.ispart": req.body.ispart,
        "bringin_productdetails.$.bringin_serialno": req.body.bringin_serialno,
        "bringin_productdetails.$.bringin_remarks": req.body.bringin_remarks
      }
    },
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Unable to update bringin productdetails." });
      } else {
        res.status(200).json({
          msg: "Bakor! You got this Update again"
        });
      }
    }
  );
});

//=====================Delete the Bringin and the products========================

router.delete("/delete/:id", (req, res) => {
  BringIn.findById(req.params.id)
    .then(bringin => {
      bringin
        .remove()
        .then(bringin => res.json({ success: "Successfully Deleted" }))
        .catch(err => res.json({ fail: "Error in deleting the bringin" }));
    })
    .catch(err => res.json({ id_not_found: "BringIn ID not found" }));
});

router.delete("/product/:id/:bringin_productdetails_id", (req, res) => {
  BringIn.findById(req.params.id)
    .then(bringin => {
      // Check to see if Product exists
      if (
        bringin.bringin_productdetails.filter(
          bringin_productdetails =>
            bringin_productdetails._id.toString() ===
            req.params.bringin_productdetails_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ message: "Products in the Bringin Schema does not exist" });
      }

      // Get remove index
      const removeIndex = bringin.bringin_productdetails
        .map(item => item._id.toString())
        .indexOf(req.params.bringin_productdetails_id);

      // Splice product out of array
      bringin.bringin_productdetails.splice(removeIndex, 1);

      bringin.save().then(bringin => res.json(bringin));
    })
    .catch(err => res.status(404).json({ message: "No BringIn found" }));
});

module.exports = router;