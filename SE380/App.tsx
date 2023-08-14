import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GalleryView from "./PhotoGallery/GalleryView";
import PhotoDetails from "./PhotoGallery/PhotoDetails";
import { HomeScreen } from "./HomeScreen";
import { WeatherHome } from "./WeatherApp/WeatherHome";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export type StackParamList = {
  Gallery: undefined;
  PhotoDetails: { id: number; url: string };
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" drawerType="Slide">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Gallery App" component={GalleryView} />
        <Drawer.Screen
          name="PhotoDetails"
          component={PhotoDetails}
          options={{
            drawerItemStyle: { height: 0 },
          }}
        />
        <Drawer.Screen name="Weather App" component={WeatherHome} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});
