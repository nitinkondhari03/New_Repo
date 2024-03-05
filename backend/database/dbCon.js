require("dotenv").config({ path: "../.env" });
const { Sequelize, DataTypes } = require("sequelize");

const dbConfig = {
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  dialect: process.env.PGDIALECT,
  logging: false,
};
const sequelize = new Sequelize(dbConfig);

sequelize
  .authenticate()
  .then(() => console.log("DataBase authenticated successfully!"))
  .catch((error) => console.log("database authentication failed", error));

const db = {};

db.sequelize = sequelize;

db.Users = require("../src/models/users")(sequelize, DataTypes);
db.Vote = require("../src/models/vote")(sequelize, DataTypes);
db.Votesusers = require("../src/models/voteuser")(sequelize, DataTypes);
db.Winner = require("../src/models/winner")(sequelize, DataTypes);

db.sequelize
  .sync()
  .then(() => console.log("Database synced successfully"))
  .catch((error) => console.log("Database synced failed", error));

module.exports = db;
