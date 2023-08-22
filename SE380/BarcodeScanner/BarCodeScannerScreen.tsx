import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons"; // Import QR code icon

type BarCodeScannerScreenProps = {
  navigation: NavigationProp<any>;
};

const BarCodeScannerScreen: React.FC<BarCodeScannerScreenProps> = ({
  navigation,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [canScan, setCanScan] = useState(false);
  const [scanned, setScanned] = useState(true);
  const { setItem } = useAsyncStorage("@product_data");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useFocusEffect(() => {
    setScanned(false);
  });

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (canScan) {
      await setItem(JSON.stringify({ qrCodeURL: data }));
      navigation.navigate("ProductDetail", { qrCodeURL: data });
    }
  };

  const toggleScanning = () => {
    setCanScan(!canScan);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={
          scanned || !canScan ? undefined : handleBarCodeScanned
        }
        style={StyleSheet.absoluteFillObject}
      />
        <TouchableOpacity style={styles.circle} onPress={toggleScanning}>
          <View style={styles.innerCircleActive} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer:{
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
  },
  innerCircleActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#443dff",
  },
});

export default BarCodeScannerScreen;
