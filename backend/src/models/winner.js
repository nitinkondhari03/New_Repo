module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("winner", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    winner: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    winner_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return Model;
};
