const mongoose = require("mongoose");

const ChatModel = require("../models/Chat");
const Message = require("../models/Message");

class Chat {
	static async find(users) {
		const chat = await ChatModel.findOne({ users });
		return chat;
	}

	static async sendMessage(data) {
		const { author, receiver, text } = data;
		let chat = await ChatModel.findOne({
			users: { $all: [author, receiver] },
		});

		const newMessage = new Message({
			author,
			sentAt: Date.now(),
			text,
		});
		await newMessage.save();

		const messageId = new mongoose.Types.ObjectId(newMessage._id);

		if (!chat) {
			const newChat = new ChatModel({
				users: [author, receiver],
				createdAt: Date.now(),
			});
			await newChat.save();
			newChat.messages.push(messageId);
			chat = newChat;
		} else {
			chat.messages.push(messageId);
		}
		await chat.save();
		return chat;
	}

	static async subscribe(func) {}

	static async getHistory(id) {}
}

module.exports = Chat;
