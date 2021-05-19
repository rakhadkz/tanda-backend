const mongoose = require("mongoose");

const Consulting = mongoose.model(
	"Consulting", new mongoose.Schema({
		recipeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe',
			required: true
		},
		date: {
			type: Date,
			required: true
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
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
		status: {
			type: String,
			default: "pending",
			enum: ["pending", "accepted", "declined", "cancelled", "rejected"]
		}
	})
);

module.exports = Consulting;