const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "src/uploads");
	},
	filename: (req, file, cb) => {
		if (file.mimetype !== "image/jpeg") {
			cb(new Error("Allowed images only"), null);
		} else {
			cb(null, `${Date.now()}-${file.originalname}`);
		}
	},
});

module.exports = multer({ storage });
