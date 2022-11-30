import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Registry from "../dataStore/dataSource";
import RadioButton from "./RadioButton";

const PageEditMenuModal = ({
  pageEditMenuModalVisible,
  setPageEditMenuModalVisible,
  displayedEntry,
}) => {
 

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
            <View style={{ flex: 1, flexDirection: "column" }}>
        

        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="create-outline" size={25} color="black" />
            <Text>Edit this Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="trash-outline" size={25} color="black" />
            <Text>Delete this Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="add-circle-outline" size={25} color="black" />
            <Text>Add a new Risk</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
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
});
