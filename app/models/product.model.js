const mongoose = require("mongoose");

const Product = mongoose.model(
	"Product", new mongoose.Schema({
		shortNameId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductShortName",
			required: true
		},
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false,
			maxlength: 800
		},
		images: [{
			type: String,
			required: true
		}],
		marks: [{
			type: String,
			required: true
		}],
		details: [{
			name: {
				type: String,
				required: true
			},
			details: {
				type: String,
				required: true
			}
		}],
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductCategory",
			required: true
		}
	})
);

module.exports = Product;