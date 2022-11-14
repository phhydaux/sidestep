import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";

const SectionSelectionScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
      <Text>Hello World</Text>
      <Text>This is screen three</Text>
      <Button title="Forward" onPress={()=>navigation.navigate("EntryListScreen",{diddle: "fred"})} />
    </View>
  );
};

export default SectionSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
