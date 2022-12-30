import { browserLocalPersistence } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditListModal = ({
  editListModalVisible,
  setEditListModalVisible,
  pageBeingEdited,
  setPageBeingEdited,
  permittedValues,
  setPermittedValues,
  selection,
  setSelection,
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);

  const saveToStaging = () => {
    setPageBeingEdited({
      ...pageBeingEdited,
      [userProfile.currentPageElement]: selection,
    });
    setEditListModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={editListModalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setEditListModalVisible(!editListModalVisible);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            setEditListModalVisible(!editListModalVisible);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 10,
              color: "blue",
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <View alignItems="center">
          <Text style={{ fontSize: 18 }}>Editing page element:</Text>
          <Text> {userProfile.currentPageElement}</Text>
        </View>
        <Pressable
          onPress={() => {
            saveToStaging();
          }}
        >
          <Text style={{ fontSize: 18, color: "blue", paddingRight: 5 }}>
            Preview
          </Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text></Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}></Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#cdcdcd",
          paddingLeft: 30,
        }}
      >
        {/* This is the selection area */}

        {permittedValues?.length &&
          permittedValues.map((option, optionIndex) => (
            <Pressable flexDirection="row" alignItems="center" 
              onPress={() => {
                setSelection(option);
              }}
              key={option}
            >
             
              {option == selection?   <Ionicons name="radio-button-on-outline" size={25} /> : <Ionicons name="radio-button-off-outline" size={25} />}
              <Text style={styles.options}>{option}</Text>
            </Pressable>
          ))}
      </View>
    </Modal>
  );
};

export default EditListModal;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "pink",
  },
  options: {
    fontSize: 20,
    padding: 10,
  },
});
