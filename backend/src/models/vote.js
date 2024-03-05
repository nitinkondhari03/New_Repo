module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("vote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    voting_candidate: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  });
  return Model;
};
