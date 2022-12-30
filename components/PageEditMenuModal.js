import React, { useState, useContext } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ref, push, set } from "firebase/database";
import { database } from "../firebaseConfig";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";



const PageEditMenuModal = ({
  pageEditMenuModalVisible,
  setPageEditMenuModalVisible,
  displayedEntry,
  navigation,
  displayOrder
  
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const handleAddEntry = () => {

    // database is database
    // Registry is at database/currentRegistryID
    let newEntryRef = push(
      ref(database, 
        "Registries/"+userProfile.currentRegistryID+"/Pages"));
set(newEntryRef,{Title: "Fred3"});
    newEntryRef = push(
      ref(database, 
        "Registries/"+userProfile.currentRegistryID+"/Pages"));
set(newEntryRef,{Title: "Fred4"});


  }

  const handleEditPage = () => {
    setPageEditMenuModalVisible(false);
    navigation.navigate("Page Edit");
    

  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={pageEditMenuModalVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert("Another Modal has been closed.");
        setPageEditMenuModalVisible(!pageEditMenuModalVisible);
      }}
    >
      <Pressable
        onPress={() => {
          setPageEditMenuModalVisible(!pageEditMenuModalVisible);
        }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              height: 400,
              width: 250,
              padding: 15,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{ flex: 1, flexDirection: "column", padding: 10, }}>
        

        <Pressable onPress={() => {handleEditPage()}}>
          <View style={{ flexDirection: "row" , padding: 10,}}>
            <Ionicons name="create-outline" size={25} color="black" />
            <Text>Edit this Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row", padding: 10, }}>
            <Ionicons name="trash-outline" size={25} color="black" />
            <Text>Delete this Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {handleAddEntry()}}>
          <View style={{ flexDirection: "row" , padding: 10,}}>
            <Ionicons name="add-circle-outline" size={25} color="black" />
            <Text>Add a new Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row", padding: 10, }}>
            <Ionicons name="archive-outline" size={25} color="black" />
            <Text>Archive this Risk</Text>
          </View>
        </Pressable>
            

              
           
          
              



              
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PageEditMenuModal;

const styles = StyleSheet.create({
  paragraph: {},
  option: {
    padding: 10,

  },
});
