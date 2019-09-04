const express = require("express");
const router = express.Router();

const Speciality = require("../../../models/Settings/Speciality");

//Create Speciality
router.post("/add", (req, res) => {
  const newSpeciality = new Speciality({
    speciality: req.body.speciality,
    description: req.body.description
  });
  newSpeciality.save().then(speciality => res.json(speciality));
});


//Read all the Speciality data
router.get("/", (req, res) => {
  Speciality.find()
    .sort({ date: -1 })
    .then(speciality => res.json(speciality));
});


//Get Speciality data using id to edit
router.get("/edit/:id", (req, res) => {
  Speciality.findById(req.params.id)
    .then(speciality => res.json(speciality))
    .catch(err => res.status(404).json({ msg: "Speciality not Found" }));
});

//Updating Speciality using ids
router.post("/update/:id", (req, res) => {
  Speciality.findByIdAndUpdate(req.params.id, req.body)
    .then(speciality =>
      res.status(200).json({ msg: "Speciality Updated Successfully" })
    )
    .catch(speciality =>
      res.status(400).json({ msg: "Error in Updating Speciality" })
    );
});

//Deleting Speciality using ids
router.delete("/delete/:id", (req, res) => {
  Speciality.findById(req.params.id)
    .then(speciality =>
      speciality
        .remove()
        .then(speciality =>
          res.status(200).json({ msg: "Speciality Deleted Successfully" })
        )
    )
    .catch(speciality =>
      res.status(400).json({ msg: "Error in deleting Speciality" })
    );
});

module.exports = router;
