const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
	shortText: {
		type: String,
		required: true,
		unique: false,
	},
	description: {
		type: String,
		required: false,
		unique: false,
	},
	images: {
		type: [String],
		required: false,
		unique: false,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: false,
	},
	createdAt: {
		type: Date,
		required: true,
		unique: false,
	},
	updatedAt: {
		type: Date,
		required: true,
		unique: false,
	},
	tags: {
		type: [String],
		required: false,
		unique: false,
	},
	isDeleted: {
		type: Boolean,
		required: true,
		unique: false,
	},
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);
module.exports = Advertisement;
