const mongoose = require("mongoose");

const MealOrder = mongoose.model(
	"MealOrder", new mongoose.Schema({
		destinationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true
		},
		originId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now()
		},
		shopperId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shopper",
			required: true
		},
	    authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
	    delivery: {
	        distance: {
	        	type: Number,
				default: null
			},
	        price: {
	        	type: Number,
				default: null
	        }
	    },
	    response: {
			type: String,
			required: true
		},
	    codes: [{
			value: Number,
			correct: Boolean
		}],
	    deliverAt: {
			type: Date,
			required: false
		},
	    status: {
			type: String,
			required: true,
			default: "pending",
			enum: ["pending", "created", "accepted", "rejected", "preparing", "prepared", "delivering", "delivered", "done", "declined", "notReceived", "notDelivered"]
		},
		states: {
			type: [{
				date: {
					type: Date,
					required: true
				},
				status: {
					type: String,
					required: true,
					enum: ["pending", "created", "accepted", "rejected", "preparing", "prepared", "delivering", "delivered", "done", "declined", "notReceived", "notDelivered"]
				}
			}],
			default: [{
				date: Date.now(),
				status: "pending"
			}]
		},
	    mealIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe",
			required: true
		}],
	    counts: [{
	        recipeId: {
	        	type: String,
				required: true
			},
	        count: {
	        	type: Number,
				required: true,
				default: 1
	        }
	    }]
	})
);

module.exports = MealOrder;