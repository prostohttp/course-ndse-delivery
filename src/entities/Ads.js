const mongoose = require("mongoose");
const Ads = require("../models/Ads");

class Advertisement {
	static async create(data) {
		const newAds = new Ads(data);
		const savedAds = await newAds.save();
		return savedAds;
	}

	static async find(params) {
		const query = {
			isDeleted: false,
			$and: [],
		};
		if ("shortText" in params) {
			query.$and.push({ shortText: { $regex: params.shortText } });
		}
		if ("description" in params) {
			query.$and.push({ description: { $regex: params.description } });
		}
		if ("userId" in params) {
			query.$and.push({ userId: new mongoose.Types.ObjectId(params.userId) });
		}
		return await Ads.find(query);
	}

	static async get(id) {
		const ads = await Ads.findById(id);
		return ads;
	}

	static async getAll() {
		const ads = await Ads.find();
		return ads;
	}

	// static async remove(id) {
	// 	const deletedAds = await Ads.findById(id);
	// 	deletedAds.isDeleted = true;
	// 	await deletedAds.save();
	// 	return deletedAds;
	// }
	static async remove(id) {
		const updatedAds = await Ads.updateOne({ _id: id }, { isDeleted: true });
		return updatedAds;
	}
}

module.exports = Advertisement;
