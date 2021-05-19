const mongoose = require("mongoose");

const ProductShortName = mongoose.model(
	"ProductShortName", new mongoose.Schema({
		name: {
			type: String,
			required: true
		}
	})
);

module.exports = ProductShortName;