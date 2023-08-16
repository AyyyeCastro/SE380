import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../App";
import PictureModal from "./PictureModal";

type PhotoDetailsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "PhotoDetails"
>;

type PhotoDetailsScreenRouteProp = RouteProp<StackParamList, "PhotoDetails">;

const PhotoDetails = () => {
  const route = useRoute<PhotoDetailsScreenRouteProp>();
  const navigation = useNavigation<PhotoDetailsScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: route.params.url }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.imageUrl}>{route.params.url}</Text>
      <Text style={styles.imageText}> This is a picture of some objects that are within an area, and have lots of stuff around it.</Text>
      {/* Render the modal */}
      <PictureModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUrl={route.params.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
    padding: 15,
  },
  image: {
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    aspectRatio: 1,
  },
  imageUrl: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
  imageText: {
   marginTop: 15,
   fontSize: 15,
   color: "gray",
 }
});

export default PhotoDetails;
