import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const MealsFavorited = () => {
  const [favoritedMeals, setFavoritedMeals] = useState([]);
  const navigation = useNavigation();
  const { getItem } = useAsyncStorage("@favoritedMeals"); // Correct storage key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritedMealsData = await getItem(); // Use getItem method
        
        if (favoritedMealsData) {
          const parsedFavoritedMeals = JSON.parse(favoritedMealsData);
          const uniqueFavoritedMeals = parsedFavoritedMeals.filter(
            (meal: { idMeal: any; }, index: any, self: any[]) =>
              self.findIndex((t) => t.idMeal === meal.idMeal) === index
          );
          setFavoritedMeals(uniqueFavoritedMeals);
        }
      } catch (error) {
        console.error("Error fetching favorited meals:", error);
      }
    };

    fetchData();
  }, [getItem]);

  const renderFavoritedItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Recipe Info", { meal: item })}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritedMeals}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={renderFavoritedItem}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemTitle: {
    fontSize: 16,
  },
});

export default MealsFavorited;
