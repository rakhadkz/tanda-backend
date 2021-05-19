const mongoose = require("mongoose");

const Supplier = mongoose.model(
	"Supplier", new mongoose.Schema({
		name: {
			type: String,
			required: true
		},
		logo: {
			type: String,
			required: true
		},
		addressId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: false
		},
		description: {
			type: String,
			required: true,
			maxlength: 800
		},
		contacts:[{
			type: {
				type: String,
				required: true,
				enum: ["vk", "phone", "instagram", "telegram", "link", "2gis", "facebook"]
			},
			value: {
				type: String,
				required: true
			}
		}]
	})
);

module.exports = Supplier;