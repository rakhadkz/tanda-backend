const mongoose = require("mongoose");

const ProductOrder = mongoose.model(
	"ProductOrder", new mongoose.Schema({
		destinationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true
		},
		created: {
			type: Date,
			required: true,
			default: Date.now()
		},
		shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: true
		},
		shopperId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shopper",
			required: true
		},
		deliverAt: {
			type: mongoose.Schema.Types.Date,
			default: null,
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
	    authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
	    productIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "OrderProduct",
			required: true
		}],
	    delivery: {
	        distance: {
	        	type: Number,
				required: false
			},
	        price: {
	        	type: Number,
				required: false
	        }
	    },
	    couponId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Coupon",
			required: false
		},
	    response: {
			type: String,
			required: false
		},
	    codes: [{
			value: Number,
			correct: Boolean
		}],
	})
);

module.exports = ProductOrder;