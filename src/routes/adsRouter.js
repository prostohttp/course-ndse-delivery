const express = require("express");

const fileMulter = require("../middlewares/multer");
const ads = require("../controllers/adsController");
const errorHandler = require("../middlewares/errorHandler");
const isAuthenticated = require("../middlewares/isAuthenticated");

const adsRouter = express.Router();

adsRouter.post(
	"/",
	isAuthenticated,
	fileMulter.array("images", 10),
	errorHandler,
	ads.create,
);
adsRouter.get("/", errorHandler, ads.getAll);
adsRouter.get("/filter", errorHandler, ads.find);
adsRouter.get("/:id", ads.get);
adsRouter.delete("/:id", errorHandler, isAuthenticated, ads.delete);

module.exports = adsRouter;
