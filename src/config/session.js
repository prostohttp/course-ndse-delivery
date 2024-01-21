const session = require("express-session");

module.exports = session({
	secret: process.env.SESSION_SECRET || "SUPER_SECRET_KEY",
	resave: false,
	saveUninitialized: true,
});
