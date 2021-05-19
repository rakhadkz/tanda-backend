const mongoose = require("mongoose");

const ProductDetail = mongoose.model(
	"ProductDetail", new mongoose.Schema({
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: true},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true
		},
		supplierId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Supplier",
			required: false
		},
		manufacturerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Manufacturer",
			required: false
		},
		prices: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductPrice",
			required: true
		}]
	})
);

module.exports = ProductDetail;