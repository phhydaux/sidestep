import React, { useState, useContext } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { AuthenticatedUserContext } from "../navigators/AuthenticatedUserProvider";

const EditTitleModal = ({
  editTitleModalVisible,
  setEditTitleModalVisible,
  pageBeingEdited,
  setPageBeingEdited,
}) => {
  const [text, onChangeText] = useState(pageBeingEdited.Title);
  const { userProfile, setUserProfile } = useContext(AuthenticatedUserContext);



  const resetText = () => {
    onChangeText();
  };

  const saveToStaging = () => {

    setPageBeingEdited({
        ...pageBeingEdited,
        Title: text}
    );
    setEditTitleModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={editTitleModalVisible}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setEditTitleModalVisible(!editTitleModalVisible);
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
            setEditTitleModalVisible(!editTitleModalVisible);
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
        <Text style={{ fontSize: 18 }}>Editing the Title</Text>
        <Pressable
          onPress={() => {
            saveToStaging();
          }}
        >
           <Text style={{ fontSize: 18, color: "blue", paddingRight: 5}}>
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
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={"No title"}
          autoFocus={true}
          multiline={true}
          maxLength={120}
          textAlignVertical="top"
          keyboardType="default"
        />
      </View>
    </Modal>
  );
};

export default EditTitleModal;

const styles = StyleSheet.create({
  paragraph: {},
  input: {
    fontSize: 20,
    margin: 12,
    borderWidth: 0,
    padding: 10,
  },
});
