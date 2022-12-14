import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import {
  StyleSheet,
  View,
  Share,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import EntrySummaryCard from "../components/EntrySummaryCard";
import IndexCard from "../components/IndexCard";
import FilterSelector from "../components/FilterSelector";
import SortSelector from "../components/SortSelector";

const EntryListScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSelectorVisible, setFilterSelectorVisible] = useState(false);
  const [sortSelectorVisible, setSortSelectorVisible] = useState(false);

  const availablePages = Object.keys(userProfile.currentRegistryData["Pages"]);
  let filteredDisplayOrder = [];

  //Apply Filter
  if (userProfile.currentFilterName == null) {
    filteredDisplayOrder = availablePages;
  } else {
    filteredDisplayOrder = availablePages.filter((page) => {
      console.log(userProfile.currentFilterName);
      console.log(userProfile.currentOptionName);
      console.log(page);

      return (
        userProfile.currentRegistryData["Pages"][page][
          userProfile.currentFilterName
        ] == userProfile.currentOptionName
      );
    });
  }

  //Apply Sort
  if (userProfile.sortOptionName != null) {
    filteredDisplayOrder.sort((a, b) => {
      if (
        userProfile.currentRegistryData["Meta"]["IndexCardFormat"] == 3 &&
        userProfile.sortOptionName == "Risk Level"
      ) {
        let impactTemp_a =
          userProfile.currentRegistryData["Pages"][a]["Impact"];
        let likelihoodTemp_a =
          userProfile.currentRegistryData["Pages"][a]["Likelihood"];
        let riskTemp_a =
          userProfile.currentRegistryData["Meta"]["RiskMatrix"][
            likelihoodTemp_a
          ][impactTemp_a];
        let riskvalue_a =
          userProfile.currentRegistryData["Meta"]["PageElements"]["Risk Level"][
            "PermittedValues"
          ][riskTemp_a];

        let impactTemp_b =
          userProfile.currentRegistryData["Pages"][b]["Impact"];
        let likelihoodTemp_b =
          userProfile.currentRegistryData["Pages"][b]["Likelihood"];
        let riskTemp_b =
          userProfile.currentRegistryData["Meta"]["RiskMatrix"][
            likelihoodTemp_b
          ][impactTemp_b];
        let riskvalue_b =
          userProfile.currentRegistryData["Meta"]["PageElements"]["Risk Level"][
            "PermittedValues"
          ][riskTemp_b];

        return riskvalue_b - riskvalue_a;
      } else if (
        userProfile.currentRegistryData["Meta"]["PageElements"][
          userProfile.sortOptionName
        ]["Type"] == "Date"
      ) {
        return (
          Date.parse(
            userProfile.currentRegistryData["Pages"][a][
              userProfile.sortOptionName
            ]
          ) -
          Date.parse(
            userProfile.currentRegistryData["Pages"][b][
              userProfile.sortOptionName
            ]
          )
        );
      } else if (
        userProfile.currentRegistryData["Meta"]["PageElements"][
          userProfile.sortOptionName
        ]["Type"] == "List"
      ) {
        valuekey_a =
          userProfile.currentRegistryData["Pages"][a][
            userProfile.sortOptionName
          ];
        value_a =
          userProfile.currentRegistryData["Meta"]["PageElements"][
            userProfile.sortOptionName
          ]["PermittedValues"][valuekey_a];

        valuekey_b =
          userProfile.currentRegistryData["Pages"][b][
            userProfile.sortOptionName
          ];
        value_b =
          userProfile.currentRegistryData["Meta"]["PageElements"][
            userProfile.sortOptionName
          ]["PermittedValues"][valuekey_b];

        return value_a - value_b;
      } else {
        console.log("Screw UP !");
      }
    });

    if (userProfile.sortReverse) {
      filteredDisplayOrder.reverse();
    }
  }

  const { windowHeight, windowWidth } = useWindowDimensions();
  const halfWindowWidth = windowWidth / 2;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
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
            <Text style={{ fontWeight: "normal", fontSize: 15 }}>
              {userProfile.currentRegistryName}
            </Text>
          </View>
        </View>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable
          onPress={() => setFilterSelectorVisible(true)}
          style={{
            width: "50%",
            borderWidth: 1,
            flexDirection: "row",
            borderColor: "black",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="funnel-outline"
            size={24}
            color="black"
            style={{ paddingRight: 5 }}
          />

          {userProfile.currentFilterName != null && (
            <View>
              <View>
                <Text style={{ color: "#777777" }}>
                  {userProfile.currentFilterName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginRight: 30,
                  }}
                >
                  {userProfile.currentOptionName}
                </Text>
              </View>
            </View>
          )}
          {userProfile.currentFilterName === null && (
            <Text style={{ color: "#777777" }}> No current filter</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => setSortSelectorVisible(true)}
          style={{
            width: "50%",
            flexDirection: "row",
            borderWidth: 1,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={24}
            color="black"
            style={{}}
          />

          {userProfile.sortOptionName != null && (
            <Text style={{ color: "black" }}>{userProfile.sortOptionName}</Text>
          )}
          {userProfile.sortOptionName === null && (
            <Text style={{ color: "#777777" }}> No sort option selected</Text>
          )}
        </Pressable>
      </View>
      {filterSelectorVisible && (
        <FilterSelector
          filterSelectorVisible={filterSelectorVisible}
          setFilterSelectorVisible={setFilterSelectorVisible}
        />
      )}
      {sortSelectorVisible && (
        <SortSelector
          sortSelectorVisible={sortSelectorVisible}
          setSortSelectorVisible={setSortSelectorVisible}
        />
      )}

      <ScrollView>
        {filteredDisplayOrder.map((entryNum, index, dispOrder) => (
          <View key={entryNum}>
            <Pressable
              onPress={() =>
                navigation.push("Entry Detail", {
                  index: index,
                  order: dispOrder,
                })
              }
              key={entryNum}
            >
              <IndexCard key={entryNum} currentEntryNum={entryNum} />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.navbar}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
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
        <Pressable
          style={{ alignItems: "center" }}
          onPress={() => {
            setPageEditMenuModalVisible(true);
          }}
        >
          <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
          <Text>More</Text>
        </Pressable>
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
    paddingTop: 40,
    padding: 5,
    flex: 0,
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
