const Ads = require("../models/Ads");

class Advertisement {
	static async create(data) {
		const newAds = new Ads(data);
		const savedAds = await newAds.save();
		return savedAds;
	}

	static async find(params) {}

	static async findAll() {
		const ads = await Ads.find();
		return ads;
	}

	static async remove(id) {
		const deletedAds = await Ads.findById(id);
		deletedAds.isDeleted = true;
		await deletedAds.save();
		return deletedAds;
	}
}

module.exports = Advertisement;
