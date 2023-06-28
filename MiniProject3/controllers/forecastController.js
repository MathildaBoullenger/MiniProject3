"use strict";
const Models = require("../models");

const getAllForecasts = (res) => {
  Models.ForecastModel.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getForecastForCity = (req, res) => {
  Models.ForecastModel.findOne({ where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const postForecastForCity = (data, res) => {
  Models.ForecastModel.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateForecastForCity = (req, res) => {
  Models.ForecastModel.update(req.body, { where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteForecastForCity = (req, res) => {
  Models.ForecastModel.destroy({ where: { city: req.params.city } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllForecasts,
  getForecastForCity,
  postForecastForCity,
  updateForecastForCity,
  deleteForecastForCity
};
