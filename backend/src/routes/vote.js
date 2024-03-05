const voteroute = require("express").Router();
const {
  VotesFromsubmit,
  VotesFromGetAll,
  VotesGetdataid,
} = require("../controllers/vote");
const { isAuththenticatedUser, authorizeRoles } = require("../middleware/auth");

voteroute.post(
  "/votesform",
  isAuththenticatedUser,
  authorizeRoles,
  VotesFromsubmit
);
voteroute.get("/vote", isAuththenticatedUser, VotesFromGetAll);
voteroute.get("/vote/:id", isAuththenticatedUser, VotesGetdataid);

module.exports = voteroute;




