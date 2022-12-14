import "react-native-gesture-handler";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

import EntryListScreen from "../screens/EntryListScreen";
import EntryDetailScreen from "../screens/EntryDetailScreen";
import MyHomeScreen from "../screens/MyHomeScreen";
import PageEditScreen from "../screens/PageEditScreen";
import EditShortTextScreen from "../screens/EditShortTextScreen";
import EditTextBlockScreen from "../screens/EditTextBlockScreen";
import EditDateScreen from "../screens/EditDateScreen";
import EditListScreen from "../screens/EditListScreen";
import EditRiskMatrixScreen from "../screens/EditRiskMatrixScreen";

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

      <Stack.Screen
        name="EntryListScreen"
        component={EntryListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Page Edit"
        component={PageEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit ShortText Screen"
        component={EditShortTextScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Edit TextBlock Screen"
        component={EditTextBlockScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Edit Date Screen"
        component={EditDateScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Edit List Screen"
        component={EditListScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Edit Risk Matrix Screen"
        component={EditRiskMatrixScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Entry Detail"
        component={EntryDetailScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <View>
              <Ionicons
                name="chevron-back-sharp"
                size={24}
                color="black"
                onPress={() => navigation.pop()}
              />
              <Text>Back</Text>
            </View>
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </Stack.Navigator>
  );
}
