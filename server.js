const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
const fetchWeatherByCity = require("./controllers/fetchController").fetchWeatherByCity

const startUpRoutine = async () => {
    try {
      await fetchWeatherByCity();
      console.log("Data population completed");
    } catch (error) {
      console.error("Error populating data:", error);
    }
  };

// parse requests of content-type -application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my weather application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

const {
    weatherRoutes,
    forecastRoutes
} = require("./routes")

app.use('/weather', weatherRoutes)
app.use('/forecasts', forecastRoutes)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await startUpRoutine();
});
