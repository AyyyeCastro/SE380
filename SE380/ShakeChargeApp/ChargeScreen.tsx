import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Battery from "expo-battery";
import { ProgressBar } from "react-native-paper";

export default function ChargeScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const _subscribeBattery = async () => {
    //same logic as before, but get the starting battery level of the physical device.
    const startingBatteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(Math.floor(startingBatteryLevel * 100));  // Convert to percentage

    // The batterylevel holds the updating/present level, rather than the starting.
    Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(Math.floor(batteryLevel * 100));  // Convert to percentage
    });
  };

  useEffect(() => {
    _subscribeBattery();
    return () => {
      // unsubscribing not needed rn.
    };
  }, []);

  useEffect(() => {
    // code from Canvas, added a listener from the Accelerometer to handle shake.
    const updateBatteryLevel = () => {
      Accelerometer.addListener(({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        // lowered value, because expo's annoying dev menu kept showing.
        if (magnitude > 1.3) {
          setBatteryLevel((prevBatteryLevel) =>
            // increased charge percent from original Canvas' code, and fixed a TS null error.
            prevBatteryLevel !== null
              ? Math.min(prevBatteryLevel + 1, 100)
              : null
          );
        }
      });
    };

    updateBatteryLevel();
  }, []);

  // set the battery color accoring to the BatteryLevel
  const setBatteryColor = () => {
    // null error handling
    if (batteryLevel === null) {
      return "gray";
    } else if (batteryLevel <= 20) {
      return "red";
    } else if (batteryLevel <= 50) {
      return "yellow";
    } else {
      return "green";
    }
  };

  // I COULD NOT figure out how to dynamically style a progress bar with bare CSS in react.
  // I was only able to set static color changes based on batteryLevel, but could not get that fill animation you had.
  // I ended up importing a progressbar from React Native Paper... :D

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Battery Level:{" "}
        {batteryLevel !== null ? batteryLevel + "%" : "N/A"}
      </Text>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={batteryLevel !== null ? batteryLevel / 100 : 0}
          color={setBatteryColor()}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressBarContainer: {
    width: "80%",
    marginTop: 30,
  },
  progressBar: {
    height: 90,
    borderRadius: 15,
  },
});
