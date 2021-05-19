const mongoose = require("mongoose");

const MasterClass = mongoose.model(
	"MasterClass", new mongoose.Schema({
		recipeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe",
			required: true
		},
		date: {
			type: Date,
			required: true
		},
		limit: {
			type: Number,
			required: true,
			max: 15
		},
		members: {
			type: Number,
			required: true,
			default: 0
		},
		duration: {
			type: Number,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		platform: {
			name: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: true
			}
		},
		terms: [{
			text: {
				type: String,
				required: true
			},
			index: {
				type: Number,
				required: true
			}
		}],
		requirements: [{
			field: {
				type: String,
				required: false
			},
			parameter: {
				type: mongoose.Schema.Types.String,
				default: "=",
				required: false
			},
			value: {
				type: String,
				required: false
			}
		}],
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chef",
			required: true
		}
	})
);

module.exports = MasterClass;