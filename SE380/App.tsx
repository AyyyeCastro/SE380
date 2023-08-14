import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryView from './PhotoGallery/GalleryView';
import PhotoDetails from './PhotoGallery/PhotoDetails'; // Import the PhotoDetails screen
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

export type StackParamList = {
  Gallery: undefined;
  PhotoDetails: { id: number; url: string };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Gallery" component={GalleryView} />
        <Stack.Screen name="PhotoDetails" component={PhotoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
