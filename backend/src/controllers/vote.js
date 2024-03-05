const db = require("../../database/dbCon");
const Model = db.Vote;

const VotesFromsubmit = async (req, res) => {
  const { email, username } = req.user;
  const { name, voting_candidate } = req.body;
  try {
    const votingform = await Model.create({
      name,
      email,
      username,
      voting_candidate,
    });
    res.status(201).json({ message: "Form Create Successful" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const VotesFromGetAll = async (req, res) => {
  try {
    const votes = await Model.findAll();
    res.send(votes);
  } catch (error) {
    res.send(error);
  }
};

const VotesGetdataid = async (req, res) => {
  const { id } = req.params;
  try {
    const votes = await Model.findAll({ where: { id: id } });
    res.send(votes);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { VotesFromsubmit, VotesFromGetAll, VotesGetdataid };
