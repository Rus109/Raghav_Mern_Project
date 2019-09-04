const express = require("express");
const router = express.Router();

const SendTo = require("../../../models/Entries/CSSendForServicing");
const Proreg = require("../../../models/Entries/ProReg");
const AMC = require("../../../models/Entries/AMCRegistration")

// router.get("/", (req, res) => {
//   res.send("Router is working");
// });

//=======================Adding the SendTo=======================
router.post("/add", (req, res) => {
  const newSendTo = new SendTo({
    sentotranactionno: req.body.sentotranactionno,
    sendtodate: req.body.sendtodate,
    senttocaseid: req.body.bringinid,
    sentochallanno: req.body.sentochallanno,
    sentocalltype: req.body.sentocalltype,
    sentoremarks: req.body.sentoremarks
  });
  newSendTo
    .save()
    .then(sendto => res.json(sendto))
    .catch(err => res.json(err));
});

//=======================Getting the SendTo=======================
router.get("/", (req, res) => {
  SendTo.find()
    .populate({
      path: "senttocaseid",
      populate: [
        {
          path: "complaintno",
          populate: [
            {
              path: "feedback",
              populate: [
                { path: "calltype" },
                { path: "client" },
                { path: "clienttype" },
                { path: "departmentname" },
                {
                  path: "complaints_pro_details.complaints_prod",
                  populate: [
                    "products.oem",
                    "products.category",
                    "products.subcategory"
                  ]
                }
              ]
            },
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
            },
            {
              path: "complaintno_productdetails.complaintno_pro",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        },
        {
          path: "bringin_productdetails.bringin_pro",
          populate: [
            "products.oem",
            "products.category",
            "products.subcategory"
          ]
        }
      ]
    })
    .then(sendto => res.json(sendto))
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
    .then(inst => res.json(inst))
    .catch(err => res.json(err));
});

// Get data from Product Registration
router.post("/amc/serialno", (req, res) => {
  AMC.find(
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
    .select("amcstartdate")
    .select("amcexpiredate")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .populate("serviceprovider", "providername")
    //Populating the product nested array in object
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(inst => res.json(inst))
    .catch(err => res.json(err));
});

router.get("/dblclick/:id", (req, res) => {
  SendTo.findById(req.params.id)
    .populate({
      path: "senttocaseid",
      populate: [
        {
          path: "complaintno",
          populate: [
            {
              path: "feedback",
              populate: [
                { path: "calltype" },
                { path: "client" },
                { path: "clienttype" },
                { path: "departmentname" },
                {
                  path: "complaints_pro_details.complaints_prod",
                  populate: [
                    "products.oem",
                    "products.category",
                    "products.subcategory"
                  ]
                }
              ]
            },
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
            },
            {
              path: "complaintno_productdetails.complaintno_pro",
              populate: [
                "products.oem",
                "products.category",
                "products.subcategory"
              ]
            }
          ]
        },
        {
          path: "bringin_productdetails.bringin_pro",
          populate: [
            "products.oem",
            "products.category",
            "products.subcategory"
          ]
        }
      ]
    })
    .then(editSendTo => res.json(editSendTo))
    .catch(err => res.json(err));
});

router.post("/update/:id", (req, res) => {
  SendTo.updateOne(
    { _id: req.params.id },
    {
      sentotranactionno: req.body.sentotranactionno,
      sendtodate: req.body.sendtodate,
      senttocaseid: req.body.bringinid,
      sentochallanno: req.body.sentochallanno,
      sentocalltype: req.body.sentocalltype,
      sentoremarks: req.body.sentoremarks
    }
  )
    .then(editSendTo => res.json({ success: "Successfully Updated" }))
    .catch(err => res.json(err));
});

module.exports = router;