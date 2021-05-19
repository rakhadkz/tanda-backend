const mongoose = require("mongoose");

const User = mongoose.model(
	"User", new mongoose.Schema({
	    name: {
			type: String,
			required: false,
			maxlength: 30,
			default: (user) => user.phone
		},
	    age: {
			type: Number,
			required: false,
			default: null
		},
	    gender: {
			type: String,
			required: false,
			default: null
		},
	    phone: {
			type: String,
			required: true,
			unique: true,
			minlength: 10,
			maxlength: 10
		},
	    image: {
			type: String,
			required: false,
		},
	    rating: [ 0, 0, 0, 0, 0 ],
	    status: {
			type: String,
			default: "pending",
			enum: ["pending", "verified", "blocked"]
		},
	    createdAt: {
			type: Date,
			default: Date.now()
		}
	})
);

module.exports = User;