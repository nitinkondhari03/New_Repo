require("dotenv").config({ path: "../../.env" });
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../database/dbCon");
const Model = db.Users;

//Register
const registerUser = async (req, res) => {
  const { username, email, password, phonenumber } = req.body;
  try {
    const user = await Model.findOne({ where: { email: email } });
    if (user) {
      return res.json({ message: "Email already Exit" });
    }
    var passwordhash = bcryptjs.hashSync(password, 8);
    const result = await Model.create({
      username,
      email,
      password: passwordhash,
      phonenumber,
    });
    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ message: "Please Enter Email && Password" });
    }
    const user = await Model.findOne({ where: { email: email } });
    if (!user) {
      return res.json({ message: "wrong credentials" });
    }
    const hashcheck = bcryptjs.compareSync(password, user.password);
    if (!hashcheck) {
      return res.json({ message: "wrong credentials" });
    }
    let id = user.id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    let users = {
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
    };
    res.status(201).json({ token, user: users, message: "Login Successful" });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

//User check Protected
const userprotected = async (req, res) => {
  const { username, email, phonenumber, role } = req.user;
  try {
    res.send({ username, email, phonenumber, role });
  } catch (error) {
    rea.send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userprotected,
};
