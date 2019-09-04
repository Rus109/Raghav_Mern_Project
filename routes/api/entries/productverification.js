const express = require('express');
const router = express.Router();

//importing the ProductVerification Schema
const ProdVer = require('../../../models/Entries/ProductVerfication');
const Proreg = require('../../../models/Entries/ProReg');
const install = require('../../../models/Entries/Installation');
const AMC = require('../../../models/Entries/AMCRegistration');
const compt = require('../../../models/Entries/Complaints');

//Create a new Product Verfication data
router.post('/add', (req, res) => {
    const newProdVer = new ProdVer({
        serialno: req.body.productregistrationid,
        installationdetails: req.body.installationdetailsid,
        amcdetails: req.body.amcregistrationid,
        servicehistory: req.body.complaintid
    });
    newProdVer.save().then(prodver => res.json(prodver));
});

//Get all the Product Verfication data
router.get('/', (req, res) => {
    ProdVer.find()
            .sort({ date: -1 })
            .populate('serialno', ['refno1'])
            .populate('installation', ['installrefno'])
            .populate('amcdetails', ['amcrefno'])
            .populate('servicehistory', ['complaintno'])
            .then(prodver => res.json(prodver));
});

// Get data from Product Registration
router.post("/serialnoproreg", (req, res) => {
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

//====================Installation Serial Number========================
router.post(
  "/installation/newserialno",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    install
      .find(
        // { _id: req.params.fid },
        {
          "productdetails.newserialno": req.body.newserialno
        },
        //Take the exact serialno
        {
          products: {
            $elemMatch: {
              newserialno: req.body.newserialno
            }
          }
        }
      )
      .select("installrefno")
      .select("installdate")
      .select("serialno")
      .select("contactperson")
      .select("contactno")
      .select("address")
      .select("remarks")
      .populate("installedby", "name")
      .populate("customer", "customername")
      .populate("customertype", "customertype")
      .populate("department", "department")
      .select("productdetails")
      .then(instDetails => res.json(instDetails))
      .catch(err => res.json(err));
  }
);

//====================Complaint Serial Number========================
router.post(
  "/complaint/newserialno",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    compt
      .find(
        // { _id: req.params.fid },
        {
          "complaints_pro_details.complaints_serialno":
            req.body.complaints_serialno
        },
        //Take the exact serialno
        {
          products: {
            $elemMatch: {
              complaints_serialno: req.body.complaints_serialno
            }
          }
        }
      )
      .select("complaintdate")
      .select("problemdetails")
      .select("status")
      .select("complaints_pro_details")
      .then(instDetails => res.json(instDetails))
      .catch(err => res.json(err));
  }
);

router.get("/amc/:serialnoamc", (req, res) => {
  AMC.find(
    { "products.serialno": req.params.serialnoamc },
    //Take the exact serialno
    {
      products: {
        $elemMatch: { serialno: req.params.serialnoamc }
      }
    }
  )

    .select("amcrefno")
    .select("amcregdate")
    .select("amcstartdate")
    .select("amcexpiredate")
    .populate("customer", "customername")
    .populate("customertype", "customertype")
    .populate("department", "department")
    .populate("serviceprovider", "providername")
    //Populating the product nested array in object
    .populate("products.oem", "companyname")
    .populate("products.category", "category")
    .populate("products.subcategory", "subcategory")
    .then(inst => res.json(inst))
    .catch(err => res.json(err));
});



// Get Warranty details from Product Registration
router.get("/proreg/:warrantydate", (req, res) => {
  Proreg.find(
    { "products.serialno": req.params.warrantydate },
    //Take the exact serialno
    {
      products: {
        $elemMatch: { serialno: req.params.warrantydate }
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
  .then(prod => {
    var tempprod = [prod];
    var x = tempprod.map(item => {
      return item;
    })

    console.log(x.products)
  })
    
    .catch(err => res.json(err));
});

//Read all the Warrenty Data
router.get("/edit/:id", (req, res) => {
    ProdVer.findByIdAndUpdate(req.params.id)
      .sort({ date: -1 })
      .populate('serialno', ['refno1'])
      .populate('installation', ['installrefno'])
      .populate('amcdetails', ['amcrefno'])
      .populate('servicehistory', ['complaintno'])
      .then(amc => res.json(amc))
      .catch(amc => {
        res.status(400).json({ msg: "No Product Verification found with that ID" });
      });
  });

  //Update Warrenty using their ids
router.post("/update/:id", (req, res) => {
    ProdVer.findByIdAndUpdate(req.params.id, req.body)
      .then(amc => {
        res.status(200).json({ msg: "Product Verification Updated Successfully" });
      })
      .catch(amc => {
        res.status(400).json({ msg: "Error in updating Product Verification" });
      });
  });
module.exports = router;