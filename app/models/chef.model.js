const mongoose = require("mongoose");

const Chef = mongoose.model(
	"Chef", new mongoose.Schema({
		name: {
	        first: {
	        	type: String,
				required: true,
				maxlength: 30,
				minlength: 2
			},
	        last: {
	        	type: String,
				required: false,
				maxlength: 30
	        }
	    },
	    workingDays: [{
	    	type: String,
	    	enum: ["mon", "tue", "wed", "thu", "fri", "sun", "sat"],
	    	required: true
	    }],
	    phone: {
			type: String,
			required: true,
			unique: true,
			minlength: 10,
			maxlength: 10
		},
	    rating: {
			type: [Number],
			default: [ 0, 0, 0, 0, 0 ]
		},
		avgRating: {
			type: Number,
			default: null
		},
	    image: {
			type: String,
			required: true
		},
	    about: {
			type: String,
			default: null,
			maxlength: 800
		},
	    lessons: {
			type: Number,
			default: 0
		},
	    recipes: {
			type: Number,
			default: 0
		},
	    orders: {
			type: Number,
			default: 0
		},
	    status: {
			type: String,
			default: "pending",
			enum: ["pending", "verified", "blocked"]
		},
	    createdAt: {
			type: Date,
			default: Date.now()
		},
		city: {
			type: String,
			default: "Shymkent"
		}
	})
);

module.exports = Chef;