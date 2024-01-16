const Message = require("../models/Message");

class MessageModule {
	static async create(data) {
		const newMessage = new Message(data);
		const savedMessage = await newMessage.save();
		return savedMessage;
	}
}

module.exports = MessageModule;
