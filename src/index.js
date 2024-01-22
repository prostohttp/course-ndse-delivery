const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const swaggerDocument = require("./swagger.json");
const session = require("./config/session");

const passport = require("./config/passport");
const userRouter = require("./routes/userRouter");
const adsRouter = require("./routes/adsRouter");
const chatRouter = require("./routes/chatRouter");
const Chat = require("./entities/Chat");
const ChatModel = require("./models/Chat");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/", userRouter);
app.use("/api/advertisements", adsRouter);
app.use("/api/chat", chatRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


io.engine.use(session);

io.on("connection", (socket) => {
	const currentUserId = socket.request.session.passport.user._id;
	socket.on("getHistory", async (id) => {
		const chat = await ChatModel.findOne({
			users: { $all: [currentUserId, id] },
		});
		const chatId = chat._id;
		const chatHistory = await Chat.getHistory(chatId);
		socket.emit("chatHistory", chatHistory);
	});

	socket.on("sendMessage", async (receiver, text) => {
		const data = await Chat.sendMessage({ currentUserId, receiver, text });
		socket.emit("newMessage", data);
	});
});

const start = async (port, url) => {
	await mongoose.connect(url, {
		dbName: "delivery",
	});

	httpServer.listen(port, () => {
		console.log(`Server with Socket.io started on port ${port}`);
	});
};

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const MONGO_EXPRESS_URL =
	process.env.MONGO_EXPRESS_URL || "mongodb://mongo:27017/";
start(HTTP_PORT, MONGO_EXPRESS_URL);
