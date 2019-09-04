const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductVerificationSchema = new Schema({
    serialno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "proreg"
    },
    installationdetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "installation"
    },
    amcdetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "amcregistration" 
    },
    servicehistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "complaint" 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ProductVerification = mongoose.model('productverification', ProductVerificationSchema);