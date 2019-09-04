const express = require("express");
const router = express.Router();

const Designation = require("../../../models/Settings/Designation");

//Create Designation
router.post("/add", (req, res) => {
  const newDesignation = new Designation({
    designation: req.body.designation,
    description: req.body.description
  });
  newDesignation.save().then(designation => res.json(designation));
});

//Read all the Designation data
router.get("/", (req, res) => {
  Designation.find()
    .sort({ date: -1 })
    .then(designation => res.json(designation));
});

//Get designation by id to edit
router.get("/edit/:id", (req, res) => {
  Designation.findById(req.params.id)
    .then(designation => res.json(designation))
    .catch(err => res.status(404).json({ msg: "Designation not found" }));
});

//Updating Designation using ids
router.post("/update/:id", (req, res) => {
  Designation.findByIdAndUpdate(req.params.id, req.body)
    .then(designation => {
      res.status(200).json({ msg: "Designation updated successfully" });
    })
    .catch(err => {
      res.status(400).json({ mdg: "Error in updating Designation" });
    });
});
//Deleting Designation using ids
router.delete("/delete/:id", (req, res) => {
  Designation.findById(req.params.id)
    .then(designation =>
      designation
        .remove()
        .then(designation =>
          res.status(200).json({ msg: "Designation Deleted Successfully" })
        )
    )
    .catch(designation =>
      res.status(400).json({ msg: "Error in deleting Designation" })
    );
});

module.exports = router;
