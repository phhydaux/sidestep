import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import RiskLevelBadge from "./RiskLevelBadge";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import RiskLevelDisplay from "./RiskLevelDisplay";

const IndexCard = ({ currentEntryNum }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  //  For Index Card Format #3
  // currentEntryNum is the PageUID for which the Risk Level should be displayed.

  const currentEntry =
    userProfile.currentRegistryData["Pages"][currentEntryNum];

  //Additional Index Card Items
  const cardLabel = [];
  for (let index = 1; index < 5; index++) {
    label =
      userProfile.currentRegistryData["Meta"]["LabelsOnIndexCard"]["Position" + index];
    
      
    if (label) {
      let prefix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextBefore"
        ] ?? "";

      let  postfix =
        userProfile.currentRegistryData["Meta"]["PageElements"][label][
          "TextAfter"
        ] ?? "";
        
      cardLabel[index] = prefix + currentEntry[label] + postfix;
    
      
    }
  }
 

  return (
    <View style={styles.card}>
      <View style={styles.colleft}>
        <RiskLevelDisplay likelihood={userProfile.currentRegistryData["Pages"][currentEntryNum]["Likelihood"] }
                          impact={userProfile.currentRegistryData["Pages"][currentEntryNum]["Impact"] } />

       {(cardLabel[1]) && (<Text style={styles.label}>{cardLabel[1]}</Text>)}
       {(cardLabel[2]) && (<Text style={styles.label}>{cardLabel[2]}</Text>)}
      
      </View>

      <View style={styles.colright}>
        <Text style={styles.title}>{currentEntry["Title"]}</Text>
      {(cardLabel[3]) && (<Text style={styles.label}>{cardLabel[3]}</Text>)}
      {(cardLabel[4]) && (<Text style={styles.label}>{cardLabel[4]}</Text>)}
      </View>
    </View>
  );
};

export default IndexCard;

const styles = StyleSheet.create({
  card: {
    flex:1,
    flexDirection: "row",
    minHeight: 80,
   backgroundColor: "#efe5cc",
    
    width: "100%",
    borderWidth:1,
    borderColor: "black",
    borderRadius: 10
    
    
  },
  colleft: {
    flexDirection: "column",
    padding: 5,
   

  
  },
  colright: {
    flexDirection: "column",
    padding: 10,
    flex: 1,
  },
  label: {
    flex: 1,
    fontWeight: "normal",
    paddingTop: 2,
     
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    height: 40
    
  },
});
