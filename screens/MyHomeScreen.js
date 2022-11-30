import React, { useRef, useContext, useState, useEffect } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { onValue, ref, set } from "firebase/database";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import { auth, database } from "../firebaseConfig";

import Logo from "../components/Logo";
import RegistrySelector from "../components/RegistrySelector";

export default function MyHomeScreen({ navigation }) {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  return (
    <SafeAreaView style={{ flex: 0 }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Pressable
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Ionicons
              name="menu-outline"
              size={30}
              color="black"
              style={styles.leftButton}
            />
          </Pressable>
        </View>
        <View style={styles.center}>
          <Logo size={5} />
          <Text style={{ fontSize: 20, paddingLeft: 5 }}>RYXK</Text>
        </View>
        <View style={styles.right}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>My Registries</Text>
        <Text>{userProfile.Name}</Text>
      </View>

      <RegistrySelector navigation={navigation} style={{}} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Shared Registries</Text>
      </View>
      <View style={styles.myRegistries}>
        <Text style={styles.myRegistriesText}>Project Alpha</Text>
        <Text style={styles.myRegistriesText}>Fernanda's Tech</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  bodycontainer: {},
  bodytext: {},

  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    minWidth: 80,

    paddingLeft: 10,
  },
  leftButton: {},
  myRegistries: {
    padding: 5,
  },
  myRegistriesText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "normal",
  },
  right: {
    minWidth: 80,
  },
  titleContainer: {
    backgroundColor: "#cdcdcd",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
});
