const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AMCRegistrationSchema = new Schema({
	amcrefno: { type: String },
	amcregdate: { type: Date },
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'customer'
	},
	customertype: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'customertype'
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'customersubdepartment'
	},
	serviceprovider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'serviceprovider'
	},
	amcstartdate: { type: Date },
	amcexpiredate: { type: Date },
	productno: {type: String },
	products: [
		{
			oem: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'company'
			},
			category: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'productcategory'
			},
			subcategory: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'productsubcategory'
			},
			modelno: {
				type: String
			},
			serialno: {
				type: String,
				required: true
			},
			newdata: {
				type: Boolean,
				required: true,
				default: false
			}
		}
	]
	,
	remarks: { type: String },
	entrydate: {
		type: Date,
		dafault: Date.now
	}
});
module.exports = AMCRegistration = mongoose.model('amcregistration', AMCRegistrationSchema);
