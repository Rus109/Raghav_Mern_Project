const express = require("express");
const router = express.Router();

// Order Model
const Order = require("../../../models/Master/Order");
const Product = require("../../../models/Master/Products");

//Load Validations
const validateOrderInput = require("../../../validation/master/order");

//Read all the orders data
router.get("/", (req, res) => {
  Order.find()
    .sort({ date: -1 })
    .populate("product",['oem', 'modelno'])
    .then(order => res.json(order));
});

//Read one particular order data using their id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .populate("product")
    .then(order => res.status(200).json(order))
    .catch(err => res.status(400).json({ msg: "Order Not Found" }));
});

//Create a new order
router.post("/add", (req, res) => {
  const newOrder = new Order({
    orderno: req.body.orderno,
    product: req.body.productid,
    customername: req.body.customername,
    contactno: req.body.contactno,
    billingaddress: req.body.billingaddress,
    quantity: req.body.quantity,
    address: req.body.address
  });

  newOrder.save().then(order => res.json(order));
});

//Update Order using their ids
router.post("/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then(order => res.status(200).json({ msg: "Order Updated Successfully" }))
    .catch(order => res.status(400).json({ msg: "Error in updating Order" }));
});

//Deleting Orders using their ids
router.delete("/:id", (req, res) => {
  Order.findById(req.params.id, req.body).then(order =>
    order
      .remove()
      .then(order =>
        res.status(200).json({ msg: "Order Deleted Successfully" })
      )
      .catch(order => res.status(400).json({ msg: "Error in deleting Order" }))
  );
});

module.exports = router;
