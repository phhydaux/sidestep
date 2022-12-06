import React, { useContext, useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Animated, { Layout, LightSpeedInLeft, StretchInY, Transition, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import { ref, set, onValue, child } from "firebase/database";
import { auth, database } from "../firebaseConfig";

import FilterSelector from "../components/FilterSelector";
//import { forModalPresentationIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";

const SectionSelectionScreen = ({ navigation }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [FilterModalVisible, setFilterModalVisible] = useState(false);
  const [filterControlsVisible, setFilterControlsVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Hazard Group");
  const [order, setOrder] = useState();

  const ref = React.useRef();

  const sharedrefvalue = useSharedValue("0%");

  const varistyle = useAnimatedStyle(()=> {
   
return {
        maxHeight: withSpring(sharedrefvalue.value),
        flexGrow: 1,
        backgroundColor: "wheat",
        overflow: "hidden"
     }

    
     

  })

  //read from the currently selected Registry entry to get the
  //categories by which the registry can be ordered (e.g. sections, or locations),
  // and within each, the selections (section names or location names)

  //This is just a placeholder
  let availableFilters = Object.keys(userProfile.JSObjOfAllSelections);

  let currentSelectionOptions = Object.keys(
    userProfile.JSObjOfAllSelections[currentFilter]
  );

  const handleonPress = () => {
    
    if (filterControlsVisible){
      sharedrefvalue.value = "100%";
      setFilterControlsVisible(false);
      console.log("tick");
    }else {
      sharedrefvalue.value = "0%";
      setFilterControlsVisible(true);
      console.log("tock");
    }
  
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.pop();
        }}
      >
        <View style={styles.header}>
          <Ionicons
            name="chevron-back-sharp"
            size={24}
            color="black"
            style={styles.leftButton}
          />
          <View style={styles.twoLinesTogether}>
            <View style={styles.secondLine}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {userProfile.currentRegistryName}
              </Text>
            </View>
          </View>
          <Pressable onPress={() => handleonPress()}>
            <View style={{ backgroundColor: "pink", paddingLeft: 55 }}>
              <Ionicons
                name="list"
                size={24}
                color="black"
                style={styles.rightButton}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
      <StatusBar style="auto" />

      <View style={styles.titlecontainer}>
        <Text style={styles.titleline}>{currentFilter}</Text>
        <Text>betty</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <View>
          <Text style={{ fontSize: 30, color: "red" }}>Hello Everybody</Text>
        </View>

        {currentSelectionOptions.map((selection) => (
          <Text
            style={styles.scrollviewitems}
            key={selection}
            onPress={() => {
              navigation.navigate("EntryListScreen");
              setUserProfile({
                ...userProfile,
                currentFilter: currentFilter,
                currentSection: selection,
              });
            }}
          >
            {selection}
          </Text>
        ))}
        <View>
          {Object.keys(userProfile.JSObjOfAllSelections).map((filter) => (
            <View key={filter} style={styles.outside}>
              <Text style={styles.filterHeading}>Filter: {filter}</Text>
            
                <Animated.View   style={varistyle}>
                {Object.keys(userProfile.JSObjOfAllSelections[filter]).map(
                  (option) => (
                    <Text key={option} style={styles.option}>
                      {option}
                    </Text>
                  )
                )}
              </Animated.View>


              
             
            </View>
          ))}
        </View>
      </ScrollView>

      <FilterSelector
        FilterModalVisible={FilterModalVisible}
        setFilterModalVisible={setFilterModalVisible}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        availableFilters={availableFilters}
      />

      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.popToTop()}>
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

export default SectionSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#aeaeae",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  filterHeading: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  header: {
    maxHeight: 80,
    paddingTop: 45,
    padding: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  inside: {
    flexGrow: 1,
    backgroundColor: "red",
    maxHeight: 50,
    overflow: "hidden"
    

  },
  inside2: {
    flex: 0,
    backgroundColor: "wheat",

    height: 0,
  },
  leftButton: {
    paddingLeft: 0,
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
  option: {
    fontSize: 22,
    padding: 5,
    color: "blue",
  },
  outside: {
    flexGrow: 1,
    border: 1,
  },

  rightButton: {
    paddingRight: 10,
  },
  scrollview: {
    padding: 10,
    backgroundColor: "#fafafa",
    width: "100%",
    flex: 0,
  },
  scrollviewitems: {
    padding: 10,
    fontSize: 16,
    fontWeight: "normal",
  },
  secondLine: {},
  titlecontainer: {
    backgroundColor: "#dadada",
    width: "100%",
  },
  titleline: {
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  topLine: {},
  twoLinesTogether: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
});
