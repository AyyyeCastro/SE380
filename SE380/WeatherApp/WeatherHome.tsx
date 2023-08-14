import { View, Text, Button } from "react-native";
// new imports
import { useNavigation } from "@react-navigation/native";
// new imports
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
import GalleryView from "../PhotoGallery/GalleryView";
import { HomeScreen } from "../HomeScreen";

export function WeatherHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      
      <Text> Welcome to the weather app. Currently nothing is displayed. Yet, it's somehow just as accurate as other weather apps!</Text>
      <Button
        title="Go Back Home"
        onPress={() => navigation.navigate("Home")}
      />
            <Button
        title="Gallery App"
        onPress={() => navigation.navigate('Gallery App')}
      />
    </View>
  );
}
