import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Share,
  Text,
  Button,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Registry from "../dataStore/dataSource";
import { SafeAreaView } from "react-native-safe-area-context";
import EntrySummaryCard from "../components/EntrySummaryCard";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import RadioButton from "../components/RadioButton";
import SortOrderSelector from "../components/SortOrderSelector";

const EntryListScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [option, setOption] = useState(null);
  const [displayOrder, setDisplayOrder] = useState(Registry.entries.map(({ InternalID }) => InternalID));

  // if (route.params.modalVisible == 'true') setModalVisible('true');
  // This is the starting screen of my experiment.  This is going to be the list of risks
  // It must have a list of risks as an array.
  // 'norman' is the risk ID, passed to the details screen(s)
  // Lets make life easy by starting at 0

  //There will be some sort of function that selects and orders the risks to be displayed.
  // Until I have that function, I will assume that we list all risks in an arbitrary order,
  // probably the order they are recorded in the data store.  We will accept that as an
  // array of the internal entry reference numbers.



  //let displayOrder = [0, 1, 2, 3];

  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-sharp"
          size={24}
          color="black"
          onPress={() => {
            navigation.pop();
          }}
          style={styles.leftButton}
        />
        <View style={styles.twoLinesTogether}>
          <View style={styles.topLine}>
            <Text style={{ fontSize: 10 }}>London Risk Register</Text>
          </View>
          <View style={styles.secondLine}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Accident Hazards
            </Text>
          </View>
        </View>
        <Ionicons
          name="list"
          size={24}
          color="black"
          onPress={() => setModalVisible(true)}
          style={styles.rightButton}
        />
      </View>
      
        <SortOrderSelector 
          modalVisible = {modalVisible}
          setModalVisible = {setModalVisible}
          option = {option}
          setOption = {setOption}
          displayOrder = {displayOrder}
          setDisplayOrder = {setDisplayOrder}

        />
    
      <ScrollView>
        {displayOrder.map((entryNum, index, dispOrder) => (
          <View key={entryNum}>
            <Pressable
              onPress={() =>
                navigation.push("Entry Detail", {
                  entry: entryNum,
                  index: index,
                  order: dispOrder,
                })
              }
              key={entryNum}
            >
              <EntrySummaryCard key={entryNum} currentEntryNum={entryNum} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View>
        <Text>Hello World: {option}xx{displayOrder[0]}+{displayOrder[1]}+{displayOrder[2]}: </Text>
      </View>

      <View style={styles.navbar}>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="ios-home-outline" size={25} color={"black"} on />
            <Text>Home</Text>
          </View>
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="share-outline"
            size={25}
            color={"black"}
            onPress={() => {
              //This needs to be the Registry/Category list
              ShareButton();
            }}
          />
          <Text>Share</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="chatbubble-outline" size={25} color={"black"} />
          <Text>Comment</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
          <Text>More</Text>
        </View>
      </View>
    </View>
  );
};

const ShareButton = async () => {
  const shareMessage = "This is the Registry message";
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

export default EntryListScreen;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  header: {
    maxHeight: 80,
    paddingTop: 35,
    flex: 1,
    flexDirection: "row",

    alignItems: "center",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    //numberOfLines: 2,
    // ellipsizeMode: 'tail',
    paddingTop: 15,
  },
  leftButton: {
    paddingLeft: 10,
  },
  navbar: {
    backgroundColor: "white",
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 25,
  },
  rightButton: {
    paddingRight: 10,
  },
  secondLine: {},
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
  separator: {
    height: 10,
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
  test: {
    paddingLeft: 0,
    backgroundColor: "#cccccc",
    height: 100,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topLine: {},

  twoLinesTogether: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
});
