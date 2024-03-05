const jwt = require("jsonwebtoken");
const db = require("../../database/dbCon");
require("dotenv").config({ path: "../../.env" });
const Model = db.Users;

//User

const isAuththenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.send("PLease is  Login");
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res.send("Please is Login");
    }
    req.user = await Model.findOne({ where: { id: decodedData.id } });
    next();
  } catch (error) {
    res.send(error);
  }
};

//Admin
const authorizeRoles = (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.send({ mesaage: "You are Not Admin" });
    }
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = { isAuththenticatedUser, authorizeRoles };
