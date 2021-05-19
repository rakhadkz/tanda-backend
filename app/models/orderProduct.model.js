const mongoose = require("mongoose");

const OrderProduct = mongoose.model(
	"OrderProduct", new mongoose.Schema({
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true
		},
		productPriceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductPrice",
			required: true
		},
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true
		},
	    replacementForId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: null,
			required: false
		},
	    quantity: {
			type: Number,
			required: true
		},
	    foundQuantity: {
			type: Number,
			required: false
		},
	    finalPrice: {
			type: Number,
			required: false
		}
	})
);

module.exports = OrderProduct;