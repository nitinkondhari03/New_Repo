const voteuserroute = require("express").Router();
const {
  VotesFrom,
  Votesuseridcheck,
  Votesuserallvote,
} = require("../controllers/voteuser");
const { isAuththenticatedUser, authorizeRoles } = require("../middleware/auth");

voteuserroute.post("/votes/:id", isAuththenticatedUser, VotesFrom);

voteuserroute.get("/votesid/:id", isAuththenticatedUser, Votesuseridcheck);

voteuserroute.get(
  "/votescount/:id",
  isAuththenticatedUser,
  authorizeRoles,
  Votesuserallvote
);

module.exports = voteuserroute;
