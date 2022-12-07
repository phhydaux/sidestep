import "react-native-gesture-handler";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";


import {
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";


import EntryListScreen from "../screens/EntryListScreen";
import EntryDetailScreen from "../screens/EntryDetailScreen";

import SectionSelectionScreen from "../screens/SectionSelectionScreen";
import MyHomeScreen from "../screens/MyHomeScreen";

const Stack = createStackNavigator();

export default function EntryStackNavigator() {

  
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={MyHomeScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="Section"
        component={SectionSelectionScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="EntryListScreen"
        component={EntryListScreen}
        options={{
          headerShown: false,
        }}
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
              onPress={() => navigation.pop()}
            />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </Stack.Navigator>
  );
}
