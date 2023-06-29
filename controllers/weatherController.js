"use strict";
const Models = require("../models");

const getAllWeathers = (res) => {
  Models.WeatherModel.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getWeatherForCity = (req, res) => {
  Models.WeatherModel.findOne({ where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const postWeatherForCity = (data, res) => {
  Models.WeatherModel.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateWeatherForCity = (req, res) => {
  Models.WeatherModel.update(req.body, { where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteWeatherForCity = (req, res) => {
  Models.WeatherModel.destroy({ where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllWeathers,
  getWeatherForCity,
  postWeatherForCity,
  updateWeatherForCity,
  deleteWeatherForCity,
};
