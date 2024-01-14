const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: false,
	},
	sentAt: {
		type: Date,
		required: true,
		unique: false,
	},
	text: {
		type: String,
		required: true,
		unique: false,
	},
	readAt: {
		type: Date,
		required: false,
		unique: false,
	},
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
