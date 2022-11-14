import React from "react";
import { StyleSheet , Text, View} from "react-native";
import Registry from "../dataStore/dataSource";

const RiskLevelBadge = ({ level }: { level: number }) => {
  switch (level) {
    case 0:
      return (
        <View style={styles.bar}>
          <View style={styles.boxHigh}>
            <Text style={styles.boxtext}>{Registry.metaData.RiskLevel[0]}</Text>
          </View>
        </View>
      );
    case 1:
      return (
        <View style={styles.bar}>
          <View style={styles.boxMed}>
            <Text style={styles.boxtext}>{Registry.metaData.RiskLevel[1]}</Text>
          </View>
        </View>
      );
    case 2:
      return (
        <View style={styles.bar}>
          <View style={styles.boxLow}>
            <Text style={styles.boxtext}>{Registry.metaData.RiskLevel[2]}</Text>
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 10,
    minHeight: 30,
  },
  boxHigh: {
    height: 31,
    width: 86,
    borderWidth: 1,
    backgroundColor: "#F4681D",
    justifyContent: "center",
    alignItems: "center",
  },
  boxMed: {
    height: 31,
    width: 86,
    borderWidth: 1,
    backgroundColor: "#FDFF1D",
    justifyContent: "center",
    alignItems: "center",
  },
  boxLow: {
    height: 31,
    width: 86,
    borderWidth: 1,
    backgroundColor: "#07CF0F",
    justifyContent: "center",
    alignItems: "center",
  },
  boxtext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    display: "flex",
    flexGrow: 10,
  },
  levelBadge: {
    display: "flex",
    flexShrink: 0,
    borderRadius: 15,
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 30,
  },
  
});

export default RiskLevelBadge;
