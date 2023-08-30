import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useWeatherHook } from "./useWeatherHook";
import { FlatListForecast } from "./FlatListForecast";

const Tab = createBottomTabNavigator();

const ForecastScreen = () => {
  const { getForecast } = useWeatherHook();
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecast = await getForecast("02886", 7);
        setForecastData(forecast);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  if (!forecastData) {
    return <Text>Loading...</Text>;
  }

  const { forecast } = forecastData;

  return (
    <Tab.Navigator>
      <Tab.Screen name="3 Day Forecast" options={{ title: "3 Days Forecast" }}>
        {() => <FlatListForecast forecast={forecast.forecastDay.slice(0, 3)} />}
      </Tab.Screen>
      <Tab.Screen name="5 Days Forecast" options={{ title: "5 Days Forecast" }}>
        {() => <FlatListForecast forecast={forecast.forecastDay.slice(0, 5)} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ForecastScreen;
