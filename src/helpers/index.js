const bcrypt = require("bcrypt");

const passwordHash = async (password, salt) => {
	return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

const splitTags = (text) => {
	return text ? text.split(",").map((tag) => tag.trim().replace(/'/g, "")) : [];
};

module.exports = {
	passwordHash,
	comparePassword,
	splitTags,
};
