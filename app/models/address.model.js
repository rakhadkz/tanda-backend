const mongoose = require("mongoose");

const Address = mongoose.model(
	"Address", new mongoose.Schema({
		country: {
			type: String,
			required: true,
			default: "KZ"
		},
		city: {
			type: String,
			required: true,
			default: "Shymkent"
		},
		street: {
			type: String,
			required: true
		},
	    zipCode: {
			type: Number,
			required: false,
			default: null
		},
		location: {
			type: {
				type: String,
				enum: ["Point"], 
				required: true
			},
			coordinates: [{
				type: Number,
				required: true
			}]
		},
		originId: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			default: null
		}
	})
);

module.exports = Address;