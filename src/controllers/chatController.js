const asyncHandler = require("express-async-handler");

const ChatModule = require("../entities/Chat");

const findChat = asyncHandler(async (req, res) => {
	try {
		const chatUsers = req.query.users.split(",");
		const chat = await ChatModule.find(chatUsers);
		res.send({ data: chat, status: "ok" });
	} catch (error) {
		req.send({ error: error.message, status: "error" });
	}
});

const sendMessage = asyncHandler(async (req, res) => {
	try {
		const author = req.session.passport.user._id;
		const { receiver, text } = req.body;
		const message = await ChatModule.sendMessage({ author, receiver, text });
		res.send({ data: message, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

const getHistory = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const chat = await ChatModule.getHistory(id);
		res.send({ data: chat, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

module.exports = {
	find: findChat,
	send: sendMessage,
	history: getHistory,
};
