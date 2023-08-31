// ----- Imports ---- //
import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
// import { BlurView } from "expo-blur"; background should be completely solid for assignment.
// Expo icon set note from Prof Bowen: https://docs.expo.dev/guides/icons/
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoDetails from "../PhotoGallery/PhotoDetails"; // Import the PhotoDetails screen

/* Week 7 */
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

// Define ImageData interface code from Canvas WK2: Photo Gallery Assignment
interface ImageData {
  id: number;
  url: string;
}

// Loop provided from Canvas WK2: Photo Gallery HW Assignment
const imageData: ImageData[] = [];
for (let i = 503; i < 600; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

const Stack = createStackNavigator();

const GalleryView = () => {
  const navigation = useNavigation();

  const rotateAnimation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateAnimation.value}deg` }],
    };
  });


  // default image should be empty.
  const [selectedImage, setSelectedImage] = useState<string>("");

  // when clicking an image, set the Selected image to the url of the image selected.
  const handleOnPressGrid = (image: ImageData) => {
    navigation.navigate("PhotoDetails", { id: image.id, url: image.url }); // Navigate to PhotoDetails
  };

  /* IMPORTANT:
     Set it back to an empty string when tapped again, to go back to grid view 
  */
  const handleOnPressFullscreen = () => {
    setSelectedImage("");
  };

  // default state should be an empty string
  const [searchQuery, setSearchQuery] = useState("");

  const renderGridItem = ({ item }: { item: ImageData }) => {
    return (
      <TouchableOpacity
        style={[styles.gridItem]}
        onPress={() => handleOnPressGrid(item)}
        activeOpacity={0.7}
      >
        <Animated.Image
          source={{ uri: item.url }}
          style={[styles.image, animatedStyle]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  //Note: overall logic trys to follow the ContactList component.
  const filteredImage = imageData.filter((image) =>
    image.id.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Find Photo (ID)"
        style={styles.textInput}
      />

      <FlatList
        data={filteredImage}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderGridItem}
        // Handle scroll event here
        onScroll={(event) => { // put the animation inside of the event (adjust value for rotation speed)
          rotateAnimation.value = event.nativeEvent.contentOffset.y / 25;
        }}
      />

      {/* When image tapped -> fullscreen it */}
      {selectedImage !== "" ? (
        <TouchableOpacity
          style={styles.fullViewImage}
          onPress={handleOnPressFullscreen}
          activeOpacity={1}
        >
          {/* Use the Expo BlurView for the semi-transparent background with blur effect */}
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
          {/* X mark icon */}
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={handleOnPressFullscreen}
          ></TouchableOpacity>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  /* Some sourced from: https://reactnative.dev/docs/flexbox */
  container: {
    width: "100%", // important to hardset this width, as searched images could (will) have 1 photo in a row.
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
    width: "32%", // 3 photos in a row
    aspectRatio: 1, // Ensure images maintain their aspect ratio
    marginBottom: 5, // Spacing between rows
    marginLeft: 5, // spacing between columns
  },
  image: {
    borderColor: "gray", // apply a minimal gray border along each photo in gridView.
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 10,
  },
  /* Important: read top of the project's notes regarding Expo Blur */
  fullViewImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black", // opacity is important for blur perception
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%", // 90% width provides a more relaxed fullscreen view.
    aspectRatio: 1,
  },
  closeIconContainer: {
    position: "absolute",
    top: 285, // Adjust the top position as needed
    right: 30, // Adjust the right position as needed
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: "gray", // Adjust the color of the X mark icon as needed
  },

  // SearchBar
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
