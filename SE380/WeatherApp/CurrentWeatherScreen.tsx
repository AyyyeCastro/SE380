import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useWeatherHook } from "./useWeatherHook";

const CurrentWeatherScreen = () => {
  const { getCurrentWeather } = useWeatherHook();
  const [currentWeather, setCurrentWeather] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getCurrentWeather("02886");
        setCurrentWeather(weatherData);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  if (!currentWeather) {
    return <Text>Loading...</Text>;
  }

  const { location, current } = currentWeather;

  return (
    <View style={styles.container}>
      <Text style={styles.regionText}>
        {location.name}, {location.region}
      </Text>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: `https:${current.condition.icon}` }}
          // rip ppi clarity
          style={{ width: 164, height: 164 }}
        />
        <Text style={styles.conditionText}>{current.condition.text}</Text>
        <Text style={styles.temperatureText}>{current.temp_f}°F</Text>
      </View>
    </View>
  );
};

export default CurrentWeatherScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D9DE3",
    padding: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  regionText:{
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    padding: 15,
  },
  conditionText:{
    fontWeight:'200',
    fontSize: 30,
  },
  temperatureText:{
    fontWeight:'600',
    fontSize: 20,
    padding: 5,
  },
  innerContainer: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.80)",
    width: "90%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
