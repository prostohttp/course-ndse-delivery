const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/userRouter");
const adsRouter = require("./routes/adsRouter");
const chatRouter = require("./routes/chatRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/", userRouter);
app.use("/api/advertisements", adsRouter);
app.use("/api/chat", chatRouter);

const start = async (port, url) => {
	await mongoose.connect(url, {
		dbName: "delivery",
	});
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const MONGO_EXPRESS_URL =
	process.env.MONGO_EXPRESS_URL ||
	"mongodb://mongo:27017/";
start(HTTP_PORT, MONGO_EXPRESS_URL);
