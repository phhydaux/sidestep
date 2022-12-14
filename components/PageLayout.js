import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import DisplayElement from "./DisplayElement";

const PageLayout = ({ currentEntryNum }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const listOfElements = Object.keys(
    userProfile.currentRegistryData["Meta"]["OrderOnPage"]
  );
  listOfElements.sort(
    (b, a) =>
      userProfile.currentRegistryData["Meta"]["OrderOnPage"][b] -
      userProfile.currentRegistryData["Meta"]["OrderOnPage"][a]
  );

  return (
    <View>
      {listOfElements.map((element) => (
        <DisplayElement
          currentEntryNum={currentEntryNum}
          currentElement={element} 
          key={element}
        />
        
      ))}
    </View>
  ); 

 
};

export default PageLayout;

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
    paddingBottom: 40,
  },
  sectionOne: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
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
  temp: {
    flex: 1,
    backgroundColor: "pink",
    height: 150,
  },
});
