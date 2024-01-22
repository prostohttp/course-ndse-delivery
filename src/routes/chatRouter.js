const express = require("express");

const chat = require("../controllers/chatController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const errorHandler = require("../middlewares/errorHandler");

const adsRouter = express.Router();

adsRouter.get("/", errorHandler, chat.find);
adsRouter.post("/message", errorHandler, isAuthenticated, chat.send);
adsRouter.get("/history/:id?", errorHandler, chat.history);

module.exports = adsRouter;
