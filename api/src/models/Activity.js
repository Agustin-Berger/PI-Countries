const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("activity", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dificultad: {
      type: DataTypes.FLOAT,
    },
    duracion: {
      type: DataTypes.STRING,
    },
    temporada: {
      type: DataTypes.STRING,
    },
  });
};
