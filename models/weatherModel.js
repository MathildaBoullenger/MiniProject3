const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class WeatherModel extends Model {}
//Sequelize will create this table if it doesn't exist on startup
WeatherModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    wind: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "weathers", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = WeatherModel;
