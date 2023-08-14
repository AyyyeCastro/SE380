import { View, Text, Button } from "react-native";
// new imports
import { useNavigation } from "@react-navigation/native";
// new imports
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="WK3: - PhotoGallery"
        onPress={() => navigation.navigate("Gallery")}
      />
      <Button
        title="WK3: - PhotoGallery (again)"
        onPress={() => navigation.navigate("Gallery")}
      />
    </View>
  );
}
