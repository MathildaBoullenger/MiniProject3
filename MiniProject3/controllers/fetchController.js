const axios = require("axios");
const WeatherModel = require("../models/weatherModel");
const ForecastModel = require("../models/forecastModel");
let dbConnect = require("../dbConnect");

// fetch weather data for a single city
const fetchWeatherForCity = async (city) => {
  try {
    const response = await axios.get(
      `https://goweather.herokuapp.com/weather/${city}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // specific errors
      const status = error.response.status;
      if (status === 404 || status === 503) {
        console.log(`No weather data available for ${city}. Skipping...`);
        return null;
      }
    }
    // handle other errors
    console.error(`Error fetching weather data for ${city}:`, error.message);
    return null;
  }
};

// weather data for multiple cities
const fetchWeatherByCity = async () => {
  try {
    const myCities = [
      "Tokyo",
      "Delhi",
      "Shanghai",
      "Sao Paulo",
      "Mumbai",
      "Beijing",
      "Cairo",
      "Dhaka",
      "Mexico City",
      "Osaka",
      "Karachi",
      "Chongqing",
      "Istanbul",
      "Buenos Aires",
      "Kolkata",
      "Kinshasa",
      "Lagos",
      "Manila",
      "Rio de Janeiro",
      "Guangzhou",
      "Lahore",
      "Shenzhen",
      "Bangalore",
      "Moscow",
      "Tianjin",
      "Jakarta",
      "London",
      "Lima",
      "Bangkok",
      "New York City",
      "Bogota",
      "Ho Chi Minh City",
      "Hong Kong",
      "Baghdad",
      "Riyadh",
      "Singapore",
      "Santiago",
      "Los Angeles",
      "Chennai",
      "Bengaluru",
      "Paris",
      "Izmir",
      "Nagoya",
      "Hyderabad",
      "Surat",
      "Johannesburg",
      "Wuhan",
      "Houston",
      "Dallas",
      "Toronto",
      "Berlin",
      "Madrid",
      "Philadelphia",
      "Seoul",
      "Miami",
      "Kabul",
      "Phoenix",
      "Hanoi",
      "Milan",
      "Pune",
      "Changchun",
      "Abidjan",
      "Nairobi",
      "Ahmedabad",
      "Khartoum",
      "Rome",
      "Dar es Salaam",
      "Jaipur",
      "Accra",
      "Athens",
      "Conakry",
      "Guayaquil",
      "Chittagong",
      "Kanpur",
      "Algiers",
      "Ibadan",
      "Kowloon",
      "Basra",
      "Kampala",
      "Palembang",
      "Damascus",
      "Karaj",
      "Ludhiana",
      "Nagpur",
      "Lusaka",
      "San Juan",
      "Monterrey",
      "Tashkent",
      "Tangerang",
      "Santo Domingo",
      "Porto Alegre",
      "Sana'a",
      "Birmingham",
      "Brussels",
      "Havana",
      "Beirut",
      "Patna",
      "Alexandria",
      "Asuncion",
      "Kuala Lumpur",
    ];

    const weatherDataPromises = myCities.map((city) =>
      fetchWeatherForCity(city)
    );
    const weatherDataResponses = await Promise.all(weatherDataPromises);

    const allData = [];
    const forecastData = [];

    for (let i = 0; i < weatherDataResponses.length; i++) {
      const response = weatherDataResponses[i];
      const city = myCities[i];

      if (response) {
        const { temperature, wind, forecast } = response;
        let cityData = null;

        if (temperature !== null && wind !== null) {
          cityData = {
            city,
            temperature,
            wind,
          };

          allData.push(cityData);
        }

        if (forecast) {
          const day1Data = forecast[0];

          if (
            day1Data.day !== null &&
            day1Data.temperature !== null &&
            day1Data.wind !== null
          ) {
            const day1Entry = {
              city,
              day: day1Data.day,
              temperature: day1Data.temperature,
              wind: day1Data.wind,
            };

            forecastData.push(day1Entry);

            console.log(`Added day one forecast for ${city}`);
          } else {
            console.log(`No day one forecast data available for ${city}`);
          }
        } else {
          console.log(`No weather data available for ${city}. Skipping...`);
        }
      }
    }

    // adding the data to the model
    await WeatherModel.sync();
    await ForecastModel.sync();

    await WeatherModel.bulkCreate(allData);
    //console.log(`Added ${allData.length} cities to the weathers table`);

    await ForecastModel.bulkCreate(forecastData);
    //console.log(`Added ${forecastData.length} cities to the forecasts table`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

module.exports = {
  fetchWeatherByCity,
};
