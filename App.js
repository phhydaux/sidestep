import "react-native-gesture-handler";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EntryListScreen from "./screens/EntryListScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";

import SectionSelectionScreen from "./screens/SectionSelectionScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EntryListScreen"
          component={EntryListScreen}
          // options={({ navigation, route }) => ({
          //   headerRight: () => <Button title="fred" />,
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

        <Stack.Screen name="Section" component={SectionSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
