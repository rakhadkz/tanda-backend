const mongoose = require("mongoose");

const Comment = mongoose.model(
	"Comment", new mongoose.Schema({
		recipeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe",
			required: true
		},
		body: {
			type: String,
			required: true,
			maxlength: 800
		},
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			required: false,
			default: null
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		replyToId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
			default: null
		}
	})
);

module.exports = Comment;