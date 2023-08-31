import { useEffect, useState, useCallback } from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';

export default function BatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<Battery.Subscription | null>(null);

  const _subscribe = async () => {
    const initialBatteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(initialBatteryLevel * 100);

    setSubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel * 100);
      })
    );
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [_unsubscribe]);

  return (
    <View style={styles.container}>
      <Text>Current Battery Level: {batteryLevel}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});