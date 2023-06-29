const axios = require("axios"); // we use axios because Sequelize doesn't support fetch
const Models = require("../models");
let dbConnect = require("../dbConnect");

// fetch weather data for a single city
const fetchWeatherForCity = async (city) => {
  try {
// we need to wait for this fetching to finish before running the next step of the program
    const response = await axios.get(
// passing city as a parameter
      `https://goweather.herokuapp.com/weather/${city}` 
    );
// if the fetching is successful, we return the fetched data    
    return response.data; 
  } catch (error) {
    if (error.response) {
// specific errors accessed through response property 404: Not Found and 503: Service Unavailable.
      const status = error.response.status;
      if (status === 404 || status === 503) {
        console.log(`No weather data available for ${city}. Skipping...`);
// we are not returning any data in this case
        return null;
      }
    }
// handle other errors
    console.error(`Error fetching weather data for ${city}:`, error.message);
// we are not returning any data in this case
    return null;
  }
};

// weather data for multiple cities
const fetchWeatherByCity = async () => {
  try {
// array of 100 biggest cities worldwide
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
// we iterate through the cities defined above using map and fetch their data one by one
    const weatherDataPromises = myCities.map((city) =>
      fetchWeatherForCity(city)
    );
// we await for this process to be finished for all cities of 'myCities' and assign it to a response variable
    const weatherDataResponses = await Promise.all(weatherDataPromises);
// now we need to define the data we want to push into our database
// starting with an empty array
    const weatherData = [];
    const forecastData = [];
// we iterate over the responses, ensure that the right response is associated with the right city by using [i]
// and make them easily manipulable by assigning them to variables
    for (let i = 0; i < weatherDataResponses.length; i++) {
      const response = weatherDataResponses[i];
      const city = myCities[i];
// if the response exists, we destructure it to access its properties
      if (response) {
        const { temperature, wind, forecast } = response;
        let cityData = null;
// we only want to store objects which don't have null values
        if (temperature !== null && wind !== null) {
// we create an object using object literal syntax (directly in brackets)
// because the names city, temperature and wind are already defined in accessible scope
          cityData = {
            city,
            temperature,
            wind,
          };
// finally, the data for this city is pushed to the weatherData array
          weatherData.push(cityData);
          console.log(`Added weather for ${city}`);
        }
// similarly for forecasts, if forecast exists (from the response destructuring)
        if (forecast) {
// we access the data of the first object in the forecast array which is forecast for day one
          const day1Data = forecast[0];
// if the data for this day one (properties day, temperature, wind) are not empty
          if (
            day1Data.day !== null &&
            day1Data.temperature !== null &&
            day1Data.wind !== null
          ) {
// we use object literal syntax to create a new object
            const day1Entry = {
              city,
              day: day1Data.day,
              temperature: day1Data.temperature,
              wind: day1Data.wind,
            };
// which is then pushed into the array forecastData
            forecastData.push(day1Entry);
            console.log(`Added day one forecast for ${city}`);
// error handling for forecast data
          } else {
            console.log(`No day one forecast data available for ${city}`);
          }
// error handling for weather data
        } else {
          console.log(`No weather data available for ${city}. Skipping...`);
        }
      }
    }

// syncing the models
    await Models.WeatherModel.sync();
    await Models.ForecastModel.sync();

// pushing our weather data array to the weather model
    await Models.WeatherModel.bulkCreate(weatherData);
    console.log(`Added ${weatherData.length} cities to the weathers table`);

// pushing our forecast data to the forecast model
    await Models.ForecastModel.bulkCreate(forecastData);
    console.log(`Added ${forecastData.length} cities to the forecasts table`);

// in the case an error with the whole process above occurred
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

// we export the model used to fetch all cities only because this is the one we need to call in server.js
module.exports = {
  fetchWeatherByCity,
};
