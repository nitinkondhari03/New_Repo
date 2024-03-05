const db = require("../../database/dbCon");
const Model = db.Votesusers;

const VotesFrom = async (req, res) => {
  const { id } = req.params;
  const { email, username } = req.user;
  const { voting_name } = req.body;
  try {
    const votingform = await Model.create({
      email,
      username,
      vote_id: id,
      voting_name,
    });
    res.status(201).json({ data: votingform, message: "Vote Successful" });
  } catch (error) {
    res.send(error);
  }
};

const Votesuseridcheck = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  try {
    const votes = await Model.findAll({ where: { vote_id: id, email: email } });
    res.send(votes);
  } catch (error) {
    res.send(error);
  }
};

const Votesuserallvote = async (req, res) => {
  const { id } = req.params;
  try {
    const votes = await Model.findAll({ where: { vote_id: id } });
    res.send(votes);
  } catch (error) {
    res.send(error);
  }
};
module.exports = { VotesFrom, Votesuseridcheck, Votesuserallvote };
