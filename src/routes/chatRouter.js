const express = require("express");

const chat = require("../controllers/chatController");

const adsRouter = express.Router();

adsRouter.get("/", chat.find);
adsRouter.post("/message", chat.send);
adsRouter.get("/history/:id", chat.history);

module.exports = adsRouter;
