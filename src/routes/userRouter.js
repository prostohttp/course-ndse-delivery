const express = require("express");
const user = require("../controllers/userController");
const passport = require("../config/passport");

const userRouter = express.Router();

userRouter.put("/signup", user.add);
userRouter.post("/signin", (req, res, next) => {
	passport.authenticate("local", (err, user) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (!user) {
			return res
				.status(401)
				.json({ error: "Неверный email или пароль", status: "error" });
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			const userData = {
				id: user._id,
				email: user.email,
				name: user.name,
				contactPhone: user.contactPhone,
			};

			return res.status(200).json({ data: userData, status: "ok" });
		});
	})(req, res, next);
});
userRouter.get("/user/:email", user.search);

module.exports = userRouter;
