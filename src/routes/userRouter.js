const express = require("express");
const user = require("../controllers/userController");

const userRouter = express.Router();

userRouter.put("/add", user.add);
userRouter.get("/search/:email", user.search);

module.exports = userRouter;
