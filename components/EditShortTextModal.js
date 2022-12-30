import { browserLocalPersistence } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
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

const EditShortTextModal = ({
  editShortTextModalVisible,
  setEditShortTextModalVisible,
  pageBeingEdited,
  setPageBeingEdited,
  shortText,
  setShortText,
}) => {
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);
  const [count, setCount] = useState();

  const saveToStaging = () => {
    setPageBeingEdited({
      ...pageBeingEdited,
      [userProfile.currentPageElement]: shortText,
    });
    setEditShortTextModalVisible(false);
  };

  const onChangeText = (text) => {
    setShortText(text);
    setCount(125 - text.length);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={editShortTextModalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setEditShortTextModalVisible(!editShortTextModalVisible);
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
            setEditShortTextModalVisible(!editShortTextModalVisible);
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
        }}
      >
        <Text>This is a limited length text field.</Text>
        <Text> There are {count} characters left</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={shortText}
          autoFocus={true}
          multiline={true}
          maxLength={125}
          textAlignVertical="top"
          keyboardType="default"
        />
      </View>
    </Modal>
  );
};

export default EditShortTextModal;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "pink",
  },
});
