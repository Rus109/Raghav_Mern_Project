const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    oem: {
      type: mongoose.Schema.Types.ObjectId,
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
    modelno: { type: String },
         //DATES
        //OEM
    oemwarrantyfrom: { 
      type: Date,
      default: "11-11-1111"
    },
    oemwarrantyto: { 
      type: Date,
      default: "11-11-1111"
     },
       //SERVICE PROVIDER
    warrantyfrom: { 
      type: Date,
      default: "11-11-1111" 
    },
    warrantyto: { 
      type: Date,
      default: "11-11-1111" 
    },
    serialno: { type: String },    
  });

const ProductRegistrationSchema = new Schema({
    //Product Details
    _id: { type: mongoose.Schema.Types.ObjectId },
    refno1: { type: String },
    refno2: { type: String },
    data: [DataSchema],
    prodregdate: { type: Date },
    //Details of Customer buying the product
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
     remarks: { type: String },
    entrydate: {
        type: Date,
        dafault: Date.now
    } 
    // data: [{
    //     product: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "product"                      
    //     },
    //      //DATES
    //     //OEM
    //     oemwarrantyfrom: { type: Date },
    //    oemwarrantyto: { type: Date },
    //    //SERVICE PROVIDER
    //    warrantyfrom: { type: Date },
    //    warrantyto: { type: Date },
    //    serialno: { type: String },    
    // }],
  
});


module.exports = ProductRegistration = mongoose.model('productregistration', ProductRegistrationSchema);