const winnerroute = require("express").Router();
const {
  WinnnerFromsubmit,
  Winnnerfindone,
  Winnerupdate,
} = require("../controllers/winner");
const { isAuththenticatedUser, authorizeRoles } = require("../middleware/auth");

winnerroute.post("/winnerform", isAuththenticatedUser,authorizeRoles, WinnnerFromsubmit);
winnerroute.get("/winner/:id", isAuththenticatedUser, Winnnerfindone);
winnerroute.patch("/winnerupdate/:id", isAuththenticatedUser, Winnerupdate);

module.exports = winnerroute;
