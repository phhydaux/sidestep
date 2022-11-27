import React, { useContext } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import { onValue,ref } from "firebase/database";

import MyHomeScreen from "../screens/MyHomeScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import EntryStackNavigator from "./EntryStackNavigator";
import DrawerContent from "../components/DrawerContent";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";


const Drawer = createDrawerNavigator();

export default function HomePageNavigator(navigation) {
  const { userProfile, setUserProfile } = useContext(
    AuthenticatedUserContext
  );



  let firstPage;
  if (userProfile.newAccount) {
    firstPage = "AccountDetails";
  } else {
    firstPage = "EntryStackNavigator";
  }

  return (
    <Drawer.Navigator
      initialRouteName={firstPage}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
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
      <Drawer.Screen
        name="AccountDetails"
        component={AccountDetailsScreen}
        options={{
          title: "Account Details",
          drawerLabel: "Account",
        }}
      />
    </Drawer.Navigator>
  );
}
