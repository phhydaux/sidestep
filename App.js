import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import EntryStackNavigator from "./navigators/EntryStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomePageNavigator from "./navigators/HomePageNavigator";
import { initializeApp } from "firebase/app";
import { AuthenticatedUserProvider } from "./navigators/AuthenticatedUserProvider";
import RootNavigator from "./navigators/RootNavigator";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}


