import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const FavoritedItemsScreen = ({ navigation }) => {
  const { getItem } = useAsyncStorage("@favorited_items");
  const [favoritedItems, setFavoritedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritedItemsData = await getItem();
        if (favoritedItemsData) {
          const parsedFavoritedItems = JSON.parse(favoritedItemsData);
          const uniqueFavoritedItems = parsedFavoritedItems.filter(
            (item, index, self) =>
              self.findIndex((t) => t.qrCodeURL === item.qrCodeURL) === index
          );
          setFavoritedItems(uniqueFavoritedItems);
        }
      } catch (error) {
        console.error("Error fetching favorited items:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate("ProductDetail", { qrCodeURL: item.qrCodeURL });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritedItems}
        keyExtractor={(item) => item.qrCodeURL}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row", 
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTitle: {
    fontSize: 16,
  },
});

export default FavoritedItemsScreen;
