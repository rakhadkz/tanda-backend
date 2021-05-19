const mongoose = require("mongoose");

const Shop = mongoose.model(
	"Shop", new mongoose.Schema({
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
			required: true
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
		}],
		workingHours: [{
			day: {
				type: String,
				required: true, 
				enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
			},
			start: {
				type: Number,
				required: true
			},
			end: {
				type: Number,
				required: true
			}
		}],
		rating: [{
			type: Number,
			min: 1,
			max: 5,
			required: true
		}]
	})
);

module.exports = Shop;