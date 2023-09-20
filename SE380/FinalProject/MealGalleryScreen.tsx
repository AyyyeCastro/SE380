import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const GalleryView = () => {
  const navigation = useNavigation();

  const [mealData, setMealData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (searchQuery) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            // Check if data contains meals
            setMealData(data.meals);
          } else {
            // Handle the case where no meals were found
            setMealData([]);
          }
          setIsLoading(false); // Set isLoading to false when fetch is complete
        })
        .catch((error) => {
          console.error("Error fetching meal data:", error);
          setIsLoading(false); // Set isLoading to false on error
          // Handle the error gracefully, for example, by displaying an error message to the user.
        });
    } else {
      // I believe the API has a max fetch limit of 25 meals each
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            // Check if data contains meals
            setMealData(data.meals);
          } else {
            // Handle the case where no meals were found
            setMealData([]);
          }
          setIsLoading(false); // Set isLoading to false when fetch is complete
        })
        .catch((error) => {
          console.error("Error fetching meal data:", error);
          setIsLoading(false); // Set isLoading to false on error
          // Handle the error gracefully, for example, by displaying an error message to the user.
        });
    }
  }, [searchQuery]);

  const handleOnPressGrid = (
    meal: { strMealThumb: string; strMeal: string },
    imageUri: string
  ) => {
    navigation.navigate("Recipe Info", { meal, imageUri });
  };

  const renderGridItem = ({
    item,
  }: {
    item: { strMealThumb: string; strMeal: string };
  }) => {
    return (
      <TouchableOpacity
        style={[styles.gridItem]}
        onPress={() => handleOnPressGrid(item, item.strMealThumb)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  };

  console.log(mealData.length);

  // Conditional rendering based on isLoading
  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search Recipes"
        style={styles.textInput}
      />

      {isLoading ? ( // Render loading message if isLoading is true
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={mealData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={renderGridItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
    padding: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "50%",
    aspectRatio: 1,
    marginBottom: 5,
    marginLeft: 5,
  },
  image: {
    borderColor: "gray",
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 10,
  },
  fullViewImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    aspectRatio: 1,
  },
  closeIconContainer: {
    position: "absolute",
    top: 285,
    right: 30,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },

  textInput: {
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 50,
  },
});

export default GalleryView;
