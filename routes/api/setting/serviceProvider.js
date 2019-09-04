const express = require("express");
const router = express.Router();

const ServiceProvider = require("../../../models/Settings/ServiceProvider");

//Create ServiceProvider
router.post("/add", (req, res) => {
  const newServiceProvider = new ServiceProvider({
    providername: req.body.providername,
    contactperson: req.body.contactperson,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    email: req.body.email,
    fax: req.body.fax,
    address: req.body.address
  });
  newServiceProvider.save().then(serviceProvider => res.json(serviceProvider));
});


//Read all the ServiceProvider data
router.get("/", (req, res) => {
  ServiceProvider.find()
    .sort({ date: -1 })
    .then(serviceProvider => res.json(serviceProvider));
});

//Get the ServiceProvider data using their ids to edit
router.get("/edit/:id", (req, res) => {
  ServiceProvider.findById(req.params.id)
    .then(serviceProvider => res.json(serviceProvider))
    .catch(err => res.status(404).json({ msg: "Service Provider Not found" }));
});


//Updating ServiceProvider using ids
router.post("/update/:id", (req, res) => {
  ServiceProvider.findByIdAndUpdate(req.params.id, req.body)
    .then(serviceProvider =>
      res.status(200).json({ msg: "ServiceProvider Updated Successfully" })
    )
    .catch(serviceProvider =>
      res.status(400).json({ msg: "Error in Updating ServiceProvider" })
    );
});

//Deleting ServiceProvider using ids
router.delete("/delete/:id", (req, res) => {
  ServiceProvider.findById(req.params.id)
    .then(serviceProvider =>
      serviceProvider
        .remove()
        .then(serviceProvider =>
          res.status(200).json({ msg: "ServiceProvider Deleted Successfully" })
        )
    )
    .catch(serviceProvider =>
      res.status(400).json({ msg: "Error in deleting ServiceProvider" })
    );
});

module.exports = router;
