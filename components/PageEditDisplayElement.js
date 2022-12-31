import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const PageEditDisplayElement = ({ currentElement, navigation }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  var prefix, postfix;
  
  switch (
    userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
      "Type"
    ]
  ) {
    case "TextBlock":
      return (
        <View style={styles.temp}>
          <View style={styles.separator} />
          <View style={styles.bar}>
            <View style={styles.leftspace} />
            <View style={styles.tab}>
              <Text>
                {
                  userProfile.currentRegistryData["Meta"]["PageElements"][
                    currentElement
                  ]["TabText"]
                }
              </Text>
            </View>
            <View style={styles.rightspace} />
          </View>
          <Pressable
            style={styles.section}
            onPress={() =>
              navigation.push("Edit TextBlock Screen", {
                elementToEdit: currentElement,
              })
            }
          >
            <Text style={styles.sectionOne}>
              {userProfile.pageBeingEdited[currentElement]}
            </Text>
          </Pressable>
        </View>
      );

      break;
    case "ShortText":
      prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextBefore"
        ] ?? "";

      postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextAfter"
        ] ?? "";

      return (
        <Pressable
          style={styles.section}
          onPress={() =>
            navigation.push("Edit ShortText Screen", {
              elementToEdit: currentElement,
            })
          }
        >
          <Text style={styles.sectionOne}>
            {prefix + userProfile.pageBeingEdited[currentElement] + postfix}
          </Text>
        </Pressable>
      );
      break;
    case "Date":
      prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextBefore"
        ] ?? "";

      postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextAfter"
        ] ?? "";

      return (
        <Pressable
          style={styles.section}
          onPress={() =>
            navigation.push("Edit Date Screen", {
              elementToEdit: currentElement,
            })
          }
        >
          <Text style={styles.sectionOne}>
            {prefix + userProfile.pageBeingEdited[currentElement] + postfix}
          </Text>
        </Pressable>
      );
      break;
    case "List":
      prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextBefore"
        ] ?? "";

      postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][currentElement][
          "TextAfter"
        ] ?? "";

      return (
        <Pressable
          style={styles.section}
          onPress={() =>
            navigation.push("Edit List Screen", {
              elementToEdit: currentElement,
            })
          }
        >
          <Text style={styles.sectionOne}>
            {prefix + userProfile.pageBeingEdited[currentElement] + postfix}
          </Text>
        </Pressable>
      );
      break;

    default:
      console.log("Error in switch statement");
      break;
  }
};

export default PageEditDisplayElement;

const styles = StyleSheet.create({
  bar: {
    flex: 0,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    lineHeight: 10,
    minHeight: 0,
    borderBottomWidth: 0,
  },
  leftspace: {
    maxWidth: 10,
    height: 20,
    flex: 1,
    borderBottomWidth: 1,
  },
  rightspace: {
    flex: 1,
    width: 20,
    height: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderBottomStartRadius: 0,
    backgroundColor: "#eee",
  },
  section: {
    padding: 10,
    paddingBottom: 20,
  },
  sectionOne: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
  },
  separator: {
    height: 5,
    width: "100%",
  },
  tab: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    marginBottom: 0,
    height: 20,
  },
  temp: {},
});
