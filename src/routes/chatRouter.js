const express = require("express");

const chat = require("../controllers/chatController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const adsRouter = express.Router();

adsRouter.get("/", chat.find);
adsRouter.post("/message", isAuthenticated, chat.send);
adsRouter.get("/history/:id", chat.history);

module.exports = adsRouter;
