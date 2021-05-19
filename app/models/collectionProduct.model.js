const mongoose = require("mongoose");

const CollectionProduct = mongoose.model(
	"CollectionProduct", new mongoose.Schema({
		collectionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Collection",
			required: true
		},
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
	    checked: {
			type: Boolean,
			default: false,
			required: true
		},
	    quantity: {
			type: Number,
			default: 0,
			required: true
		},
	    replacementForId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: null,
			required: false
		}
	})
);

module.exports = CollectionProduct;