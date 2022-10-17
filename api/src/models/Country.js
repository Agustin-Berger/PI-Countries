const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("country", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      primaryKey: true,
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    continente: {
      type: DataTypes.STRING,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    poblacion: {
      type: DataTypes.FLOAT,
    },
    zonaHoraria: {
      type: DataTypes.STRING,
    },
    onu: {
      type: DataTypes.BOOLEAN,
    },
  });
};
