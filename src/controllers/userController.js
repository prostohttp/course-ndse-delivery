const asyncHandler = require("express-async-handler");

const UserModule = require("../entities/User");
const { passwordHash } = require("../helpers");

const addUser = asyncHandler(async (req, res) => {
	const user = req.body;
	const hash = await passwordHash(user.passwordHash, 10);
	user.passwordHash = hash;
	const newUser = await UserModule.create(user);
	res.send(newUser);
});

const searchUser = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const user = await UserModule.findByEmail(email);
	res.send(user);
});

module.exports = {
	add: addUser,
	search: searchUser,
};
