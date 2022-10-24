import "react-native-gesture-handler";
import * as React from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EntryListScreen from "./screens/EntryListScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";
import ScreenThree from "./screens/Screen3";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={EntryListScreen}
          options={({ navigation, route }) => ({
            headerRight: () => <Button title="fred" />,
          })}
        />

        <Stack.Screen name="Entry Detail" component={EntryDetailScreen} />
        <Stack.Screen name="Page Three" component={ScreenThree} />
      </Stack.Navigator>
    </NavigationContainer>
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
