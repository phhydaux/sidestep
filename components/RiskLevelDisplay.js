import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const RiskLevelDisplay = ({ likelihood, impact }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  //const thisLikelihood = currentEntry["Likelihood"];
  //const thisImpact = currentEntry["Impact"];
var boxLegend = "undefined";
var boxColor = "wheat";

 if ( likelihood && impact) {
   boxLegend =
    userProfile.currentRegistryData["Meta"]["RiskMatrix"][likelihood][impact] ??
    "undefined";

   boxColor =
    userProfile.currentRegistryData["Meta"]["RiskColors"][likelihood][impact] ??
    "wheat";
}
  return (
    <View style={styles.bar}>
      <View style={[styles.box, { backgroundColor: boxColor }]}>
        <Text style={styles.boxtext}>{boxLegend}</Text>
      </View>
    </View>
  );
};

export default RiskLevelDisplay;

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  box: {
    height: 30,
    width: 85,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxtext: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
