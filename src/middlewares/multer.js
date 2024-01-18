const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "src/uploads");
	},
	filename: (req, file, cb) => {
		if (file.mimetype.startsWith("image")) {
			cb(null, `${Date.now()}-${file.originalname}`);
		} else {
			cb(new Error("Allowed images only"), null);
		}
	},
});

module.exports = multer({ storage });
