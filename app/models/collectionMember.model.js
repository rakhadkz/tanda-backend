const mongoose = require("mongoose");

const CollectionMember = mongoose.model(
	"CollectionMember", new mongoose.Schema({
		collectionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Collection",
			required: true
		},
		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		state: {
			type: String,
			default: "pending",
			required: true,
			enum: [ "pending", "blocked", "verified" ]
		},
		role: {
			type: String,
			default: "member",
			required: true,
			enum: [ "member", "author" ]
		}
	})
);

module.exports = CollectionMember;