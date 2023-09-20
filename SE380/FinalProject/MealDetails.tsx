import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FavoriteButton from "./FavoriteButton";

const MealDetails = ({ route }) => {
  const { meal, imageUri } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);
  const { getItem, setItem } = useAsyncStorage("@favoritedMeals");

  const fillAni = new Animated.Value(0);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const favoritedMealsData = await getItem();
        if (favoritedMealsData) {
          const favoritedMeals = JSON.parse(favoritedMealsData);
          const mealIsFavorited = favoritedMeals.some(
            (favMeal: { idMeal: any; }) => favMeal.idMeal === meal.idMeal
          );
          setIsFavorited(mealIsFavorited);
        }
      } catch (error) {
        console.error("Error checking if meal is favorited:", error);
      }
    };
  
    checkIfFavorited();

    Animated.timing(fillAni, {
      toValue: 1,
      duration: 350, // Adjust the duration as needed
      useNativeDriver: false, // Set this to false for layout animations
    }).start();
  }, [getItem, meal, fillAni]);

  const toggleFavorite = async () => {
    try {
      const favoritedMealsData = await getItem();
      const favoritedMeals = favoritedMealsData
        ? JSON.parse(favoritedMealsData)
        : [];
  
      const mealIsFavorited = favoritedMeals.some(
        (favMeal: { idMeal: any; }) => favMeal.idMeal === meal.idMeal
      );
  
      if (mealIsFavorited) {
        // Remove the meal from favorites
        const updatedFavoritedMeals = favoritedMeals.filter(
          (favMeal: { idMeal: any; }) => favMeal.idMeal !== meal.idMeal
        );
        await setItem(JSON.stringify(updatedFavoritedMeals));
        setIsFavorited(false);
      } else {
        // Add the meal to favorites
        favoritedMeals.push(meal);
        await setItem(JSON.stringify(favoritedMeals));
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (meal[ingredientKey] && meal[measureKey]) {
        ingredients.push(
          <Text key={i} style={styles.ingredientText}>
            • {meal[measureKey]} {meal[ingredientKey]}
          </Text>
        );
      }
    }

    return ingredients;
  };

  const renderInstructions = () => {
    if (meal.strInstructions) {
      const sentences = meal.strInstructions.split(".");
      return sentences.map((sentence: string, index: React.Key | null | undefined) => (
        <Text key={index} style={styles.instructionText}>
          {" "}
          {sentence.trim()}
        </Text>
      ));
    }
    return null;
  };

  return (
    <ScrollView>
      {/* Conditional rendering based on imageUri */}
      {imageUri ? (
        <Animated.View
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: fillAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={{ uri: imageUri }} style={styles.image} />
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: fillAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        </Animated.View>
      )}

      <View style={styles.parentContainer}>
        <Text style={styles.mealName}>{meal.strMeal}</Text>
        <Text style={styles.mealCat}>{meal.strCategory}</Text>

        <View style={styles.ingredientsContainer}>
          <Text style={styles.containerHeaders}>Ingredients:</Text>
          {renderIngredients()}
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.containerHeaders}>Instructions:</Text>
          {renderInstructions()}
        </View>

          <FavoriteButton onPress={toggleFavorite} isFavorited={isFavorited} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    padding: 30,
  },
  ingredientsContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  containerHeaders: {
    fontWeight: "300",
    fontSize: 23,
    marginBottom: 2,
  },
  ingredientText: {
    marginTop: 2,
    fontWeight: "300",
  },
  instructionsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  instructionText: {
    marginTop: 20,
    fontWeight: "300",
  },
  image: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 1,
  },
  mealName: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    textAlign: "center",
  },
  mealCat: {
    fontWeight: "400",
    fontSize: 23,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default MealDetails;
