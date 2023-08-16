// WeatherUtils.ts
import { AxiosResponse } from 'axios';
import { ForecastWeatherData } from './WeatherConditions';

export const mapResponseToForecastWeatherData = (
  response: AxiosResponse<any>
): ForecastWeatherData => {
  const { forecast, location } = response.data;
  return {
    forecast: {
      forecastDay: forecast.forecastday.map((forecastDay: any) => ({
        date: forecastDay.date,
        day: {
          nameOfDay: forecastDay.date, // Replace with the actual key for day name in the API response
          condition: forecastDay.day.condition,
          icon: forecastDay.day.condition.text,
          maxTempF: Math.round(forecastDay.day.maxtemp_f),
          minTempF: Math.round(forecastDay.day.mintemp_f),
        },
      })),
    },
    location: {
      name: location.name,
      region: location.region,
    },
  };
};


