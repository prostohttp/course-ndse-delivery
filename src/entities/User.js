const User = require("../models/User");

class UserModule {
	static async create(data) {
		try {
			const newUser = new User(data);
			const savedUser = await newUser.save();
			return savedUser;
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}
	static async findByEmail(email) {
		try {
			const user = await User.findOne({ email });
			return user ? user : { user: null };
		} catch (error) {
			return {
				error: error.message,
			};
		}
	}
}

module.exports = UserModule;
