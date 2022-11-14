import "react-native-gesture-handler";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EntryListScreen from "../screens/EntryListScreen";
import EntryDetailScreen from "../screens/EntryDetailScreen";

import SectionSelectionScreen from "../screens/SectionSelectionScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function EntryStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SectionSelectionScreen">
      <Stack.Screen name="Section" component={SectionSelectionScreen} />
       <Stack.Screen
        name="EntryListScreen"
        component={EntryListScreen}
        options={{
          headerShown: false,
        }}
        
        
        // options={({ navigation, route }) => ({
        //   title: "fred",
        //   headerRight: () => (
        //     <Ionicons
        //       name="list"
        //       size={24}
        //       color="black"
        //       onPress={() => navigation.push("EntryDetailScreen", {
        //         entry: 1,
        //         index: 1,
        //         order: [0,1,2,3]  ,}
        //       )}
        //       style={{ paddingRight: 10 }}
        //     />
        //   ),
        // })}
      />

      <Stack.Screen
        name="Entry Detail"
        component={EntryDetailScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="chevron-back-sharp"
              size={24}
              color="black"
              onPress={() => navigation.popToTop()}
            />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })} 
      /> 
    </Stack.Navigator>
  );
}
