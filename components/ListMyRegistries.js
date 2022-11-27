import React, { useContext } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

export default function ListMyRegistries({ navigation }) {
  const { userProfile } = useContext(AuthenticatedUserContext);

  //user is authenticated.  If user is not listed in database, add user.

  const reglist = userProfile.MyRegistries;
  console.log("Registry List:");
  console.log(reglist);

  return (
    <View style={styles.myRegistries}>
      <Text
        style={styles.myRegistriesText}
        onPress={() => navigation.navigate("Section")}
      >
        London Risk Register
      </Text>
      <Text style={styles.myRegistriesText}>National Risk Register 2020</Text>
      <Text style={styles.myRegistriesText}>
        Southwark Council Risk Register
      </Text>
      <Text style={styles.myRegistriesText}>CiCS Risk Register 2016</Text>
    </View>
  );
}

const styles = new StyleSheet.create({
  myRegistries: {
    padding: 5,
  },
  myRegistriesText: {
    padding: 10,
    fontSize: 16,
    fontWeight: "normal",
  },
});
