const express = require("express");
const router = express.Router();

//import the Complaints Model Out here
const Complaint = require("../../../models/Entries/Complaints");
const Proreg = require("../../../models/Entries/ProReg");

//======================Adding The Complaints and The Products=========================
router.post("/add", (req, res) => {
  const newComplaint = new Complaint({
    caseid: req.body.caseid,
    complaintdate: req.body.complaintdate,
    complainttime: req.body.complainttime,
    servicetype: req.body.servicetype,
    calltype: req.body.calltypeid,
    client: req.body.customerid,
    clienttype: req.body.customertypeid,
    departmentname: req.body.customersubdepartmentid,
    //Caller details
    name: req.body.name,
    designation: req.body.designation,
    contactno: req.body.contactno,
    persontovisit: req.body.persontovisit,
    address: req.body.address,
    problemdetails: req.body.problemdetails,
    isresolvedonphone: req.body.isresolvedonphone,
    status: req.body.status,
    remarks: req.body.remarks
  });
  newComplaint.save().then(complaint => res.json(complaint));
});

router.post("/product/:id", (req, res) => {
  Complaint.findById(req.params.id)
    .then(complaint => {
      const existproductdetails = {
        complaints_prod: req.body.proregid,
        complaints_serialno: req.body.complaints_serialno
      };
      complaint.complaints_pro_details.push(existproductdetails);
      complaint
        .save()
        .then(data => res.json(data))
        .catch(err =>
          res.json({ error: "Error in savind the Product Details datas" })
        );
    })
    .catch(err =>
      res.json({ no_id: "Error, there is no Complaint with that ID" })
    );
});

//===================Getting all the cases, pending cases, and eidting cases======================================
router.get("/", (req, res) => {
  Complaint.find()
    .populate("calltype", "calltype")
    .populate("client", "customername")
    .populate("clienttype", "customertype")
    .populate("departmentname", "department")
    .populate({
      path: "complaints_pro_details.complaints_prod",
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
    .then(complaint => res.json(complaint))
    .catch(err => res.json({ failure: "Cannot get the Complaint Cases" }));
});

//Differentiating between resolved and unresolved
router.get("/:id", (req, res) => {
  Complaint.findById(req.params.id).then(complaint => {
    if (complaint.isresolvedonphone === true) {
      res.json({
        msg: "This case is closed and resolved on phone",
        caseid: complaint.caseid,
        client: complaint.client,
        date: complaint.date
      });
    } else if (complaint.isresolvedonphone === false) {
      // res.redirect("http://localhost:4000/api/complaintstatus");
      res.json({
        msg:
          "This case is still active and has to be assign to some engineer for repairing",
        caseid: complaint.caseid,
        client: complaint.client,
        date: complaint.date
      });
    }
  });
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

//Getting the Complaint data using their ids to edit
router.get("/edit/:id", (req, res) => {
  Complaint.findById(req.params.id)
    .populate("calltype", "calltype")
    .populate("client", "customername")
    .populate("clienttype", "customertype")
    .populate("departmentname", "department")
    .populate({
      path: "complaints_pro_details.complaints_prod",
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
    .then(complaint => res.status(200).json(complaint))
    .catch(err =>
      res.status(404).json({ msg: "No Complaints found with that ID" })
    );
});

//=================Updating Complaint Data using their ids and also update the Nested Products===========================
router.post("/update/:id", (req, res) => {
  Complaint.updateOne(
    { _id: req.params.id },
    {
      caseid: req.body.caseid,
      complaintdate: req.body.complaintdate,
      complainttime: req.body.complainttime,
      servicetype: req.body.servicetype,
      calltype: req.body.calltypeid,
      client: req.body.customerid,
      clienttype: req.body.customertypeid,
      departmentname: req.body.customersubdepartmentid,
      //Caller details
      name: req.body.name,
      designation: req.body.designation,
      contactno: req.body.contactno,
      persontovisit: req.body.persontovisit,
      address: req.body.address,
      problemdetails: req.body.problemdetails,
      isresolvedonphone: req.body.isresolvedonphone,
      status: req.body.status,
      remarks: req.body.remarks
    }
  )
    .then(complaint => res.status(200).json(complaint))
    .catch(complaint =>
      res.status(400).json({ msg: "Error in updating Complaint Data" })
    );
});

router.post("/product/:id/:complaints_pro_details_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["complaints_pro_details.$." + param] = req.body[param];
  }
  Complaint.updateOne(
    { "complaints_pro_details._id": req.params.complaints_pro_details_id },
    {
      $set: {
        "complaints_pro_details.$.complaints_prod": req.body.proregid,
        "complaints_pro_details.$.complaints_serialno":
          req.body.complaints_serialno
      }
    },
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Unable to update complaints pro details." });
      } else {
        res.status(200).json({
          msg: "Bakor! You got this Update again"
        });
      }
    }
  );
});

//===================Delete Complaint Data using their ids and the Products that re nested=================================

router.delete("/delete/:id", (req, res) => {
  Complaint.findById(req.params.id)
    .then(complaint =>
      complaint
        .remove()
        .then(complaint =>
          res.status(200).json({ msg: "Complaint Deleted Successfully" })
        )
    )
    .catch(complaint =>
      res.status(400).json({ msg: "Error in deleting Complaint" })
    );
});

router.delete("/product/:id/:complaints_pro_details_id", (req, res) => {
  Complaint.findById(req.params.id)
    .then(complaint => {
      // Check to see if Product exists
      if (
        complaint.complaints_pro_details.filter(
          complaints_pro_details =>
            complaints_pro_details._id.toString() ===
            req.params.complaints_pro_details_id
        ).length === 0
      ) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      // Get remove index
      const removeIndex = complaint.complaints_pro_details
        .map(item => item._id.toString())
        .indexOf(req.params.complaints_pro_details_id);

      // Splice product out of array
      complaint.complaints_pro_details.splice(removeIndex, 1);

      complaint.save().then(complaint => res.json(complaint));
    })
    .catch(err =>
      res.status(404).json({ message: "No Product Registration found" })
    );
});

module.exports = router;