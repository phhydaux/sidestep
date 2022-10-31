import "react-native-gesture-handler";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EntryListScreen from "./screens/EntryListScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";

import SectionSelectionScreen from "./screens/SectionSelectionScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EntryStackNavigator from "./navigators/EntryStackNavigator";
import BottomTabNavigator from "./navigators/BottomTabNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


