const mongoose = require("mongoose");

const ProductCategoryCount = mongoose.model(
	"ProductCategoryCount", new mongoose.Schema({
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			required: true
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: true
		},
		count: {
			type: Number,
			required: true,
			default: 0
		},
		lastMonday: {
			type: Date,
			required: true
		},
		orders: {
			type: Number,
			required: true,
			default: 0
		}
	})
);

module.exports = ProductCategoryCount;