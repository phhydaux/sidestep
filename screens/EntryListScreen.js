import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Registry from "../dataStore/dataSource";
import { SafeAreaView } from "react-native-safe-area-context";
import EntrySummaryCard from "../components/EntrySummaryCard";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const EntryListScreen = ({ navigation }) => {
  // This is the starting screen of my experiment.  This is going to be the list of risks
  // It must have a list of risks as an array.
  // 'norman' is the risk ID, passed to the details screen(s)
  // Lets make life easy by starting at 0

  //There will be some sort of function that selects and orders the risks to be displayed.
  // Until I have that function, I will assume that we list all risks in an arbitrary order,
  // probably the order they are recorded in the data store.  We will accept that as an
  // array of the internal entry reference numbers.

  //let displayOrder = Registry.entries.map(({ InternalID }) => InternalID);

  let displayOrder = [0,3,1,2];

  // var tap = displayOrder.map((entryNum) =>
  //   Gesture.Tap().onStart(() => {
  //     navigation.push("Entry Detail", { entry: entryNum });
  //   })
  // );

  return (
    <SafeAreaView>
      <ScrollView>
        {displayOrder.map((entryNum, index, dispOrder) => (
          <View style={styles.card} key={entryNum}>
            <Pressable
              onPress={() =>
                navigation.push("Entry Detail", { entry: entryNum, index: index, order: dispOrder })
              }
              key={entryNum}
            >
              <EntrySummaryCard key={entryNum} currentEntryNum={entryNum} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EntryListScreen;

const styles = StyleSheet.create({
  test: {
    paddingLeft: 0,
    backgroundColor: "#cccccc",
    height: 100,
    width: "100%",
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
    height: 10,
    width: "100%",
  },

  badge: {
    width: 110,
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
