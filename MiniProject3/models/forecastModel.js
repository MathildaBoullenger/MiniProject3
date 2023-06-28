const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class ForecastModel extends Model {}
//Sequelize will create this table if it doesn't exist on startup
ForecastModel.init(
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
    day: {
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
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "forecasts", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ForecastModel;
