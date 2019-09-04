const express = require("express");
const router = express.Router();

//Service Center Model
const ServiceCenter = require("../../../models/Master/ServiceCenter");

//Create Service Center
router.post("/add", (req, res) => {
  const newServiceCenter = new ServiceCenter({
    company: req.body.companyid,
    serviceprovider: req.body.serviceproviderid,
    centername: req.body.centername,
    contactperson: req.body.contactperson,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    zipcode: req.body.zipcode,
    fax: req.body.fax,
    address: req.body.address
  });
  newServiceCenter.save()
  .then(servicecenter => res.status(200).json(servicecenter))
  .catch(err => res.status(400).json({msg: "Error in adding Service center"}))
});

//Read all the Service Center Data
router.get("/", (req, res) => {
  ServiceCenter.find()
    .sort({ date: -1 })
    .populate("company", "companyname")
    .populate("serviceprovider", "providername")
    .then(servicecenter => res.json(servicecenter));
});

//Read one Service Center Data using id to edit
router.get("/edit/:id", (req, res) => {
  ServiceCenter.findById(req.params.id)
    .populate("company", "companyname")
    .populate("serviceprovider", "providername")
    .then(servicecenter => res.json(servicecenter))
    .catch(err => res.status(404).json({ msg: "No Service Center Found" }));
});

//Updating Service Center using their ids
router.post("/update/:id", (req, res) => {
  ServiceCenter.findByIdAndUpdate(req.params.id, req.body)
    .then(servicecenter =>
      res.status(200).json({ msg: "Service Center Updated Successfully" })
    )
    .catch(servicecenter =>
      res.status(400).json({ msg: " Error in Updating Service Center" })
    );
});

//Deleting Service Center Data using ids
router.delete("/delete/:id", (req, res) => {
  ServiceCenter.findById(req.params.id)
    .then(service =>
      service
        .remove()
        .then(service =>
          res.status(200).json({ msg: "Service Deleted Successfully" })
        )
    )
    .catch(service =>
      res.status(400).json({ msg: "Error in Deleting Service" })
    );
});

module.exports = router;
