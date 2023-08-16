import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryView from "./PhotoGallery/GalleryView";
import PhotoDetails from "./PhotoGallery/PhotoDetails";
import { HomeScreen } from "./HomeScreen";
import CurrentWeatherScreen from "./WeatherApp/CurrentWeatherScreen";
import ForecastScreen from "./WeatherApp/ForecastScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const WeatherDrawer = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false, drawerPosition: "left"}}
    initialRouteName="CurrentWeatherScreen"
    
  >
    <Drawer.Screen
      name="Current Weather"
      component={CurrentWeatherScreen}
    />
    <Drawer.Screen
      name="Forecast"
      component={ForecastScreen}
      initialParams={{ query: "02886" }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false, drawerPosition: "right" }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Weather App" component={WeatherDrawer} />
          <Drawer.Screen name="Gallery App" component={GalleryView} />
          <Drawer.Screen name="PhotoDetails" component={PhotoDetails} options={{ drawerLabel: () => null }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    marginTop: "15%",
    flex: 1,
  },
});
