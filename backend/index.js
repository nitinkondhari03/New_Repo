const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const userroute = require("./src/routes/users");
const voteroute = require("./src/routes/vote");
const voteuserroute = require("./src/routes/voteuser");
const winnerroute = require("./src/routes/winner");
const PORT = process.env.PORT;;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userroute);
app.use(voteroute);
app.use(voteuserroute);
app.use(winnerroute);

app.get("/", (req, res) => {
  res.send({ message: "welcome to the RESTful API!" });
});

app.listen(PORT, () => {
  console.log(`Server is Runnig PORT ${PORT}`);
});
