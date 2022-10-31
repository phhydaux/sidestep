import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Share } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTabScreen from "../screens/HomeTabScreen";
import MoreTabScreen from "../screens/MoreTabScreen";
import EntryStackNavigator from "./EntryStackNavigator";
import ShareTabScreen from "../screens/ShareTabScreen";
import CommentTabScreen from "../screens/CommentTabScreen";
import Registry from "../dataStore/dataSource";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={EntryStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              size={25}
              style={{ marginBottom: -3 }}
              name="ios-home-outline"
              color={"black"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Share"
        component={ShareTabScreen}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            ShareExample({ navigation });
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              size={25}
              style={{ marginBottom: -3 }}
              name="share-outline"
              color={"black"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Comment"
        component={CommentTabScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              size={25}
              style={{ marginBottom: -3 }}
              name="chatbubble-outline"
              color={"black"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreTabScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              size={25}
              style={{ marginBottom: -3 }}
              name="ellipsis-horizontal"
              color={"black"}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const ShareExample = async ({ navigation }) => {
  //lets figure out which page has focus
  //Decode Tab navigator to find which tab
  const tabindex = navigation.getState().index;
  const tabroutes = navigation.getState().routes;
  const stackindex = tabroutes[tabindex].state.index;
  const stackroutes = tabroutes[tabindex].state.routes;
  const entryindex = stackroutes[stackindex].params.index;
  const EntryNum = stackroutes[stackindex].params.order[entryindex];
  const entryTitle = Registry.entries[EntryNum].Title;
  const shareMessage = "Viewing risk: " + entryTitle;

  const EntryName = stackroutes[stackindex].EntryName;
  console.log(navigation.getState());
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
