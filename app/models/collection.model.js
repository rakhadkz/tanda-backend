const mongoose = require("mongoose");

const Collection = mongoose.model(
	"Collection", new mongoose.Schema({
		name: {
			type: String,
			required: true,
			maxlength: 30,
			minlength: 1
		},
    	cover: {
			type: String,
			required: true,
			default: "default"
		},
    	members: {
			type: Number,
			default: 1
		},
    	shopId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shop",
			required: false
		},
		public: {
			type: Boolean,
			default: false,
			required: true
		}
	})
);

module.exports = Collection;