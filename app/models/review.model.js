const mongoose = require("mongoose");

const Review = mongoose.model(
	"Review", new mongoose.Schema({
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		body: {
			type: String,
			default: null,
			maxlength: 800
		},
		createdAt: {
			type: Date,
			default: Date.now()
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true
		},
		images: [String]
	})
);

module.exports = Review;