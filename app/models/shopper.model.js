const mongoose = require("mongoose");

const Shopper = mongoose.model(
	"Shopper", new mongoose.Schema({
		name: {
	        first: {
	        	type: String,
				required: true,
				minlength: 2,
				maxlength: 30
			},
	        last: {
	        	type: String,
				required: false,
				maxlength: 30
	        }
	    },
	    workingHours: [{
			day: {
				type: String,
				required: true, 
				enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
			},
			start: {
				type: Number,
				required: true
			},
			end: {
				type: Number,
				required: true
			}
		}],
		rating: [{
			type: Number,
			min: 1,
			max: 5,
			required: false
		}],
	    phone: {
			type: Number,
			required: true,
			unique: true
		},
	    image: {
			type: String,
			required: false
		},
	    status: {
			type: String,
			required: true,
			enum: ["pending", "verified", "blocked"]
		},
	    createdAt: {
			type: Date,
			required: true,
			default: Date.now()
		}
	})
);

module.exports = Shopper;