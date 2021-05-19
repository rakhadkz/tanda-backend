const mongoose = require("mongoose");

const Recipe = mongoose.model(
	"Recipe", new mongoose.Schema({
		name: {
			type: String,
			required: true
		},
		images: [{
			url: {
				type: String,
				required: true
			},
			step: {
				type: Number,
				required: true
			},
			priority: {
				type: Number,
				required: true
			}
		}],
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chef",
			required: true
		},
		note: {
			text: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: true
			}
		},
		defaultPortion: {
			type: Number,
			required: true
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "FoodCategory",
			required: true
		},
		createdAt: {
			type: Date,
			default: new Date()
		},
		updatedAt: {
			type: Date,
			required: false
		},
		likes: {
			type: Number,
			default: 0
		},
		comments: {
			type: Number,
			default: 0
		},
		ingredients: [{
			name: {
				type: String,
				required: true
			},
			products: [{
				shortNameId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "ProductShortName"
				},
				required: {
					type: Boolean,
					required: true
				},
				quantity: {
					type: Number,
					required: true
				},
				unit: {
					type: String,
					required: true
				},
				replacementForId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "ProductShortName",
					required: false
				}
			}]
		}],
		steps: [{
			text: {
				type: String,
				required: true
			},
			note: {
				type: String,
				required: true
			}
		}],
		productPriceId: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProductPrice",
			required: true
		}],
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: false
		},
		mealPrice: {
			type: Number,
			default: null
		},
		consultingPrice: {
			type: Number,
			default: null
		}
	})
);

module.exports = Recipe;