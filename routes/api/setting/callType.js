const express = require("express");
const router = express.Router();

//Call Type Schema
const CallType = require("../../../models/Settings/CallType");

//Create a Call Type Data
router.post("/add", (req, res) => {
  const newCallType = new CallType({
    calltype: req.body.calltype,
    description: req.body.description
  });
  newCallType.save().then(calltype => res.json(calltype));
});

//Read all the Call Type data
router.get("/", (req, res) => {
  CallType.find()
    .sort({ date: -1 })
    .then(calltype => res.json(calltype));
});

//Get CallType by id to edit
router.get("/edit/:id", (req, res) => {
  CallType.findById(req.params.id)
    .exec()
    .then(calltype => res.json(calltype))
    .catch(err => res.status(404).json({ msg: "No Call Types found" }));
});

//Update Call Type using their ids
router.post("/update/:id", (req, res) => {
  CallType.findByIdAndUpdate(req.params.id, req.body)
    .then(calltype =>
      res.status(200).json({ msg: "Call Type Updated Successfully" })
    )
    .catch(calltype =>
      res.status(400).json({ msg: "Errors in updating Call Type" })
    );
});

//Delete Call Type Using their ids
router.delete("/delete/:id", (req, res) => {
  CallType.findById(req.params.id)
    .then(calltype =>
      calltype
        .remove()
        .then(res.status(200).json({ msg: "Call Type deleted successfully" }))
    )
    .catch(calltype =>
      res.status(400).json({ msg: "Error in deleting Call Type" })
    );
});

module.exports = router;
