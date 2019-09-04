const express = require("express");
const router = express.Router();

const Received = require("../../../models/Entries/CSRecieved");

router.post("/add", (req, res) => {
  const newReceived = new Received({
    receivedtransactionno: req.body.receivedtransactionno,
    receiveddate: req.body.receiveddate,
    receivedcaseid: req.body.sendforservicingid,
    recievedremarks: req.body.recievedremarks
  });
  newReceived
    .save()
    .then(received => res.json(received))
    .catch(err => res.json(err));
});

router.get("/", (req, res) => {
  Received.find()
    .populate({
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
    })
    .then(received => res.json(received))
    .catch(err => res.json(err));
});

router.get("/dblclick/:id", (req, res) => {
  Received.findById(req.params.id)
    .populate({
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
    })
    .then(editReceiveddata => res.json(editReceiveddata))
    .catch(err => res.json(err));
});

router.post("/update/:id", (req, res) => {
  Received.updateOne(
    { _id: req.params.id },
    {
      receivedtransactionno: req.body.receivedtransactionno,
      receiveddate: req.body.receiveddate,
      receivedcaseid: req.body.sendforservicingid,
      recievedremarks: req.body.recievedremarks
    }
  )
    .then(updateReceiveData => res.json({ success: "Successfully Updated" }))
    .catch(err => res.json(err));
});

module.exports = router;