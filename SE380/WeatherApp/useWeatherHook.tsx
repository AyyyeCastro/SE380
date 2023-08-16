import axios from "axios";
import { ForecastWeatherData } from "./WeatherConditions";
import { mapResponseToForecastWeatherData } from "./ForecastUtility";

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "40c671d69b9c4422b0a202414231408";

export const useWeatherHook = () => {
  const getCurrentWeather = async (location: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}current.json?q=${location}&key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Current Weather error:", error);
      throw error;
    }
  };

  const getForecast = async (location: string, days: number) => {
    try {
      const response = await axios.get(
        `${BASE_URL}forecast.json?q=${location}&days=${days}&key=${API_KEY}`
      );
      const forecastData: ForecastWeatherData =
        mapResponseToForecastWeatherData(response);
      return forecastData;
    } catch (error) {
      console.error("Forecast error: ", error);
      throw error;
    }
  };

  return { getCurrentWeather, getForecast };
};
