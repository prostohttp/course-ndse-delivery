const asyncHandler = require("express-async-handler");
const fs = require("fs");

const AdsModule = require("../entities/Ads");
const { splitTags } = require("../helpers");

const createAds = asyncHandler(async (req, res) => {
	try {
		const body = req.body;
		const images = req.files;
		const ads = {
			shortText: body.shortText,
			description: body.description,
			images: images.map((image) => image.filename),
			userId: body.userId,
			createdAt: body.createdAt || Date.now(),
			updatedAt: body.updatedAt || Date.now(),
			tags: splitTags(body.tags),
			isDeleted: body.isDeleted,
		};
		const newAds = await AdsModule.create(ads);
		res.send({ data: [newAds], status: "ok" });
	} catch (error) {
		if (req.files) {
			req.files.forEach((file) => {
				fs.unlink(file.path, (err) => {
					if (err) {
						console.error(`Ошибка при удалении файла: ${file.path}`);
					}
				});
			});
		}
		res.status(500).send({
			error: error.message,
			status: "error",
		});
	}
});

const getAds = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const ads = await AdsModule.get(id);
		res.send({ data: ads, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

const findAds = asyncHandler(async (req, res) => {
	try {
		const queryParams = req.query;
		const ads = await AdsModule.find(queryParams);
		res.send({ data: ads, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

const getAllAds = asyncHandler(async (req, res) => {
	try {
		const ads = await AdsModule.getAll();
		res.send({ data: ads, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

const deleteAds = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const ads = await AdsModule.remove(id);
		res.send({ data: ads, status: "ok" });
	} catch (error) {
		res.send({ error: error.message, status: "error" });
	}
});

module.exports = {
	create: createAds,
	find: findAds,
	getAll: getAllAds,
	delete: deleteAds,
	get: getAds,
};
