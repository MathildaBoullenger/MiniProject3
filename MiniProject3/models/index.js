"use strict";
const WeatherModel = require("./weatherModel");
const ForecastModel = require("./forecastModel")

async function init() {
    await WeatherModel.sync(); //sync the model
    await ForecastModel.sync();
   };

init();

module.exports = {
    WeatherModel,
    ForecastModel
}