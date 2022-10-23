import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";

import { NavigationContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


let norman = 1;


const StartScreen = ({navigation}) => {

  // This is the starting screen of my experiment.  This is going to be the list of risks
  // It must have a list of risks as an array.
  // 'norman' is the risk ID, passed to the details screen(s)
  // Lets make life easy by starting at 0
  
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Text>Open up App.js to start working on your app!</Text>
     
      <Text>Norman is:{norman}</Text>
      <Button
        onPress={() => navigation.navigate('Entry Detail', {entry: 0})}
        title="Info"
        color="#f00"
      />
      
      <StatusBar style="auto" />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
