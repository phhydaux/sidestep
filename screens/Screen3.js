import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

const ScreenThree = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Text>This is screen three</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default ScreenThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
