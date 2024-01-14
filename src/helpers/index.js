const bcrypt = require("bcrypt");

const passwordHash = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports = {
	passwordHash,
};
