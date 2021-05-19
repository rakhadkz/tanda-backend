const mongoose = require("mongoose");

const LegalDocument = mongoose.model(
	"LegalDocument", new mongoose.Schema({
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
	    documents: [{
	    	type: String, 
	    	required: true
		}],
		status: {
			type: String,
			default: "pending",
			enum: ["pending", "accepted", "declined"]
		}
	})
);

module.exports = LegalDocument;
