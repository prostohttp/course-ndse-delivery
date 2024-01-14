const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
		unique: false,
	},
	name: {
		type: String,
		required: true,
		unique: false,
	},
	contactPhone: {
		type: String,
		required: false,
		unique: false,
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
