const express = require("express");

const fileMulter = require("../middlewares/multer");
const ads = require("../controllers/adsController");
const errorHandler = require("../middlewares/errorHandler");

const adsRouter = express.Router();

adsRouter.post(
	"/",
	fileMulter.array("images", 10),
	errorHandler,
	ads.create
);
adsRouter.get("/", ads.getAll);
adsRouter.get("/find", ads.find);
adsRouter.get("/:id", ads.get);
adsRouter.delete("/:id", ads.delete);

module.exports = adsRouter;
