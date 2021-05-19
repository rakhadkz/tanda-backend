const mongoose = require("mongoose");

const ProductPrice = mongoose.model(
	"ProductPrice", new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: true
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true
		},
		unit: {
			type: String,
			required: true
		},
		unitDetails: {
			type: String,
			default: null,
			required: false
		},
		cost: {
			type: Number,
			required: true
		},
		increment: {
			type: Number,
			required: true
		},
		defaultQuantity: {
			type: Number,
			required: true
		},
		lastUpdated: {
			type: Date,
			default: new Date()
		},
		type: {
			type: Number,
			required: true
		},
		discount: {
			type: Number,
			required: false
		}
	})
);

module.exports = ProductPrice;