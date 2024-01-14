const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId, mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    required: true,
    unique: false,
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
    required: false,
    unique: false,
  },
})

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;