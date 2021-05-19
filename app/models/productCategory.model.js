const mongoose = require("mongoose");

const ProductCategory = mongoose.model(
	"ProductCategory", new mongoose.Schema({
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
			required: true
		},
		count: {
			type: Number,
			required: true
		},
		orders: {
			type: Number,
			required: true
		},
		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			default: null,
			required: false
		}
	})
);

module.exports = ProductCategory;