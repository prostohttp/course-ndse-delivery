const User = require("../models/User");

class UserModule {
	static async create(data) {
		const newUser = new User(data);
		const savedUser = await newUser.save();
		return savedUser;
	}
	static async findByEmail(email) {
		const user = await User.findOne({ email });
		return user;
	}
	static async getById(id) {
		const user = await User.findById(id);
		return user;
	}
}

module.exports = UserModule;
