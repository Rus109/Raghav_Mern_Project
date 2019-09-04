const express = require("express");
const router = express.Router();

//Importing the models
const AssignComplaint = require("../../../models/Entries/CSAssigned");
const Proreg = require("../../../models/Entries/ProReg");

//=====================Adding the Assign Complaint No and the products======================
router.post("/add", (req, res) => {
  const newAssignComplaint = new AssignComplaint({
    assigncomplaintsdetails: req.body.complaintid,
    assignrefno: req.body.assignrefno,
    assigndatetime: req.body.assigndatetime,
    assignengineer: req.body.employeesid,
    assignremarks: req.body.assignremarks
  });
  newAssignComplaint
    .save()
    .then(assign => res.json(assign))
    .catch(err => res.json(err));
});

router.post("/product/:id", (req, res) => {
  AssignComplaint.findById(req.params.id)
    .then(assigncomplaint => {
      const existPro = {
        assign_pro: req.body.proregid,
        assignserialno: req.body.assignserialno
      };
      assigncomplaint.assign_productdetails.push(existPro);
      assigncomplaint
        .save()
        .then(data => res.json(data))
        .catch(err =>
          res.json({
            failure: "Error in adding a product in the Assign Complaint"
          })
        );
    })
    .catch(err =>
      res.json({ no_id: "No Assign Complaint found with that ID" })
    );
});

//=====================Adding the Assign Complaint No and the products======================
router.get("/", (req, res) => {
  AssignComplaint.find()
    .populate("assignengineer", "name")
    .populate({
      path: "assigncomplaintsdetails",
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
    })
    .populate({
      path: "assign_productdetails.assign_pro",
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
    .then(ascomp => res.json(ascomp))
    .catch(err => res.json(err));
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
    .then(ascomp => res.json(ascomp))
    .catch(err => res.json(err));
});

router.get("/edit/:id", (req, res) => {
  AssignComplaint.findById(req.params.id)
    .populate("assignengineer", "name")
    .populate({
      path: "assigncomplaintsdetails",
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
    })
    .populate({
      path: "assign_productdetails.assign_pro",
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
    .then(ascomp => res.json(ascomp))
    .catch(err => res.json(err));
});

//=====================Update the Assign Complaint No and the products======================
router.post("/update/:id", (req, res) => {
  AssignComplaint.updateOne(
    { _id: req.params.id },
    {
      assigncomplaintsdetails: req.body.complaintid,
      assignrefno: req.body.assignrefno,
      assigndatetime: req.body.assigndatetime,
      assignengineer: req.body.employeesid,
      assignremarks: req.body.assignremarks
    }
  )
    .then(assigncomplaint =>
      res.json({ msg: "Assigned Complaint updated successfully" })
    )
    .catch(err => res.json(err));
});

router.post("/product/:id/:assign_productdetails_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["assign_productdetails.$." + param] = req.body[param];
  }
  AssignComplaint.updateOne(
    { "assign_productdetails._id": req.params.assign_productdetails_id },
    {
      $set: {
        "assign_productdetails.$.assign_pro": req.body.proregid,
        "assign_productdetails.$.assignserialno": req.body.assignserialno
      }
    },
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Unable to update assign productdetails." });
      } else {
        res.status(200).json({
          msg: "Bakor! You got this Update again"
        });
      }
    }
  );
});

//=====================Delete the Assign Complaint No and the products======================
router.delete("/delete/:id", (req, res) => {
  AssignComplaint.findById(req.params.id)
    .then(assigncomplaint =>
      assigncomplaint
        .remove()
        .then(assigncomplaint =>
          res.status(200).json({ msg: "AssignComplaint Deleted Successfully" })
        )
    )
    .catch(err =>
      res.status(400).json({ msg: "Error in deleting AssignComplaint" })
    );
});

router.delete("/product/:id/:assign_productdetails_id", (req, res) => {
  AssignComplaint.findById(req.params.id)
    .then(assigncomplaint => {
      // Check to see if Product exists
      if (
        assigncomplaint.assign_productdetails.filter(
          assign_productdetails =>
            assign_productdetails._id.toString() ===
            req.params.assign_productdetails_id
        ).length === 0
      ) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      // Get remove index
      const removeIndex = assigncomplaint.assign_productdetails
        .map(item => item._id.toString())
        .indexOf(req.params.assign_productdetails_id);

      // Splice product out of array
      assigncomplaint.assign_productdetails.splice(removeIndex, 1);

      assigncomplaint.save().then(assigncomplaint => res.json(assigncomplaint));
    })
    .catch(err =>
      res.status(404).json({ message: "No Product Registration found" })
    );
});
module.exports = router;