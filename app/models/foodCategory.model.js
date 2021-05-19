const mongoose = require("mongoose");

const FoodCategory = mongoose.model(
	"FoodCategory", new mongoose.Schema({
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		lastMonday: {
			type: Date,
			default: new Date()
		},
		count: {
			type: Number,
			default: 0
		},
		orders: {
			type: Number,
			default: 0
		},
		lessons: {
			type: Number,
			default: 0
		}
	})
);

module.exports = FoodCategory;