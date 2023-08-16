export interface ForecastWeatherData {
  forecast: {
    forecastDay: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        maxTempF: number;
        minTempF: number;
      };
    }[];
  };
  location: {
    name: string;
    region: string;
  };
}
