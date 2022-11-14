import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Share,
  TextInput,
  Button,
} from "react-native";
import { ScrollView } from "react-native";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import { getHeaderTitle } from "@react-navigation/elements";

import Registry from "../dataStore/dataSource";
import RiskLevelBadge from "../components/RiskLevelBadge";

const EntryDetailScreen = ({ navigation, route }) => {
  var currentEntry = Registry.entries[route.params.entry];
  var arrayLength = Registry.entries.length;
  var displayOrder = route.params.order;
  var thisIndex = route.params.index;
 

  //This is the screen that will display the details of the risk
  // It will be called for each risk with a different ID.

  const swipeRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      navigation.pop();
    });

  const swipeLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      if (thisIndex == displayOrder.length - 1) {
        alert("end of list reached");
      } else {
        var nextEntryRef = displayOrder[thisIndex + 1];
        navigation.push("Entry Detail", {
          entry: nextEntryRef,
          index: thisIndex + 1,
          order: displayOrder,
        });
      }
    });

  return (
    <GestureDetector gesture={swipeLeft}>
      <GestureDetector gesture={swipeRight}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={styles.separator}
            
          />
          <View style={styles.test}>
            <View style={styles.toprow}>
              <View style={styles.badge}>
                <RiskLevelBadge level={currentEntry.RiskLevel} />
              </View>
              <Text style={styles.label}>{currentEntry.Title}</Text>
            </View>
            <View style={styles.secondrow}>
              <Text style={styles.RefID}>Ref ID: {currentEntry.RiskID}</Text>
            </View>
          </View>
          <ScrollView>
            <View
              style={styles.separator}
             
            />
            <View style={styles.bar}>
              <View style={styles.leftspace} />
              <View style={styles.tab}>
                <Text>Outcome Description</Text>
              </View>
              <View style={styles.rightspace} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionOne}>{currentEntry.Outcome}</Text>
            </View>

            <View style={styles.bar}>
              <View style={styles.leftspace} />
              <View style={styles.tab}>
                <Text>Controls in place</Text>
              </View>
              <View style={styles.rightspace} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionOne}>{currentEntry.Controls}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionOne}>
                Last Review: {currentEntry.LastRev}
              </Text>
              <Text> </Text>
              <Text style={styles.sectionOne}>
                Next Review: {currentEntry.NextRev}
              </Text>
            </View>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,1)"
            />

            <View style={{ height: 300 }}>
              <Text></Text>
            </View>
          </ScrollView>
          <View style={styles.navbar}>
            <Ionicons name="ios-home-outline" size={25} color={"black"} on />
            <Ionicons
              name="share-outline"
              size={25}
              color={"black"}
              onPress={() => {
                ShareButton({ currentEntry });
              }}
            />
            <Ionicons name="chatbubble-outline" size={25} color={"black"} />
            <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
          </View>
        </SafeAreaView>
      </GestureDetector>
    </GestureDetector>
  );
};
export default EntryDetailScreen;

const ShareButton = async ({ currentEntry }) => {
  const shareMessage =
    "Title: " + currentEntry.Title + "  RiskID: " + currentEntry.RiskID;
  try {
    const result = await Share.share({
      message: shareMessage,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};



const styles = StyleSheet.create({
  test: {
    paddingLeft: 0,
    backgroundColor: "#cccccc",
    height: 100,
    width: "100%",
  },
  badge: {
    width: 110,
  },
  bar: {
    flex: 0,
    flexDirection: "row",

    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    lineHeight: 10,
    minHeight: 0,
    borderBottomWidth: 0,

    //maxWidth: 310,
  },
  leftspace: {
    maxWidth: 10,
    height: 20,
    flex: 1,
    borderBottomWidth: 1,
  },
  navbar: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  secondrow: {
    paddingLeft: 15,
    paddingBottom: 15,
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
  sectionTwo: {
    borderRadius: 20,
    paddingLeft: 15,
  },
  sectionThree: {
    borderRadius: 20,
    paddingLeft: 15,
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 5,
    width: "100%",

    backgroundColor: "#eee",
  },

  label: {
    flex: 1,
    fontWeight: "bold",
    //numberOfLines: 2,
    // ellipsizeMode: 'tail',
    paddingTop: 15,
  },

  toprow: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});
