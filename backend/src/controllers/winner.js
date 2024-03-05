const db = require("../../database/dbCon");
const Model = db.Winner;

const WinnnerFromsubmit = async (req, res) => {
  const { winner, winner_status } = req.body;
  try {
    const winnerform = await Model.create({ winner, winner_status });
    res.status(201).json({ message: "Form Create Successful" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const Winnnerfindone = async (req, res) => {
  const { id } = req.params;
  try {
    const votes = await Model.findAll({ where: { id: id } });
    res.send(votes);
  } catch (error) {
    res.send(error);
  }
};

const Winnerupdate = async (req, res) => {
  const { id } = req.params;
  const { winner_status, winner } = req.body;
  try {
    const votes = await Model.update(
      { winner_status, winner },
      { where: { id: id } }
    );
    res.send("update suceefull");
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = { WinnnerFromsubmit, Winnnerfindone, Winnerupdate };
