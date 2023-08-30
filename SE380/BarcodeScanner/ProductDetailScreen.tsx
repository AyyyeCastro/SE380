import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faLeftLong,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect } from "@react-navigation/native"; 


const ProductDetailScreen = ({ route, navigation }) => {
  const { qrCodeURL } = route.params;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getItem, setItem } = useAsyncStorage("@favorited_items");
  const [isFavorited, setIsFavorited] = useState(false);

  const markFavorite = async () => {
    try {
      const favoriteItemInfo = await getItem();
      const favoritedItems = favoriteItemInfo
        ? JSON.parse(favoriteItemInfo)
        : [];

      const isAlreadyFavorited = favoritedItems.some(
        (item) => item.qrCodeURL === qrCodeURL
      );

      if (isAlreadyFavorited) {
        // remove favorited items
        const updatedFavoritedItems = favoritedItems.filter(
          (item) => item.qrCodeURL !== qrCodeURL
        );
        await setItem(JSON.stringify(updatedFavoritedItems));
      } else {

        // Add favorited items
        favoritedItems.push({ qrCodeURL, title: productData.title });
        await setItem(JSON.stringify(favoritedItems));
      }

      setIsFavorited(!isAlreadyFavorited);
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("QR Code URL:", qrCodeURL);
        const response = await fetch(qrCodeURL);
        const data = await response.json();
        setProductData(data);

        const favoriteItemInfo = await getItem();
        const favoritedItems = favoriteItemInfo
          ? JSON.parse(favoriteItemInfo)
          : [];
        setIsFavorited(
          favoritedItems.some((item) => item.qrCodeURL === qrCodeURL)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [qrCodeURL]);

  useFocusEffect(() => {
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text>Loading details...</Text>
      ) : (
        productData && (
          <>
            <TouchableOpacity
              // goo back to Scanner
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <View style={styles.goBackButtonContent}>
                <FontAwesomeIcon icon={faArrowLeft} style={styles.arrowIcon} />
                <Text style={styles.goBackText}>Go back</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.innerContainer}>
              <Text style={styles.title}>{productData.title}</Text>

              <View style={styles.rowContainer}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>{productData.category} </Text>
                </View>

                <View style={styles.ratingContainer}>
                  <Text style={styles.category}>
                    {" "}
                    {productData.rating.rate}{" "}
                    <FontAwesomeIcon icon={faStar} style={styles.starIcon} />{" "}
                  </Text>
                </View>
              </View>

              <Image source={{ uri: productData.image }} style={styles.image} />

              <Text style={styles.price}>${productData.price}</Text>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionHeader}>Description:</Text>

                <Text style={styles.description}>
                  {productData.description}
                </Text>
              </View>

              <View style={styles.favoriteContainer}>
                <TouchableOpacity
                  onPress={markFavorite}
                  style={styles.favoriteButton}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={
                      isFavorited ? styles.favoritedHeartIcon : styles.heartIcon
                    }
                  />
                  <Text>
                    {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center", 
    marginBottom: 15,
  },
  categoryContainer: {
    padding: 5,
    backgroundColor: "#f0f0fc",
    borderRadius: 15,

  },
  ratingContainer: {
    marginLeft: 5,
    padding: 5,
    backgroundColor: "#f0f0fc",
    borderRadius: 15,
  },
  descriptionContainer: {
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderRadius: 15,
  },
  goBackButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginLeft: 5,
  },
  goBackButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    fontSize: 18,
    marginLeft: 5,
  },
  arrowIcon: {
    padding: 10,
    color: "#443dff",
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 15,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  price: {
    color: "#443dff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 26,
    padding: 10,
  },
  category: {
    fontSize: 14,
    padding: 5,
  },
  starIcon: {
    color: "#443dff",
  },
  descriptionHeader: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 16,
  },
  description: {
    fontWeight: "100",
    padding: 5,
    fontSize: 16,
  },
  favoriteContainer: {
    padding: 5,
    backgroundColor: "#f0f0fc",
    borderRadius: 15,
    marginTop: 15,
  },
  favoriteButton: {
    textAlign: "center",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  heartIcon: {
    fontSize: 20,
    color: "gray",
    marginRight: 5,
  },
  favoritedHeartIcon: {
    padding: 10,
    fontSize: 60,
    color: "#443dff",
    marginRight: 5,
  },
});

export default ProductDetailScreen;
