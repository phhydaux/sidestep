import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { signOut, updateProfile } from "firebase/auth";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import { auth, database } from "../firebaseConfig";
import Logo from "./Logo";

const DrawerContent = (props) => {
  const { userProfile, setUserProfile } = useContext(
    AuthenticatedUserContext
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.ryxkContainer}>
        <Logo size={12} />
        <Text style={styles.ryxk}>RYXK</Text>
      </View>
      <View style={styles.account}>
        <Text style={styles.accountName}> {userProfile.Name}</Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem label="Account" />
      <DrawerItem label="Change Password" />
      <DrawerItem label="Terms and Conditions" />
      <DrawerItem label="Help" />
      <DrawerItem label="Contact Us" />
      <DrawerItem label="Log Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = new StyleSheet.create({
  account: {
    padding: 20,
  },
  accountName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  ryxk: {
    fontSize: 40,
    paddingLeft: 10,
  },
  ryxkContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
