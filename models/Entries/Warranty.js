const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarrantySchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productregistration"
    },
    warrantyprovider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "serviceprovider"
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
    warrantystartdate: { type: Date },
    warrantyexpiredate: { type: Date },
    remarks: { type: String },
    entrydate: {
        type: Date,
        dafault: Date.now
    }
});
module.exports = Warranty = mongoose.model('warranty', WarrantySchema);