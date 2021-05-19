const mongoose = require("mongoose");

const ProductSet = mongoose.model(
	"ProductSet", new mongoose.Schema({
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
			required: true
		},
		productProductIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true
		}],
		productPriceIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductPrice",
			required: true
		}],
		discount: [{
			productId: {
				type: String,
				required: true
			},
			discount: {
				type: Number,
				required: false
			}
		}]
	})
);

module.exports = ProductSet;