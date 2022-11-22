import React, { useRef, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Share,
  useWindowDimensions,
  Pressable,
} from "react-native";

import Registry from "../dataStore/dataSource";
import RiskLevelBadge from "../components/RiskLevelBadge";
import NoteModal from "../components/NoteModal";

const EntryDetailScreen = ({ navigation, route }) => {
  var displayOrder = route.params.order;

  // I put startAt in a ref because useEffect seems to fire whenever
  // the footer is modified, forcing the scroll back to its initial
  // position.  By changing startAt to the current position, when useEffect
  // fires it does not affect the scroll postion.
  var startAt = useRef(route.params.index);

  const entriesInOrder = displayOrder.map((value) => {
    return Registry.entries[value];
  });

  const displayedEntryID = useRef();
  const [ref, setRef] = useState(null);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({});
  const [flag, setFlag] = useState("black");
 

  // displayOrder:  Ordered array of the internalIDs to be displayed
  // startAt: The index number in the displayOrder which should be the
  //          first displayed entry.
  // entriesInOrder: Array of entries in the order they should be displayed
  // displayedEntryID: The InternalID number of the currently displayed entry
  // ref: a reference to the FlatList object

  const { width: windowWidth } = useWindowDimensions();

  // const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
  //   displayedEntryID.current = viewableItems[0].item.InternalID;
  //   startAt.current = displayedEntryID.current;

  // });

  const onViewCallBack = useCallback(({viewableItems}) => {
    displayedEntryID.current = viewableItems[0].item.InternalID;
    setCurrentEntry(viewableItems[0].item);
    var norman = viewableItems[0].item;
    var fred = currentEntry.Title;
   
  }, []);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: false,
  });

  const onMomentumScrollEnd = () => {
    if (displayedEntryID.current == 2) {
      setFlag("red");
    } else {
      setFlag("black");
    }
  };

  const onLayout = () => {
    var offset = windowWidth * startAt.current;
    ref.scrollToOffset({ offset: offset, animated: false });
  };

  // the renderItem function is used by FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth }} key={item.InternalID}>
        {/* Header panel at the top of the screen */}
        <View style={styles.toppanel}>
          <View style={styles.toprow}>
            <View style={styles.badge}>
              <RiskLevelBadge level={item.RiskLevel} />
            </View>
            <Text style={styles.label}>{item.Title}</Text>
          </View>
          <View style={styles.secondrow}>
            <Text style={styles.RefID}>Ref ID: {item.RiskID}</Text>
          </View>
        </View>

        {/* Main Body of the Screen - scrolls vertically if too long */}

        <ScrollView>
          <View style={styles.separator} />
          <View style={styles.bar}>
            <View style={styles.leftspace} />
            <View style={styles.tab}>
              <Text>Outcome Description</Text>
            </View>
            <View style={styles.rightspace} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionOne}>{item.Outcome}</Text>
          </View>

          <View style={styles.bar}>
            <View style={styles.leftspace} />
            <View style={styles.tab}>
              <Text>Controls in place</Text>
            </View>
            <View style={styles.rightspace} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionOne}>{item.Controls}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionOne}>Last Review: {item.LastRev}</Text>
            <Text> </Text>
            <Text style={styles.sectionOne}>Next Review: {item.NextRev}</Text>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <FlatList
          onMomentumScrollEnd={() => onMomentumScrollEnd()}
          horizontal={true}
          data={entriesInOrder}
          renderItem={renderItem}
          keyExtractor={(item) => item.InternalID}
          extraData={Registry}
          pagingEnabled={true}
          onViewableItemsChanged={onViewCallBack}
          onLayout={onLayout}
          viewabilityConfig={viewabilityConfig.current}
          ref={(ref) => {
            setRef(ref);
          }}
        />
      </View>
      <View></View>
      {/* Bottom Navigation Bar */}
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
              ShareButton(
                "Regarding: " +
                  Registry.entries[displayedEntryID.current].Title +
                  " Reference:" +
                  Registry.entries[displayedEntryID.current].RiskID
              );
            }}
          />
          <Text>Share</Text>
        </View>
        <Pressable onPress={() => {setNoteModalVisible(true);}}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="chatbubble-outline" size={25} color={flag} />
            <Text></Text>
          </View>
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
          <Text>More</Text>
        </View>
      </View>
      <NoteModal
        noteModalVisible={noteModalVisible}
        setNoteModalVisible={setNoteModalVisible}
        displayedEntry={currentEntry}
      />
    </SafeAreaView>
  );
};
export default EntryDetailScreen;

const ShareButton = async (message) => {
  const shareMessage = message;

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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    paddingTop: 15,
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
  separator: {
    height: 5,
    width: "100%",
    backgroundColor: "#eee",
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
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  toppanel: {
    paddingLeft: 0,
    backgroundColor: "#cccccc",
    height: 100,
    width: "100%",
  },
  toprow: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
