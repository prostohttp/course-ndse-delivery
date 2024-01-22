const asyncHandler = require("express-async-handler");

const ChatModule = require("../entities/Chat");

const findChat = asyncHandler(async (req, res) => {
	try {
		const chatUsers = req.query.users ? req.query.users.split(",") : [];
		const chat = await ChatModule.find(chatUsers);
		chat
			? res.send({ data: chat, status: "ok" })
			: res.status(404).send({ error: "Чат не найден", status: "ok" });
	} catch (error) {
		res.status(500).send({ error: error.message, status: "error" });
	}
});

const sendMessage = asyncHandler(async (req, res) => {
	try {
		const author = req.session.passport.user._id;
		const { receiver, text } = req.body;
		const message = await ChatModule.sendMessage({ author, receiver, text });
		message
			? res.send({ data: message, status: "ok" })
			: res
					.status(404)
					.send({ error: "Нет пользователя receiver", status: "ok" });
	} catch (error) {
		res.status(500).send({ error: error.message, status: "error" });
	}
});

const getHistory = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const chat = id !== undefined ? await ChatModule.getHistory(id) : null;
		chat
			? res.send({ data: chat, status: "ok" })
			: res.status(400).send({ error: "Не указан id чата", status: "ok" });
	} catch (error) {
		res.status(404).send({ error: "Чат не найден", status: "error" });
	}
});

module.exports = {
	find: findChat,
	send: sendMessage,
	history: getHistory,
};
