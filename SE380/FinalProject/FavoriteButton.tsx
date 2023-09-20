import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface FavoriteButtonProps {
  onPress: () => void;
  isFavorited: boolean; 
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onPress, isFavorited }) => {
  const [bounceValue] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isFavorited) {
      Animated.spring(bounceValue, {
        toValue: 1.3,
        friction: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isFavorited]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.favoriteButton}>
        <Animated.View
          style={{
            transform: [{ scale: bounceValue }],
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={isFavorited ? styles.favoritedHeartIcon : styles.heartIcon}
          />
        </Animated.View>
        <Text>
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 60,
    color: "#feb81b",
    marginRight: 5,
  },
});

export default FavoriteButton;
