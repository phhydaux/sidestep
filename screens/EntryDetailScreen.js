import React, { useRef, useState, useCallback, useContext } from "react";
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
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

import NoteModal from "../components/NoteModal";
import PageEditMenuModal from "../components/PageEditMenuModal";
import IndexCard from "../components/IndexCard";
import PageLayout from "../components/PageLayout";

const EntryDetailScreen = ({ navigation, route }) => {

  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [ref, setRef] = useState(null);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [pageEditMenuModalVisible, setPageEditMenuModalVisible] =
    useState(false);
  const [flag, setFlag] = useState("black");

 

  // entriesInOrder: Array of entries in the order they should be displayed

  // ref: a reference to the FlatList object

  const { width: windowWidth } = useWindowDimensions();

  const onViewCallBack = useCallback(({ viewableItems }) => {
    setUserProfile({
      ...userProfile,
      currentPage: viewableItems[0].item
    })
  }, []);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: false,
  });



  const onLayout = () => {
    
    var offset = windowWidth * userProfile.startAt;
    ref.scrollToOffset({ offset: offset, animated: true });
  };

  // the renderItem function is used by FlatList
  // item is a Page UID
  const renderItem = ({ item, index }) => {
    const page = userProfile.currentRegistryData["Pages"][item];

    return (
      <View style={{ width: windowWidth }} key={item}>
        {/* Header panel at the top of the screen */}
        <View style={styles.toppanel}>
          <View style={styles.toprow}>
            <View style={styles.badge}>
              <IndexCard currentEntryNum={item} />
            </View>
          </View>
        </View>

        {/* Main Body of the Screen - scrolls vertically if too long */}

        <ScrollView>
      
          <PageLayout currentEntryNum={item} />
          <View
            style={styles.separator}
            lightColor="pink"
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
          horizontal={true}
          data={userProfile.displayOrder}
          renderItem={renderItem}
          keyExtractor={(item) => item}
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
                  userProfile.currentRegistryData["Pages"][
                    userProfile.currentPage
                  ].Title +
                  " Reference:" +
                  userProfile.currentRegistryData["Pages"][
                    userProfile.currentPage
                  ].RiskID
              );
            }}
          />
          <Text>Share</Text>
        </View>
        <Pressable
          onPress={() => {
            setNoteModalVisible(true);
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Ionicons name="chatbubble-outline" size={25} color={flag} />
            <Text></Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setPageEditMenuModalVisible(true);
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
            <Text>More</Text>
          </View>
        </Pressable>
      </View>
      <NoteModal
        noteModalVisible={noteModalVisible}
        setNoteModalVisible={setNoteModalVisible}
        displayedEntry={userProfile.currentPage}
        navigation={navigation}
      />
      <PageEditMenuModal
        pageEditMenuModalVisible={pageEditMenuModalVisible}
        setPageEditMenuModalVisible={setPageEditMenuModalVisible}
        displayedEntry={userProfile.currentPage}
        navigation={navigation}
        
        
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
    height: 100,
    width: "100%",
  },
  toprow: {
    flex: 1,
    padding: 2,
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
