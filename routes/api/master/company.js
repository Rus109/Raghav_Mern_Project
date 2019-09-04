const express = require("express");
const router = express.Router();

const Company = require("../../../models/Master/Company");

//Create Company
router.post("/add", (req, res) => {
  const newCompany = new Company({
    companyname: req.body.companyname,
    contactperson: req.body.contactperson,
    contactno: req.body.contactno,
    alternatecontactno: req.body.alternatecontactno,
    email: req.body.email,
    fax: req.body.fax,
    address: req.body.address
  });

  newCompany.save().then(company => res.json(company));
});

//Read all the company data
router.get("/", (req, res) => {
  Company.find()
    .sort({ date: -1 })
    .then(company => res.json(company));
});

//Read a particular company data using id to edit
router.get("/edit/:id", (req, res) => {
  Company.findById(req.params.id)
    .exec()
    .then(company => res.json(company))
    .catch(err => res.status(404).json({ msg: "Company Not Found" }));
});

//Update company using their ids
router.post("/update/:id", (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(company => {
      res.status(200).json({ msg: "Company Updated Successfully" });
    })
    .catch(company => {
      res.status(400).json({ msg: "Error in updating company" });
    });
});

//Delete Company Data using their ids
router.delete("/delete/:id", (req, res) => {
  Company.findById(req.params.id)
    .then(company =>
      company
        .remove()
        .then(company =>
          res.status(200).json({ msg: "Company Deleted Successfully" })
        )
    )
    .catch(company =>
      res.status(400).json({ msg: "Error in deleting Company" })
    );
});

module.exports = router;
