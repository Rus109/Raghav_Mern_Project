const express = require("express");
const router = express.Router();
const passport = require("passport");

//Bringing the EmpDetails Model
const EmpDet = require("../../../models/Entries/EmployeesDetails");

//Getting the EmpDetails with authentication
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isAdmin === true || req.user.isManager === true) {
      EmpDet.find()
        .sort({ date: -1 })
        // .populate("employeesinfo", "name email contactno address")
        // //Populating only for objects data
        .populate({
          path: "employeesinfo",
          populate: ["designation", "speciality"]
        })
        .then(empdet => res.status(200).json(empdet))
        .catch(err =>
          res.status(400).json({ msg: "Error in finding Employees Details" })
        );
    } else {
      res.status(400).json({ msg: "You are not authorized for this routes" });
    }
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isAdmin === true || req.user.isManager === true) {
      const newEmpDetails = new EmpDetails({
        employeesinfo: req.body.employeesid,
        workingdays: req.body.workingdays,
        fathersname: req.body.fathersname,
        pan: req.body.pan,
        joiningdate: req.body.joiningdate,
        gender: req.body.gender,
        pfno: req.body.pfno,
        esino: req.body.esino,
        branchname: req.body.branchname,
        department: req.body.department,
        paymode: req.body.paymode,
        bankname: req.body.bankname,
        acno: req.body.acno,
        ifscno: req.body.ifscno,
        //Earnings Details
        basicsalary: req.body.basicsalary,
        extra: req.body.extra,
        totalEarnings: req.body.totalEarnings,
        //Days Details
        fixeddays: req.body.fixeddays,
        presentdays: req.body.presentdays,
        absentdays: req.body.absentdays,
        leavedays: req.body.leavedays,
        holidays: req.body.holidays,
        //Deductions
        pf: req.body.pf,
        esi: req.body.esi,
        professionaltax: req.body.professionaltax,
        advance: req.body.advance,
        absentdeductions: req.body.absentdeductions,
        leavedeductions: req.body.leavedeductions,
        totalDeductions: req.body.totalDeductions,
        //Net Pay Details
        netpay: req.body.netpay,
        inwords: req.body.inwords,
        name: req.body.name
      });
      newEmpDetails
        .save()
        .then(empDet => res.json(empDet))
        .catch(err => res.json(err));
    }
  }
);
//This is for commit

module.exports = router;
