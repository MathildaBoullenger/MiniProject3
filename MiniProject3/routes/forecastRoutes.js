const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.forecastController.getAllForecasts(res);
})

router.get('/:city', (req, res) => {
    Controllers.forecastController.getForecastForCity(req, res)
})

router.post('/add', (req, res) => {
    Controllers.forecastController.postForecastForCity(req.body, res)
})

router.put('/:city', (req, res) => {
    Controllers.forecastController.updateForecastForCity(req, res)
})

router.delete('/:city', (req, res) => {
    Controllers.forecastController.deleteForecastForCity(req, res)
})

module.exports = router;