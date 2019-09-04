const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
var spec = "";

const ComplaintClosed = require("../../../models/Entries/CSComplete");
// const Proreg = require("../../../models/Entries/ProReg");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "client/public/complaintno/docs",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

//=====================Create an Complaint Number and the Products Inside this=====================
router.post("/add", upload.single("complaintdoc"), (req, res, next) => {
  console.log(req.file);
  const newComplete = new ComplaintClosed({
    // feedback: req.body.complaintid,
    // assignmentdetails: req.body.assigncomplaintid,
    transno: req.body.transno,
    dateandtime: req.body.dateandtime,
    complaintnoremarks: req.body.complaintnoremarks,
    callstatus: req.body.callstatus,
    deliverid: req.body.deliverid,
    complaintdoc: req.file.path

  });
  newComplete
    .save()
    .then(complete => res.json(complete))
    .catch(err => res.json(err));
});

// router.post("/product/:id", (req, res) => {
//   ComplaintClosed.findByIdAndUpdate(req.params.id)
//     .then(complaintno => {
//       const eixistProductDetails = {
//         complaintno_pro: req.body.proregid,
//         complaintno_serialno: req.body.complaintno_serialno
//       };
//       complaintno.complaintno_productdetails.push(eixistProductDetails);
//       complaintno.save().then(data => res.json(data));
//     })
//     .catch(err => res.json(err));
// });

//==========================Getting/Editing the Complaint no details and the product details =======================
router.get("/", (req, res) => {
  ComplaintNo.find()
    .sort({ date: -1 })
       .populate({
    path: "deliverid",
    populate:[
      {
      path: "delivercaseid",
      populate: [
        {
          path: "receivedcaseid",
          populate: [
            {
              path: "senttocaseid",
              populate: [
                {
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
            }
          ]
        }
      ]
    }
  ]
    })
    .then(complaintno => res.json(complaintno))
    .catch(err => res.json(err));
});

// // Get data from Product Registration
// router.post("/serialno", (req, res) => {
//   Proreg.find(
//     { "products.serialno": req.body.serialno },
//     //Take the exact serialno
//     {
//       products: {
//         $elemMatch: { serialno: req.body.serialno }
//       }
//     }
//   )
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


// router.get("/edit/:id", (req, res) => {
//   ComplaintNo.findById(req.params.id)
//        .populate({
//       path: "feedback",
//       populate: [
//         {
//           path: "calltype"
//         },
//         {
//           path: "client"
//         },
//         {
//           path: "clienttype"
//         },
//         {
//           path: "departmentname"
//         },
//         {
//           path: "complaints_pro_details.complaints_prod",
//           populate: [
//             "products.oem",
//             "products.category",
//             "products.subcategory"
//           ]
//         }
//       ]
//     })
//     .populate({
//       path: "assignmentdetails",
//       populate: [
//         {
//           path: "assigncomplaintsdetails",
//           populate: [
//             {
//               path: "calltype"
//             },
//                {
//               path: "client"
//             },
//                {
//               path: "clienttype"
//             },
//             {
//               path: "departmentname"
//             },
//             {
//           path: "complaints_pro_details.complaints_prod",
//           populate: [
//             "products.oem",
//             "products.category",
//             "products.subcategory"
//           ]
//         }
//           ]
//         },
//         {
//           path: "assignengineer"
//         },
//         {
//           path: "assign_productdetails.assign_pro",
//           populate: [
//             "products.oem",
//             "products.category",
//             "products.subcategory"
//           ]
//         }
//       ]
//     })
//     .populate({
//       path: "complaintno_productdetails.complaintno_pro",
//       populate: [
//         {
//           path: "customer",
//           populate: ["customer.customername"]
//         },
//         {
//           path: "customertype",
//           populate: ["customertype.customertype"]
//         },
//         {
//           path: "department",
//           populate: ["customersubdepartment.department"]
//         },
//         {
//           path: "products.oem",
//           populate: ["oem.companyname"]
//         },
//         {
//           path: "products.category",
//           populate: ["category.category"]
//         },
//         {
//           path: "products.subcategory",
//           populate: ["subcategory.subcategory"]
//         }
//       ]
//     })
//     .then(complaintno => res.json(complaintno))
//     .catch(err => res.json(err));
// });

// // //========================Update Complaint no and the ComplaintNoProducts=======================
// router.post("/new/update/:id", upload.single("complaintdoc"), (req, res) => {
//   ComplaintNo.updateOne(
//     { _id: req.params.id },

//     {
//       feedback: req.body.complaintid,
//       transno: req.body.transno,
//       dateandtime: req.body.dateandtime,
//       complaintnoremarks: req.body.complaintnoremarks,
//       callstatus: req.body.callstatus,
//       complaintdoc: req.file.path
//     }
//   )
//     .then(updateData =>
//       res.json({
//         msg: "installation Updated Successfully"
//       })
//     )
//     .catch(err => res.json(err));
// });

// router.post("/product/:id/:complaintno_productdetails_id", (req, res) => {
//   let updateObj = { $set: {} };
//   for (var param in req.body) {
//     updateObj.$set["complaintno_productdetails.$." + param] = req.body[param];
//   }
//   ComplaintNo.updateOne(
//     {
//       "complaintno_productdetails._id": req.params.complaintno_productdetails_id
//     },
//     {
//       $set: {
//         "complaintno_productdetails.$.complaintno_pro": req.body.proregid,
//         "complaintno_productdetails.$.complaintno_serialno":
//           req.body.complaintno_serialno
//       }
//     },
//     (err, result) => {
//       if (err) {
//         res
//           .status(500)
//           .json({ error: "Unable to update complaintno_productdetails." });
//       } else {
//         res.status(200).json({
//           msg: "Bakor! You got this Update again"
//         });
//       }
//     }
//   );
// });

// //========================Delete Complaint no and the ComplaintNoProducts=======================
// router.delete("/delete/:id", (req, res) => {
//   ComplaintNo.findById(req.params.id)
//     .then(complaintno =>
//       complaintno
//         .remove()
//         .then(complaintno =>
//           res.status(200).json({ msg: "Complaint No Deleted Successfully" })
//         )
//     )
//     .catch(complaintno =>
//       res.status(400).json({ msg: "Error in deleting ComplaintNo" })
//     );
// });

// router.delete("/product/:id/:complaintno_productdetails_id", (req, res) => {
//   ComplaintNo.findById(req.params.id)
//     .then(complaintno => {
//       // Check to see if Product exists
//       if (
//         complaintno.complaintno_productdetails.filter(
//           complaintno_productdetails =>
//             complaintno_productdetails._id.toString() ===
//             req.params.complaintno_productdetails_id
//         ).length === 0
//       ) {
//         return res
//           .status(404)
//           .json({ message: "Products in the complaint does not exist" });
//       }

//       // Get remove index
//       const removeIndex = complaintno.complaintno_productdetails
//         .map(item => item._id.toString())
//         .indexOf(req.params.complaintno_productdetails_id);

//       // Splice product out of array
//       complaintno.complaintno_productdetails.splice(removeIndex, 1);

//       complaintno.save().then(complaint => res.json(complaint));
//     })
//     .catch(err =>
//       res.status(404).json({ message: "No Complaint Number found" })
//     );
// });

module.exports = router;