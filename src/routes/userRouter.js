const express = require("express");
const user = require("../controllers/userController");

const userRouter = express.Router();

userRouter.put("/signup", user.add);
userRouter.get("/user/:email", user.search);

module.exports = userRouter;
