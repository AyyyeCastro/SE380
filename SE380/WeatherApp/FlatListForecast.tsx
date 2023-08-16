import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";

interface ForecastDay {
  date: string;
  day: {
    icon: string;
    nameOfDay: string;
    maxTempF: number;
    minTempF: number;
    condition: string;
  };
}

export function FlatListForecast({ forecast }: { forecast: ForecastDay[] }) {
   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         style={styles.eachDay}
         data={forecast}
         keyExtractor={(item) => item.date}
         renderItem={({ item }) => (
           <View>
             <Text style={styles.eachDate}>Date: {item.date}</Text>
             <Image
               source={{ uri: `https:${item.day.condition.icon}` }}
               style={styles.conditionIcon}
             />
             <Text style={styles.temperatureText}>
               {item.day.maxTempF}°F | {item.day.minTempF}°F
             </Text>
             <Text style={styles.conditionText}>{item.day.condition.text}</Text>
           </View>
         )}
       />
     </SafeAreaView>
   );
 }

const styles = StyleSheet.create({
   container: {
     backgroundColor: "#0D9DE3",
     padding: 15,
     flex: 1,
   },
   eachDay: {
     flex: 1,
     borderRadius: 15,
     padding: 50,
     backgroundColor: "white",
   },
   eachDate: {
     borderRadius: 5,
     textAlign: "center",
     padding: 15,
     backgroundColor: "#0D9DE3",
     fontWeight: "bold",
   },
   conditionIcon: {
     alignSelf: "center", 
     width: 64,
     height: 64,
   },
   conditionText: {
     textAlign: "center",
     fontWeight: "400",
     fontSize: 15,
     padding: 15,
   },
   temperatureText: {
     textAlign: "center",
     fontWeight: "600",
     fontSize: 20,
     padding: 5,
   },
 });

 
 
 
 
 
