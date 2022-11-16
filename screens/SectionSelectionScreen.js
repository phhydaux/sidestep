import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const SectionSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Pressable onPress={()=>{navigation.pop()}} >
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-sharp"
          size={24}
          color="black"
          style={styles.leftButton}
        />
        <View style={styles.twoLinesTogether}>
         
          <View style={styles.secondLine}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              London Risk Register
            </Text>
          </View>
        </View>
        <Ionicons
          name="list"
          size={24}
          color="black"
          //onPress={() => setModalVisible(true)}
          style={styles.rightButton}
        />
        
      </View>
      </Pressable>
      <StatusBar style="auto" />
      <View style={styles.titlecontainer}>
        <Text style={styles.titleline}>Hazard Group</Text>
      </View>
      <ScrollView style={styles.scrollview}>
        <Text
          style={styles.scrollviewitems}
          onPress={() =>
            navigation.navigate("EntryListScreen", {
              category: "Accident Hazards",
            })
          }
        >
          Accident Hazards
        </Text>
        <Text style={styles.scrollviewitems}>Disease Hazards</Text>
        <Text style={styles.scrollviewitems}>Hazardous Materials (HAZMAT)</Text>
        <Text style={styles.scrollviewitems}>Industrial Action</Text>
        <Text style={styles.scrollviewitems}>
          Infrastructure and Systems Failure
        </Text>
        <Text style={styles.scrollviewitems}>Natural Hazards</Text>
      </ScrollView>

      <View style={styles.navbar}>
        <Pressable onPress={() => setModalVisible(true)}>
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
              ShareButton();
            }}
          />
          <Text>Share</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="chatbubble-outline" size={25} color={"black"} />
          <Text>Comment</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="ellipsis-horizontal" size={25} color={"black"} />
          <Text>More</Text>
        </View>
      </View>
      
    </View>
  );
};

export default SectionSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aeaeae",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header: {
    maxHeight: 80,
    paddingTop: 45,
    padding: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%"
  },
  leftButton: {
    paddingLeft: 0,
  },
  navbar: {
    backgroundColor: "white",
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 25,
  },
  rightButton: {
    paddingRight: 10,
  },
  scrollview: {
    padding: 10,
    backgroundColor: "#fafafa",
    width: "100%",
    flex: 0,
  },
  scrollviewitems: {
    padding: 10,
    fontSize: 16,
    fontWeight: "normal",
  },
  secondLine: {},
  titlecontainer: {
    backgroundColor: "#dadada",
    width: "100%",
  },
  titleline: {
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  topLine: {},
  twoLinesTogether: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
});
