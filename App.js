import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import EntryStackNavigator from "./navigators/EntryStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <EntryStackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


