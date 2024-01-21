const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const { comparePassword } = require("../helpers");

const verify = async (email, password, done) => {
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return done(null, false);
		}
		const correctPassword = await comparePassword(password, user.passwordHash);
		return correctPassword ? done(null, user) : done(null, false);
	} catch (error) {
		return done(error, false);
	}
};

const options = {
	usernameField: "email",
	passwordField: "passwordHash",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
	const foundedUser = await User.findById(user._id);
	if (!foundedUser) {
		cb({ error: "Такой пользователь не найден" });
	} else {
		cb(null, foundedUser);
	}
});

module.exports = passport;
