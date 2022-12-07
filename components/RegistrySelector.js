import { onValue } from "firebase/database";
import React, { useContext, useSync, useRef, useEffect } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { set, ref } from "firebase/database";
import { auth, database } from "../firebaseConfig";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

export default function RegistrySelector({ navigation }) {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const loadRegistry = (selection) => {
    onValue(
      ref(database, "/Registries/" + selection),
      (snapshot) => {
        if (snapshot.exists()) {
          const currentRegistryData = snapshot.val();
          const currentRegistryID = selection;
          const currentRegistryName = currentRegistryData["Meta"]["Name"];
          const currentRegistryIndexCardFormat =
            currentRegistryData["Meta"]["IndexCardFormat"];
          const currentRegistryOwner = currentRegistryData["Meta"]["Owner"];
          const JSObjOfAllSelections = currentRegistryData["Meta"]["Selectors"];
          const arrayOfSelectors = Object.keys(
            currentRegistryData["Meta"]["Selectors"]
          );

          setUserProfile({
            ...userProfile,
            currentRegistryData: currentRegistryData,
            currentRegistryID: currentRegistryID,
            currentRegistryName: currentRegistryName,
            currentRegistryIndexCardFormat: currentRegistryIndexCardFormat,
            currentRegistryOwner: currentRegistryOwner,
            JSObjOfAllSelections: JSObjOfAllSelections,
            arrayOfSelectors: arrayOfSelectors,
            currentFilterIndex: null,
            currentFilterName: null,
            currentOptionIndex: null,
            currentOptionName: null,
            newflag: false,
          });

          navigation.navigate("EntryListScreen");
        } else {
        }
      },
      {}
    );
  };

  const loadUserProfile = () => {
    onValue(
      ref(database, "/Users/" + auth.currentUser.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          const name = snapshot.val().Name;
          const email = snapshot.val().Email;
          const myRegistries = snapshot.val().MyRegistries;
          setUserProfile({
            Name: name,
            Email: email,
            MyRegistries: myRegistries,
          });
        }
      },
      {}
    );
  };

  const handleOnPress = (selection) => {
    loadRegistry(selection);

    // So selectionGroupsArray will be an array of the group names like
    // ["Hazard Group", "Action Owner", "Location"]
    // and the selectionsArray is a two dimentional array where the first
    // index corresponds to the index in the selectionGroupsArray, and the
    // second index points to the permitted values, so like:
    // ["Wind Hazard","Electrical Hazard","Flood"]["Harry","Lucy"]["London","Birmingham","Glasgow"]
    // setSelectionGroupArray(selectionGroupsArray);
    // setSelectionsArray(selectionsArray);
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const reglist = userProfile.MyRegistries;
  // Do this with JSON.parse instead.
  let counter = 0;
  let keyArray = [];
  let nameArray = [];
  for (const aRegistry in userProfile.MyRegistries) {
    keyArray[counter] = aRegistry;
    nameArray[counter] = userProfile.MyRegistries[aRegistry];
    counter++;
  }

  return (
    <ScrollView style={{ marginBottom: 30 }}>
      <View style={styles.myRegistries}>
        {keyArray.map((key, index) => (
          <Text
            style={styles.myRegistriesText}
            onPress={() => handleOnPress(key)}
            key={index}
          >
            {nameArray[index]}
          </Text>
        ))}
      </View>
    </ScrollView>
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
