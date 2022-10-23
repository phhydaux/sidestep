import React from "react";
import { StyleSheet , Text, View} from "react-native";

const RiskLevelBadge = ({ level }: { level: string }) => {
  switch (level) {
    case "High":
      return (
        <View style={styles.bar}>
          <View style={styles.boxHigh}>
            <Text style={styles.boxtext}>High</Text>
          </View>
        </View>
      );
    case "Medium":
      return (
        <View style={styles.bar}>
          <View style={styles.boxMed}>
            <Text style={styles.boxtext}>Medium</Text>
          </View>
        </View>
      );
    case "Low":
      return (
        <View style={styles.bar}>
          <View style={styles.boxLow}>
            <Text style={styles.boxtext}>Low</Text>
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
