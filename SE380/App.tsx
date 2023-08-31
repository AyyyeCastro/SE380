import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

/* from Week 3 */
import GalleryView from "./PhotoGallery/GalleryView";
import PhotoDetails from "./PhotoGallery/PhotoDetails";

/* for Week 4 */
import { HomeScreen } from "./HomeScreen";
import CurrentWeatherScreen from "./WeatherApp/CurrentWeatherScreen";
import ForecastScreen from "./WeatherApp/ForecastScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Header, createStackNavigator } from "@react-navigation/stack";

/* New for Week 5 */
import BarCodeScannerScreen from "./BarcodeScanner/BarCodeScannerScreen";
import ProductDetailScreen from "./BarcodeScanner/ProductDetailScreen";
import FavoritedItemsScreen from "./BarcodeScanner/FavoritedItemsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDesktop,
  faHeart,
  faListUl,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";


/* New for Week6 */
import ChargeView from "./ShakeChargeApp/ChargeScreen";
/*****************************************************************/



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const WeatherDrawer = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: true, drawerPosition: "left" }}
    initialRouteName="CurrentWeatherScreen"
  >
    <Drawer.Screen name="Current Weather" component={CurrentWeatherScreen} />
    <Drawer.Screen
      name="Forecast"
      component={ForecastScreen}
      initialParams={{ query: "02886" }}
    />
  </Drawer.Navigator>
);

const BarcodeTab = () => (
  <Tab.Navigator
    initialRouteName="Scan"
    screenOptions={{
      unmountOnBlur: true,
      tabBarActiveTintColor: "#443dff", // Set the active tab color
      tabBarInactiveTintColor: "gray", // Set the inactive tab color
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#f0f0fc", // Set the background color of the tab bar
        borderTopWidth: 0, // Remove the top border
      },
    }}
  >
    <Tab.Screen
      name="Scan"
      component={BarCodeScannerScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faQrcode} color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorited Items"
      component={FavoritedItemsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faHeart} color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{
        tabBarButton: () => null,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false, drawerPosition: "right" }}
          initialRouteName="Gallery App"
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Charging App" component={ChargeView} />
          <Drawer.Screen name="Weather App" component={WeatherDrawer} />
          <Drawer.Screen name="Barcode App" component={BarcodeTab} />
          <Drawer.Screen name="Gallery App" component={GalleryView} />
          <Drawer.Screen
            name="PhotoDetails"
            component={PhotoDetails}
            options={{ drawerLabel: () => null }}
          />
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
