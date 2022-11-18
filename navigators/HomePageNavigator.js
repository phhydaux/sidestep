import * as React from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import EntryStackNavigator from "./EntryStackNavigator";
import DrawerContent from "../components/DrawerContent";


const Drawer = createDrawerNavigator();

export default function HomePageNavigator(navigation) {
  return (
    <Drawer.Navigator 
    initialRouteName="EntryStackNavigator"
    drawerContent={(props)=> <DrawerContent {...props}/>}>
      <Drawer.Screen
        name="EntryStackNavigator"
        component={EntryStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: "Registry Selection",
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: "Privacy Policy",
          drawerLabel: "Privacy Policy",
        }}
      />
    </Drawer.Navigator>
  );
}
