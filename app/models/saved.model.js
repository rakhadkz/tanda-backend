const mongoose = require("mongoose");

const Saved = mongoose.model(
	"Saved", new mongoose.Schema({
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		recipeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe",
			required: true
		}
	})
);

module.exports = Saved;