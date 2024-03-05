module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("votesusers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voting_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Model;
};
