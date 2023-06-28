const axios = require("axios");
const WeatherModel = require("../models/weatherModel");

// Function to fetch weather data for a single city
const fetchWeatherForCity = async (city) => {
  try {
    const response = await axios.get(
      `https://goweather.herokuapp.com/weather/${city}`
    );
    return response.data;
  } catch (error) {
    // Handle specific errors if needed
    if (error.response) {
      // Error with response from the server
      const status = error.response.status;
      if (status === 404 || status === 503) {
        // Handle specific status codes
        console.log(`No weather data available for ${city}. Skipping...`);
        return null;
      }
    }
    // Log or handle other errors
    console.error(`Error fetching weather data for ${city}:`, error.message);
    return null;
  }
};

// Main function to fetch weather data for multiple cities
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
      "Kolkata",
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
      "Baghdad",
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
    ];

    const weatherDataPromises = myCities.map((city) =>
      fetchWeatherForCity(city)
    );
    const weatherDataResponses = await Promise.all(weatherDataPromises);

    const allData = [];

    for (let i = 0; i < weatherDataResponses.length; i++) {
      const response = weatherDataResponses[i];
      const city = myCities[i];

      if (response) {
        // Process the weather data
        const { temperature, wind } = response;
        const cityData = {
          city: city,
          temperature: temperature,
          wind: wind,
        };

        const existingCityData = allData.find((data) => data.city === city);
        if (!existingCityData) {
          console.log(cityData);
          allData.push(cityData);
        } else {
          // No weather data available
          console.log(`No weather data available for ${city}. Skipping...`);
        }
      }

    }

    await WeatherModel.sync();

    await WeatherModel.bulkCreate(allData);
    console.log(`Added ${allData.length} cities to the database`);

    // Optionally, save allData to a model or perform further processing
    
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

module.exports = {
  fetchWeatherByCity,
};
