const asyncHandler = require("express-async-handler");

const UserModule = require("../entities/User");
const { passwordHash } = require("../helpers");

const addUser = asyncHandler(async (req, res) => {
	try {
		const user = req.body;
		const hash = await passwordHash(user.passwordHash, 10);
		user.passwordHash = hash;
		const newUser = await UserModule.create(user);
		res.send({ data: newUser, status: "ok" });
	} catch (error) {
		res.status(409).send({
			error: error.message,
			status: "error",
		});
	}
});

// const loginUser = asyncHandler(async (req, res) => {
// 	try {
// 		const requestUser = req.user;
// 		const user = {
// 			_id: requestUser._id,
// 			email: requestUser.email,
// 			name: requestUser.name,
// 			contactPhone: requestUser.contactPhone,
// 		};
// 		res.json({ data: user, status: "ok" });
// 	} catch (error) {
// 		res.json({
// 			error: error.message,
// 			status: "error",
// 		});
// 	}
// });

const searchUser = asyncHandler(async (req, res) => {
	try {
		const email = req.params.email;
		const user = await UserModule.findByEmail(email);
		user ? res.send({ data: user }) : res.status(404).send({});
	} catch (error) {
		res.status(404).send({
			error: error.message,
			status: "error",
		});
	}
});

const findById = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const user = await UserModule.getById(id);
		res.send({ data: user });
	} catch (error) {
		res.send({
			error: error.message,
			status: "error",
		});
	}
});

module.exports = {
	add: addUser,
	search: searchUser,
	findById: findById,
	// signin: loginUser,
};
