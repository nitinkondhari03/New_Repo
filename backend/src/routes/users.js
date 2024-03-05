const userroute = require("express").Router();
const controller = require("../controllers/users");
const { isAuththenticatedUser } = require("../middleware/auth");

userroute.post("/register", controller.registerUser);
userroute.post("/login", controller.loginUser);
userroute.get(
  "/userprotected",
  isAuththenticatedUser,
  controller.userprotected
);

module.exports = userroute;
