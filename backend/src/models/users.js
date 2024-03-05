module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter Phone Number" },
        len: { args: [10, 10], msg: "Phone Number is invalid" },
        isInt: { args: true, msg: "You must enter Phone Number" },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    },
  });
  return Model;
};
