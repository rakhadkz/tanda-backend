const mongoose = require("mongoose");

const MasterClassMember = mongoose.model(
	"MasterClassMember", new mongoose.Schema({
		masterClassId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MasterClass",
			required: true
		},
		memberId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	})
);

module.exports = MasterClassMember;