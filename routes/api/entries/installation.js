
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var spec = "";

//importing the InstallationDetails Schema
const Installation = require("../../../models/Entries/Installation");
const Proreg = require("../../../models/Entries/ProReg");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "client/public/install/docs",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + file.originalname);
      spec = file.fieldname + "-" + file.originalname
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

//=================Create a new Installation Details====================
router.post("/add", upload.single("installdoc"), (req, res, next) => {
  console.log(req.file);
  const newInstallationDetails = new InstallationDetails({
    installrefno: req.body.installrefno,
    installdate: req.body.installdate,
    installedby: req.body.employeesid,
    customer: req.body.customerid,
    customertype: req.body.customertypeid,
    department: req.body.customersubdepartmentid,
    contactperson: req.body.contactperson,
    contactno: req.body.contactno,
    address: req.body.address,
    remarks: req.body.remarks,
    installdoc: req.file.path,
    filename: spec
  });
  newInstallationDetails.save().then(installation => res.json(installation));
});



//==================Getting all the Installation Data====================
router.get("/", (req, res) => {
  Installation.find()
    .sort({ installdate: -1 })
    .populate("installedby", "name")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    //Populating the products which is deep deep  nested and other fields which is just nested in the installation document
    .populate({
      path: "productdetails.proregtn",
      populate: [
        {
          path: "customer",
          populate: ["customer.customername"]
        },
        {
          path: "customertype",
          populate: ["customertype.customertype"]
        },
        {
          path: "department",
          populate: ["customersubdepartment.department"]
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
      // select: ["refno1", "refno2", "date", "customer"]
    })
    .then(installation => res.json(installation))
    .catch(err => res.json(err));
});

router.get("/edit/:id", (req, res) => {
  Installation.findByIdAndUpdate(req.params.id)
    .sort({ installdate: -1 })
    .populate("installedby", "name")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .populate({
      path: "productdetails.proregtn",
      populate: [
        {
          path: "customer",
          populate: ["customer.customername"]
        },
        {
          path: "customertype",
          populate: ["customertype.customertype"]
        },
        {
          path: "department",
          populate: ["customersubdepartment.department"]
        },
        {
          path: "products.oem",
          populate: ["oem.companyname"]
        },
        {
          path: "products.category",
          populate: ["category.category"]
        },
        {
          path: "products.subcategory",
          populate: ["subcategory.subcategory"]
        }
      ]
    })
    .then(installation => res.json(installation))
    .catch(err => res.json(err));
});

//GET the SERIALNO first inorder to add it in the products
//in the AMC through the ProReg Model
router.post("/serialno", (req, res) => {
  Proreg.find(
    { "products.serialno": req.body.serialno },
    //Take the exact serialno
    {
      products: {
        $elemMatch: { serialno: req.body.serialno }
      }
    }
  )
    .select("refno1")
    .select("refno2")
    .select("date")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    //Populating the product nested array in object
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(inst => res.json(inst))
    .catch(err => res.json(err));
});


//==================Updating only the first part of the Installation data using their id=========================
router.post("/update/:id", upload.single("installdoc"), (req, res, next) => {
  Installation.findByIdAndUpdate(
    { _id: req.params.id },
    {
      installrefno: req.body.installrefno,
      installdate: req.body.installdate,
      installedby: req.body.employeesid,
      customer: req.body.customerid,
      customertype: req.body.customertypeid,
      department: req.body.customersubdepartmentid,
      contactperson: req.body.contactperson,
      contactno: req.body.contactno,
      address: req.body.address,
      remarks: req.body.remarks,
      installdoc: req.file.path,
       filename: spec
    }
  )
    .then(installation => {
      res.status(200).json({ msg: "installation Updated Successfully" });
    })
    .catch(installation => {
      res.status(400).json({ msg: "Error in updating installation" });
    });
});

router.post("/product/:id/:productdetails_id", (req, res) => {
  let updateObj = { $set: {} };
  for (var param in req.body) {
    updateObj.$set["productdetails.$." + param] = req.body[param];
  }
  Installation.update(
    { "productdetails._id": req.params.productdetails_id },
    {
      $set: {
        "productdetails.$.proregtn": req.body.proregid,
        "productdetails.$.newserialno": req.body.newserialno
      }
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Unable to update productdetails." });
      } else {
        res.status(200).json({
          msg: "Bakor! You got this Update again"
        });
      }
    }
  );
});
//==================Delete the Proreg =========================
router.delete("/product/:id/:productdetails_id", (req, res) => {
  Installation.findById(req.params.id)
    .then(installation => {
      // Check to see if Product exists
      if (
        installation.productdetails.filter(
          productdetail =>
            productdetail._id.toString() === req.params.productdetails_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ message: "Product Details does not exist" });
      }

      // Get remove index
      const removeIndex = installation.productdetails
        .map(item => item._id.toString())
        .indexOf(req.params.productdetails_id);

      // Splice product out of array
      installation.productdetails.splice(removeIndex, 1);

      installation.save().then(installation => res.json(installation));
    })
    .catch(err => res.status(404).json({ message: "No Installation found" }));
});

//Delete Installation Details Data using their ids
router.delete("/delete/:id", (req, res) => {
  Installation.findById(req.params.id)
    .then(installation =>
      installation
        .remove()
        .then(installation =>
          res
            .status(200)
            .json({ msg: "Installation Details Deleted Successfully" })
        )
    )
    .catch(installation =>
      res.status(400).json({ msg: "Error in deleting Installation Details" })
    );
});


// for parsing multipart/form-data
router.use(upload.array());

//================Adding a product to the Installation ID======================
router.post("/product/:id", (req, res, headers) => {
  Installation.findByIdAndUpdate(req.params.id)
    .then(install => {
      const eixistProductDetails = {
        proregtn: req.body.proregid,
        newserialno: req.body.newserialno
      };
      install.productdetails.push(eixistProductDetails);
      install.save().then(data => res.json(data));
    })
    .catch(err => res.json(err));
});

module.exports = router;




