import { ref, push, set } from "firebase/database";
import { database } from "../firebaseConfig";
import React, { useState, useContext } from "react";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RiskLevelBadge from "../components/RiskLevelBadge";
import { SafeAreaView } from "react-native-safe-area-context";

import PageEditIndexCard from "../components/PageEditIndexCard";
import EntryDetailScreen from "./EntryDetailScreen";

const PageEditScreen = ({ navigation, route }) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
 
  const [pageBeingEdited, setPageBeingEdited] = useState(userProfile.currentRegistryData["Pages"][userProfile.currentPage]);
  // N.B. pageBeingEdited is the object, not just the number

  const handleSaveAll = () => {
    const pageRef = ref(
      database,
      "Registries/" +
        userProfile.currentRegistryID +
        "/Pages/" +
        userProfile.currentPage
    );

    set(pageRef, pageBeingEdited);
    //navigation.goBack();



    navigation.navigate("EntryListScreen")


  };

 

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable
          style={styles.leftbutton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={24} color="blue" />
          <Text style={{ fontSize: 18, color: "blue" }}>Cancel</Text>
        </Pressable>
        <View style={styles.headercenter}>
          <Text style={{ fontSize: 18, color: "red" }}>Edit Mode</Text>
          <Text style={{ fontSize: 10, color: "red" }}>Tap to edit</Text>
        </View>
        <Pressable style={styles.rightbutton} onPress={() => handleSaveAll()}>
          <Text style={{ fontSize: 18, color: "blue" }}>Save </Text>
          <Ionicons name="save-outline" size={24} color="blue" />
        </Pressable>
      </View>

      <View style={{}}>
        {/* Header panel at the top of the screen */}
        <View style={styles.toppanel}>
          
              
              <PageEditIndexCard
              pageBeingEdited={pageBeingEdited}
              setPageBeingEdited={setPageBeingEdited}
              
               />
           
        </View>

   

        {/* Main Body of the Screen - scrolls vertically if too long */}

        <ScrollView>
          <View style={styles.separator} />
          <View style={styles.bar}>
            <View style={styles.leftspace} />
            <View style={styles.tab}>
              <Text>Outcome Description</Text>
            </View>
            <View style={styles.rightspace} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionOne}>{pageBeingEdited.Outcome}</Text>
          </View>

          <View style={styles.bar}>
            <View style={styles.leftspace} />
            <View style={styles.tab}>
              <Text>Controls in place</Text>
            </View>
            <View style={styles.rightspace} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionOne}>{pageBeingEdited.Controls}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionOne}>
              Last Review: {pageBeingEdited.LastRev}
            </Text>
            <Text> </Text>
            <Text style={styles.sectionOne}>
              Next Review: {pageBeingEdited.NextRev}
            </Text>
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,1)"
          />

          <View style={{ height: 300 }}>
            <Text></Text>
          </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
};

export default PageEditScreen;

const styles = StyleSheet.create({
  badge: {
    width: 110,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headercenter: {
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  label: {
    flexGrow: 1,
    fontWeight: "bold",
    paddingTop: 15,
  },
  leftbutton: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  leftspace: {
    maxWidth: 10,
    height: 20,
    flex: 1,
    borderBottomWidth: 1,
  },
  rightbutton: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
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
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
  },
  toprow: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
 



});
