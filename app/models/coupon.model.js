const mongoose = require("mongoose");

const Coupon = mongoose.model(
	"Coupon", new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		percentage: {
			type: Number,
			required: true
		},
		used: {
			type: Boolean,
			required: true,
			default: false
		}
	})
);

module.exports = Coupon;