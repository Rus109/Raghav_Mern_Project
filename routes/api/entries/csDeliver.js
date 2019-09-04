const express = require("express");
const router = express.Router();

const DeliverToCustomer = require("../../../models/Entries/CSDeliver");

router.post("/add", (req, res) => {
  const newDeliverToCustomer = new DeliverToCustomer({
    delivertransactionnumber: req.body.delivertransactionnumber,
    deliverdate: req.body.deliverdate,
    delivercaseid: req.body.receivedid,
    deliverremarks: req.body.deliverremarks
  });
  newDeliverToCustomer
    .save()
    .then(savedeliverdata => {
      res.json(savedeliverdata);
      //Redirect this as history.push in the frontend
      // res.redirect("http://localhost:4000/api/complaintstatus/complaintno");
    })
    .catch(err => res.json(err));
});

router.get("/", (req, res) => {
  DeliverToCustomer.find()
    .populate({
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
    })
    .then(getdeliverdata => res.json(getdeliverdata))
    .catch(err => res.json(err));
});

router.get("/dblclick/:id", (req, res) => {
  DeliverToCustomer.findById(req.params.id)
    .populate({
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
    })
    .then(specificdata => res.json(specificdata))
    .catch(err => res.json({ fail: "Wrong ID " }));
});

router.post("/update/:id", (req, res) => {
  DeliverToCustomer.updateOne(
    { _id: req.params.id },
    {
      delivertransactionnumber: req.body.delivertransactionnumber,
      deliverdate: req.body.deliverdate,
      delivercaseid: req.body.receivedid
    }
  )
    .then(updatedeliverdata => res.json({ updated: "Update Successfully" }))
    .catch(err => res.json({ err: "Error in updating" }));
});

module.exports = router;