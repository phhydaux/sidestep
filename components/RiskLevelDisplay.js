import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const RiskLevelDisplay = ({ currentEntryNum }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const currentEntry =
    userProfile.currentRegistryData["Pages"][currentEntryNum];

  //const thisLikelihood = currentEntry["Likelihood"];
  //const thisImpact = currentEntry["Impact"];


 const boxLegend =
    userProfile.currentRegistryData["Meta"]["RiskMatrix"][currentEntry["Likelihood"]][
        currentEntry["Impact"]
    ];
 
  const boxColor =
    userProfile.currentRegistryData["Meta"]["RiskColors"][currentEntry["Likelihood"]][
        currentEntry["Impact"]
    ];
 

  return (
    <View style={styles.bar}>
      <View style={[styles.box, {backgroundColor: boxColor}]}>
        <Text style={styles.boxtext}>{boxLegend}</Text>
      </View>
    </View>
  );
};

export default RiskLevelDisplay

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
