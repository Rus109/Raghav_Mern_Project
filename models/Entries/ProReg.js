const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var dateData = new Date(2019-11-11)
var dataIDate1 = dateData.toISOString().substr(0, 10);
// Create Schema
const ProRegSchema = new Schema({
  refno1: {
    type: String
  },
  refno2: {
    type: String
  },
  date: {
    type: Date
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer"
  },
  customertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customertype"
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customersubdepartment"
  },

  products: [
    {
      oem: {
        type: Schema.Types.ObjectId,
        ref: "company"
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productcategory"
      },
      subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsubcategory"
      },
      modelno: {
        type: String
      },
      serialno: {
        type: String,
        required: true
      },
      warrantyfrom: {
        type: Date,
        default: dataIDate1
      },
      warrantyto: {
        type: Date,
        default: dataIDate1
      },
      oemwarrantyfrom: {
        type: Date,
        default: "01-01-2019"
      },
      oemwarrantyto: {
        type: Date,
        default: "01-01-2019"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProReg = mongoose.model("proreg", ProRegSchema);
