const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.weatherController.getAllWeathers(res);
})

router.get('/:city', (req, res) => {
    Controllers.weatherController.getWeatherForCity(req, res)
})

router.post('/add', (req, res) => {
    Controllers.weatherController.postWeatherForCity(req.body, res)
})

router.put('/:city', (req, res) => {
    Controllers.weatherController.updateWeatherForCity(req, res)
})

router.delete('/:city', (req, res) => {
    Controllers.weatherController.deleteWeatherForCity(req, res)
})

module.exports = router;
