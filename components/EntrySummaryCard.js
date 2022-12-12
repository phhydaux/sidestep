import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Registry from "../dataStore/dataSource";
import RiskLevelBadge from "./RiskLevelBadge";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EntrySummaryCard = ({ currentEntryNum }) => {
    const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

//  const currentEntry = Registry.entries[currentEntryNum];
const currentEntry = userProfile.currentRegistryData["Pages"][currentEntryNum];


  return (
    <View style={styles.card}>
      <View style={styles.toprow}>
        <View style={styles.badge}>
          <RiskLevelBadge level={currentEntry["RiskLevel"]} />
        </View>
        <Text style={styles.label}>{currentEntry["Title"]}</Text>
      </View>

      <View style={styles.secondrow}>
        <Text style={styles.RefID}>Ref ID: {currentEntry["RiskID"]}</Text>
      </View>
    </View>
  );

  //
  //
};
const styles = StyleSheet.create({
  badge: {
    width: 110,
  },
  card: {
    backgroundColor: "#dddddd",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  toprow: {
    flex: 1,
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  secondrow: {
    paddingLeft: 15,
    paddingBottom: 15,
  },
});

export default EntrySummaryCard;
